import type { TorClientOptions, TorDownloadOptions, TorRequestOptions } from './types.js';
import { Socket } from 'node:net';
import { TLSSocket } from 'node:tls';
import { HttpAgent, HttpsAgent } from './agent.js';
import { HttpClient } from './http.js';
import { Socks } from './socks.js';
import { getPath } from './utils.js';

export class TorClient {
  private readonly http = new HttpClient();
  private readonly options: TorClientOptions;

  constructor(options: TorClientOptions = {}) {
    this.options = options;
  }

  private createAgent(protocol: string, socket: Socket) {
    if (protocol === 'http:') {
      return new HttpAgent({ socksSocket: socket });
    }

    const tlsSocket = new TLSSocket(socket);
    return new HttpsAgent({ socksSocket: tlsSocket });
  }

  private getDestination(url: string) {
    const urlObj = new URL(url);
    let port = urlObj.protocol === 'http:' ? 80 : 443;
    if (urlObj.port || urlObj.port !== '') {
      port = Number.parseInt(urlObj.port);
    }

    return { port, host: urlObj.host, protocol: urlObj.protocol, pathname: urlObj.pathname };
  }

  private async connectSocks(host: string, port: number, timeout?: number) {
    const socksOptions = {
      socksHost: this.options.socksHost ?? '127.0.0.1',
      socksPort: this.options.socksPort ?? 9050,
      timeout,
    };
    const socks = await Socks.connect(socksOptions);

    return socks.proxy(host, port);
  }

  async download(url: string, options: TorDownloadOptions = {}) {
    const { protocol, host, port, pathname } = this.getDestination(url);

    const path = getPath(options, pathname);
    const socket = await this.connectSocks(host, port);
    const agent = this.createAgent(protocol, socket);

    return this.http.download(url, {
      path,
      agent,
      headers: options.headers,
      timeout: options.timeout,
    });
  }

  async get(url: string, options: TorRequestOptions = {}) {
    const { protocol, host, port } = this.getDestination(url);

    const socket = await this.connectSocks(host, port, options.timeout);
    const agent = this.createAgent(protocol, socket);

    return this.http.get(url, {
      agent,
      headers: options.headers,
      timeout: options.timeout,
    });
  }

  async post(url: string, data: object, options: TorRequestOptions = {}) {
    const { protocol, host, port } = this.getDestination(url);

    const socket = await this.connectSocks(host, port);
    const agent = this.createAgent(protocol, socket);

    return this.http.post(url, data, {
      agent,
      headers: options.headers,
      timeout: options.timeout,
    });
  }

  async torcheck(options?: TorRequestOptions) {
    const result = await this.get('https://check.torproject.org/', options);
    if (!result.status || result.status !== 200) {
      throw new Error(`Network error with check.torproject.org, status code: ${result.status.toString()}`);
    }

    return result.data.includes('Congratulations. This browser is configured to use Tor');
  }
}

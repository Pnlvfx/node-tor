import type { TorRequestOptions } from './types.js';
import type { Socket } from 'node:net';
import { socks } from './socks.js';
import { httpClient } from './http.js';
import { httpAgent, httpsAgent, tlsSocket } from './agent.js';

export const get = async (url: string, { headers, timeout }: TorRequestOptions = {}) => {
  const { protocol, host, port } = getDestination(url);
  const socket = await connectSocks(host, port, timeout);
  const agent = createAgent(protocol, socket);
  return httpClient.get(url, {
    agent,
    headers,
    timeout,
  });
};

const AGENTS = {
  http: httpAgent,
  https: httpsAgent,
  tls: tlsSocket,
};

const createAgent = (protocol: string, socket: Socket) => {
  return AGENTS[protocol](socket);
};

const connectSocks = async (host = '127.0.0.1', port = 9050, timeout?: number) => {
  const { proxy } = await socks.connect({ host, port, timeout });
  return proxy(host, port);
};

const getDestination = (url: string) => {
  const { protocol, port: urlPort, host, pathname } = new URL(url);
  let port = protocol === 'http:' ? 80 : 443;
  if (urlPort !== '') {
    port = toNumber(urlPort);
  }

  return { port, host, protocol, pathname };
};

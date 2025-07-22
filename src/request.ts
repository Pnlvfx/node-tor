import type { TorRequestOptions } from './types.js';
import type { Socket } from 'node:net';
import { socks } from './socks.js';
import { httpClient } from './http.js';
import { httpAgent, httpsAgent, tlsSocket } from './agent.js';
import { toNumber } from '@goatjs/core/number';
import { AllowedProtocols } from './constants.js';

export const get = async (url: string, { headers, timeout }: TorRequestOptions = {}) => {
  const { protocol, host, port } = await getDestination(url);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const socket = await connectSocks(host, port, timeout);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const agent = createAgent(protocol, socket);
  return httpClient.get(url, {
    /** @ts-expect-error incomplete */
    agent,
    headers,
    timeout,
  });
};

const AGENTS = {
  'http:': httpAgent,
  'https:': httpsAgent,
  tls: tlsSocket,
};

const createAgent = (protocol: keyof typeof AGENTS, socket: Socket) => {
  return AGENTS[protocol](socket);
};

const connectSocks = async (host = '127.0.0.1', port = 9050, timeout?: number) => {
  /** @ts-expect-error incomplete fn */
  const { proxy } = await socks.connect({ host, port, timeout });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
  return proxy(host, port);
};

const getDestination = async (url: string) => {
  const { protocol, port: urlPort, host, pathname } = new URL(url);
  const parsedProtocol = await AllowedProtocols.parseAsync(protocol);
  let port = parsedProtocol === 'http:' ? 80 : 443;
  if (urlPort !== '') {
    port = toNumber(urlPort);
  }

  return { port, host, protocol: parsedProtocol, pathname };
};

import type { Socket } from 'node:net';
import type Stream from 'node:stream';
import { TLSSocket, type TLSSocketOptions } from 'node:tls';

export const httpAgent = () => {};

export const httpsAgent = () => {};

export const tlsSocket = (socket: Socket | Stream.Duplex, options?: TLSSocketOptions) => {
  return new TLSSocket(socket, options);
};

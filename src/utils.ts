import type { IncomingMessage } from 'node:http';

export const preventDNSLookup = (hostname: string) => {
  throw new Error(`Blocked DNS lookup for: ${hostname}`);
};

export const buildResponse = (res: IncomingMessage, data: string) => {
  const status = res.statusCode ?? 200;
  const headers = res.headers;

  return { status, headers, data };
};

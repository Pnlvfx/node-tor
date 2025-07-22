import type { IncomingMessage } from 'node:http';
import type { HttpResponse, TorDownloadOptions } from './types.js';
import { randomBytes } from 'node:crypto';
import path from 'node:path';

export function buildResponse(res: IncomingMessage, data: string): HttpResponse {
  const status = res.statusCode ?? 200;
  const headers = res.headers;

  return { status, headers, data };
}

function generateFilename(pathname: string) {
  const filename = pathname.split('/').pop();
  if (!filename || filename === '') {
    return `${Date.now().toString()}${randomBytes(6).toString('hex')}`;
  }

  return filename;
}

export function getPath(options: TorDownloadOptions, pathname: string) {
  const filename = options.filename ?? generateFilename(pathname);
  const dir = options.dir ?? './';

  if (path.isAbsolute(dir)) {
    return path.join(dir, filename);
  }

  return path.join(process.cwd(), dir, filename);
}

export function preventDNSLookup(hostname: string) {
  throw new Error(`Blocked DNS lookup for: ${hostname}`);
}

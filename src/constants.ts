import { z } from 'zod';
import os from 'node:os';

export const platform = os.platform();

export const headers = {
  'user-agent': 'Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/115.0',
};

export const AllowedProtocols = z.literal(['http:', 'https:']);

export enum MimeTypes {
  JSON = 'application/json',
  HTML = 'text/html',
  FORM = 'application/x-www-form-urlencoded',
}

export type Protocol = z.infer<typeof AllowedProtocols>;

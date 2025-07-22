import type { TorRequestOptions } from './types.js';
import { install } from './install.js';
import { startService, stopService } from './service.js';
import { start, stop } from './process.js';
import { get } from './request.js';

export const tor = {
  install,
  start,
  stop,
  startService,
  stopService,
  get,
  check: async (options: TorRequestOptions = {}) => {
    const res = await get('https://check.torproject.org', options);
    if (!res.status || res.status !== 200) {
      throw new Error(`Network error with check.torproject.org, status code: ${res.status.toString()}`);
    }

    return res.data.includes('Congratulations. This browser is configured to use Tor');
  },
};

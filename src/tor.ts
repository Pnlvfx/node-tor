import type { TorRequestOptions } from './types.js';
import { get } from './request.js';
import { requirements } from './manager/flight/requirements.js';
import { isRunning, start, stop } from './manager/flight/process.js';

await requirements();

export const tor = {
  isRunning,
  start,
  stop,
  get,
  check: async (options: TorRequestOptions = {}) => {
    const res = await get('https://check.torproject.org', options);
    if (!res.status || res.status !== 200) {
      throw new Error(`Network error with check.torproject.org, status code: ${res.status.toString()}`);
    }

    return res.data.includes('Congratulations. This browser is configured to use Tor');
  },
};

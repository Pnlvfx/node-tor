/* eslint-disable sonarjs/no-small-switch */
import { platform } from '../constants.js';
import { requirementsWindows } from './system/windows.js';

export const requirements = async () => {
  switch (platform) {
    case 'win32': {
      await requirementsWindows();
      break;
    }
    default: {
      throw new Error('Tor is not ready for usage on this platform.');
    }
  }
};

import { platform } from '../constants.js';
import { requirementsMac } from './system/mac.js';
import { requirementsWindows } from './system/windows.js';

export const requirements = async () => {
  switch (platform) {
    case 'win32': {
      await requirementsWindows();
      break;
    }
    case 'darwin': {
      await requirementsMac();
      break;
    }
    default: {
      throw new Error('Tor is not ready for usage on this platform.');
    }
  }
};

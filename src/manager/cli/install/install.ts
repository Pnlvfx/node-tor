import { platform } from '../../../constants.js';
import { installMac } from './mac.js';
import { installWindows } from './windows.js';

export const install = async () => {
  switch (platform) {
    case 'win32': {
      await installWindows();
      break;
    }
    case 'darwin': {
      await installMac();
      break;
    }
    default: {
      throw new Error('Tor autoinstall is not supported on this platform.');
    }
  }
};

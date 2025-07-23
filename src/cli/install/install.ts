import { platform } from '../../constants.js';
import { installMac } from './mac.js';
import { installWindows } from './windows.js';

export const install = async () => {
  switch (platform) {
    case 'darwin': {
      await installMac();
      break;
    }
    case 'win32': {
      await installWindows();
      break;
    }
    default: {
      throw new Error('Tor autoinstall is not supported on this platform.');
    }
  }
};

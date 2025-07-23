/* eslint-disable no-console */
import { execAsync } from '@goatjs/node/exec';
import { platform } from '../constants.js';
import { installWindows } from './system/windows.js';

export const install = async () => {
  switch (platform) {
    case 'darwin': {
      const { stdout } = await execAsync('brew install tor');
      console.log(stdout);
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

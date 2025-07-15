/* eslint-disable no-console */
import { execAsync } from '@goatjs/node/exec';
import { platform } from './config.js';

const successMessage = 'Tor installed successfully';

export const install = async ({ debug }: { debug?: boolean } = {}) => {
  switch (platform) {
    case 'darwin': {
      const { stderr, stdout } = await execAsync('brew install tor');
      if (debug) {
        console.log({ stderr, stdout });
      }
      console.log(successMessage);
      break;
    }
    case 'win32': {
      break;
    }
    default: {
      throw new Error('Tor autoinstall is not supported on this platform.');
    }
  }
};

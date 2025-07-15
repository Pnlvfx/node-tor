/* eslint-disable no-console */
import { execAsync } from '@goatjs/node/exec';
import { platform } from './config.js';

// TODO those are not ready because if you start tor but don't stop it
// when your project is stopped or crash the process become orphaned
// to implement this we have to listen on process.on on the start function and close it
// when the node process stop. it's a bit tricky.

const successMessage = 'Tor started successfully!';

/** @deprecated that's not ready for usage, use startService */
export const start = async () => {
  switch (platform) {
    case 'darwin': {
      await execAsync('/usr/local/opt/tor/bin/tor');
      console.log(successMessage);
      break;
    }
    default: {
      throw new Error('Starting tor is not supported on this platform.');
    }
  }
};

/** @deprecated that's not ready for usage, use stopService */
export const stop = async () => {
  throw new Error('Do not use stop for now.');
};

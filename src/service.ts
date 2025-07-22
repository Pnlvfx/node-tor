/* eslint-disable no-console */
import { execAsync } from '@goatjs/node/exec';
import { platform } from './config.js';

/** Start Tor service. It will automatically check if the service is already running */
export const startService = async () => {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (platform) {
    case 'darwin': {
      if (!(await isServiceRunning())) {
        console.log('Starting Tor Service');
        await execAsync('brew services start tor');
      }
      break;
    }
  }
};

/** Stop the tor service. */
export const stopService = async () => {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (platform) {
    case 'darwin': {
      if (await isServiceRunning()) {
        await execAsync('brew services stop tor');
        console.log('Tor service stopped!');
      }
      break;
    }
  }
};

const isServiceRunning = async () => {
  const { stdout } = await execAsync('brew services list | grep tor');
  console.log(stdout);
  return stdout.includes('started');
};

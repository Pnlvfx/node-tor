/* eslint-disable no-console */
import { execAsync } from '@goatjs/node/exec';
import { platform } from '../constants.js';
import { isRunningWindows, startWindows, stopWindows } from './system/windows.js';

const successMessage = 'Tor started successfully!';

export const isRunning = async () => {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (platform) {
    case 'win32': {
      return isRunningWindows();
    }
    default: {
      throw new Error('Node tor is not supported on this platform.');
    }
  }
};

export const start = async () => {
  switch (platform) {
    case 'win32': {
      return startWindows();
    }
    case 'darwin': {
      throw new Error('Not ready');
      await execAsync('/usr/local/opt/tor/bin/tor');
      console.log(successMessage);
      break;
    }
    default: {
      throw new Error('Starting tor is not supported on this platform.');
    }
  }
};

export const stop = () => {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (platform) {
    case 'win32': {
      return stopWindows();
    }
    default: {
      throw new Error('Starting tor is not supported on this platform.');
    }
  }
};

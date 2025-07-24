import { platform } from '../../constants.js';
import { isRunningWindows, startWindows, stopWindows } from './system/windows.js';
import { isRunningMac, startMac, stopMac } from './system/mac.js';

export const isRunning = async () => {
  switch (platform) {
    case 'win32': {
      return isRunningWindows();
    }
    case 'darwin': {
      return isRunningMac();
    }
    default: {
      throw new Error('Node tor manager is not supported on this platform.');
    }
  }
};

export const start = async () => {
  switch (platform) {
    case 'win32': {
      return startWindows();
    }
    case 'darwin': {
      return startMac();
    }
    default: {
      throw new Error('Starting tor is not supported on this platform.');
    }
  }
};

export const stop = () => {
  switch (platform) {
    case 'win32': {
      return stopWindows();
    }
    case 'darwin': {
      return stopMac();
    }
    default: {
      throw new Error('Starting tor is not supported on this platform.');
    }
  }
};

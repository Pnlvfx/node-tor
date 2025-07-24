/* eslint-disable no-console */
import { execAsync } from '@goatjs/node/exec';
import { startingMessage, successMessage } from '../messages.js';
import { psList } from '@goatjs/pslist';

export const requirementsMac = async () => {
  if (!(await $isInstalledMac())) throw new Error('Tor is not installed on your system. Please run our installer manager before continuing.');
};

export const $isInstalledMac = async () => {
  /** TODO [2025-08-30] is weak */
  const { stdout } = await execAsync('brew list');
  return stdout.includes('tor');
};

export const isRunningMac = async () => {
  const list = await psList();
  console.log(list);
  // TODO [2025-07-25] implement start then do this.
  return false;
};

export const startMac = async () => {
  if (!(await isRunningMac())) {
    console.log(startingMessage);
    await execAsync('/usr/local/opt/tor/bin/tor');
    console.log(successMessage);
  }
};

export const stopMac = async () => {
  // TODO [2025-07-25] implement start then do this.
};

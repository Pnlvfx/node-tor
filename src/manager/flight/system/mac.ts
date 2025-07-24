/* eslint-disable no-console */
import { execAsync } from '@goatjs/node/exec';
import { psList } from '@goatjs/pslist';
import { $startTor } from '../start.js';

const getTorProcess = async () => {
  const list = await psList();
  const runningTors = list.filter((i) => i.name === 'tor');
  if (runningTors.length > 1) throw new Error('Found more than 1 tor running processes.');
  const child = runningTors.at(0);
  return child;
};

export const requirementsMac = async () => {
  if (!(await $isInstalledMac())) throw new Error('Tor is not installed on your system. Please run our installer manager before continuing.');
  await getTorProcess();
};

export const $isInstalledMac = async () => {
  /** TODO [2025-08-30] is weak */
  const { stdout } = await execAsync('brew list');
  return stdout.includes('tor');
};

export const isRunningMac = async () => {
  const list = await psList();
  return list.some((i) => i.name === 'tor');
};

export const startMac = async () => {
  if (!(await isRunningMac())) {
    await $startTor('/usr/local/opt/tor/bin/tor');
  }
};

export const stopMac = async () => {
  const child = await getTorProcess();
  if (child) {
    console.log('Stopping tor...');
    await execAsync(`kill ${child.pid.toString()}`);
    console.log('Tor stopped!');
  }
};

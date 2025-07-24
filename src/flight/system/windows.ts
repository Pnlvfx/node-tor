/* eslint-disable no-console */
import fs from 'node:fs/promises';
import { psList } from '@goatjs/pslist';
import { execAsync } from '@goatjs/node/exec';
import { windowsExecutable, windowsExecutableName } from '../../config.js';
import { $startTor } from '../start.js';

const getTorProcess = async () => {
  const list = await psList();
  const runningTors = list.filter((i) => i.name === windowsExecutableName);
  if (runningTors.length > 1) throw new Error('Found more than 1 tor running processes.');
  return runningTors.at(0);
};

export const requirementsWindows = async () => {
  await fs.access(windowsExecutable);
  await getTorProcess(); // CHECK PROCESS LIST
};

export const isRunningWindows = async () => {
  const list = await psList();
  return list.some((child) => child.name === windowsExecutableName);
};

export const startWindows = async () => {
  if (!(await isRunningWindows())) {
    await $startTor(windowsExecutable);
  }
};

export const stopWindows = async () => {
  const child = await getTorProcess();
  if (child) {
    console.log('Stopping tor...');
    await execAsync(`taskkill /F /PID ${child.pid.toString()}`);
    console.log('Tor stopped!');
  }
};

/* eslint-disable no-console */
import fs from 'node:fs/promises';
import { psList } from '@goatjs/pslist';
import { spawn } from 'node:child_process';
import { execAsync } from '@goatjs/node/exec';
import { windowsExecutable, windowsExecutableName } from '../../config.js';

const getTorProcess = async () => {
  const list = await psList();
  const runningTors = list.filter((i) => i.name === windowsExecutableName);
  if (runningTors.length > 1) throw new Error('Found more than 1 tor running processes.');
  const child = runningTors.at(0);
  return child;
};

export const requirementsWindows = async () => {
  await getTorProcess(); // CHECK PROCESS LIST
  return fs.access(windowsExecutable);
};

export const isRunningWindows = async () => {
  const list = await psList();
  return list.some((child) => child.name === windowsExecutableName);
};

/** If started with detached you should manually stop it using tor.stop. */
export const startWindows = async ({ detached }: { detached?: boolean } = {}) => {
  if (!(await isRunningWindows())) {
    return new Promise<void>((resolve, reject) => {
      console.log('Starting tor...');
      const child = spawn(windowsExecutable, { detached });

      child.on('error', reject);

      child.stderr.on('data', (chunk: Buffer) => {
        console.warn('stderr:', chunk.toString());
      });

      child.stdout.on('data', (chunk: Buffer) => {
        const data = chunk.toString();
        if (data.includes('Bootstrapped 100%')) {
          resolve();
        }
      });
    });
  }
};

export const stopWindows = async () => {
  if (await isRunningWindows()) {
    const child = await getTorProcess();
    if (child) {
      console.log('Closing tor...');
      await execAsync(`taskkill /F /PID ${child.pid.toString()}`);
    }
  }
};

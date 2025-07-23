/* eslint-disable no-console */
import path from 'node:path';
import { rootDir } from '../../constants.js';
import { download } from '@goatjs/download';
import { extract } from 'tar';
import fs from 'node:fs/promises';
import { psList } from '@goatjs/pslist';
import { spawn } from 'node:child_process';
import { execAsync } from '@goatjs/node/exec';

const torExecutableName = 'tor.exe';
const torExecutable = path.join(rootDir, 'tor', torExecutableName);

export const installWindows = async () => {
  try {
    await fs.access(torExecutable);
    console.log('Tor was already installed.');
  } catch {
    console.log('Downloading tor expert bundle...');
    const zipFile = await download('https://dist.torproject.org/torbrowser/13.5.20/tor-expert-bundle-windows-x86_64-13.5.20.tar.gz', {
      directory: rootDir,
    });
    console.log('Extracting tar file.');
    await extract({ file: zipFile, cwd: rootDir });
    await fs.rm(zipFile);
    console.log('Tor installed successfully');
  }
};

const getTorProcess = async () => {
  const list = await psList();
  const runningTors = list.filter((i) => i.name === torExecutableName);
  if (runningTors.length > 1) throw new Error('Found more than 1 tor running processes.');
  const child = runningTors.at(0);
  return child;
};

export const requirementsWindows = async () => {
  await getTorProcess(); // CHECK PROCESS LIST
  return fs.access(torExecutable);
};

export const isRunningWindows = async () => {
  const list = await psList();
  return list.some((child) => child.name === torExecutableName);
};

export const startWindows = async () => {
  if (!(await isRunningWindows())) {
    return new Promise<void>((resolve, reject) => {
      console.log('Starting tor...');
      const child = spawn(torExecutable, { detached: true });

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

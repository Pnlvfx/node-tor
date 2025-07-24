/* eslint-disable no-console */
import { download } from '@goatjs/download';
import { extract } from 'tar';
import fs from 'node:fs/promises';
import { rootDir, windowsExecutable } from '../../../config.js';

export const installWindows = async () => {
  try {
    await fs.access(windowsExecutable);
    console.log('Tor already installed.');
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

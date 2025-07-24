/* eslint-disable no-console */
import { execAsync } from '@goatjs/node/exec';
import { $isInstalledMac } from '../../flight/system/mac.js';

export const installMac = async () => {
  if (await $isInstalledMac()) {
    console.log('Tor already installed.');
  } else {
    await execAsync('brew update');
    await execAsync('brew install tor');
    console.log('Tor installed successfully.');
  }
};

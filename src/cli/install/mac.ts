/* eslint-disable no-console */
import { execAsync } from '@goatjs/node/exec';

export const installMac = async () => {
  const { stdout } = await execAsync('brew install tor');
  console.log(stdout);
};

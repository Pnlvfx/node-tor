/* eslint-disable no-console */
import { spawn } from 'node:child_process';

const startingMessage = 'Starting tor...';
const successMessage = 'Tor started successfully!';

/** If started with detached you should manually stop it using tor.stop or it will continue to run even if node stop. */
export const $startTor = async (command: string) => {
  return new Promise<void>((resolve, reject) => {
    console.log(startingMessage);
    const child = spawn(command);

    child.on('error', reject);

    child.stderr.on('data', (chunk: Buffer) => {
      console.warn('stderr:', chunk.toString());
    });

    child.stdout.on('data', (chunk: Buffer) => {
      const data = chunk.toString();
      if (data.includes('Bootstrapped 100%')) {
        console.log(successMessage);
        resolve();
      }
    });
  });
};

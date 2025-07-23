/* eslint-disable no-console */

import { input } from '@goatjs/node/input';
import { tor } from '../src/tor.js';
import { install } from '../src/cli/install/install.js';

const run = async () => {
  console.log('running', await tor.isRunning());
  const text = await input.create({ title: '1. install Tor\n2. start Tor Service \n3. stop Tor Service\n4. check Tor connection' });
  switch (text) {
    case '1': {
      await install();
      break;
    }
    case '2': {
      await tor.start();
      break;
    }
    case '3': {
      await tor.stop();
      break;
    }
    case '4': {
      await tor.check();
      break;
    }
    default: {
      console.log('Invalid input provided.');
    }
  }
  await run();
};

await run();

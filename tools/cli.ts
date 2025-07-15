/* eslint-disable no-console */

import { input } from '@goatjs/node/input';
import { tor } from '../src/tor.js';

const run = async () => {
  const text = await input.create({ title: '1. install Tor\n2. start Tor Service \n3. stop Tor Service\n4. check Tor connection' });
  switch (text) {
    case '1': {
      await tor.install({ debug: true });
      break;
    }
    case '2': {
      await tor.startService();
      break;
    }
    case '3': {
      await tor.stopService();
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

import { findUnusedExports } from '@goatjs/ts-unused-exports';

const unused = await findUnusedExports({
  ignoreFiles: ['eslint.config.js'],
  ignoreVars: [],
});

if (unused) {
  throw new Error(`The following exports are unused, add them on the ignore or remove the exports to continue.\n${JSON.stringify(unused)}`);
}

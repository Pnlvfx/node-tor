import { updateLocalDeps } from '@goatjs/updater';

await updateLocalDeps({
  '@goatjs/eslint': 'github:Pnlvfx/eslint',
  '@goatjs/core': 'github:Pnlvfx/goatjs#workspace=@goatjs/core',
  '@goatjs/node': 'github:Pnlvfx/goatjs#workspace=@goatjs/node',
  '@goatjs/rimraf': 'github:Pnlvfx/goatjs#workspace=@goatjs/rimraf',
  '@goatjs/storage': 'github:Pnlvfx/goatjs#workspace=@goatjs/storage',
  '@goatjs/ts-unused-exports': 'github:Pnlvfx/goatjs#workspace=@goatjs/ts-unused-exports',
  '@goatjs/typescript-config': 'github:Pnlvfx/typescript-config',
  '@goatjs/updater': 'github:Pnlvfx/goatjs#workspace=@goatjs/updater',
});

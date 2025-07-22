import { goateslint } from '@goatjs/node-eslint';

export default goateslint({ ignores: ['dist', 'sourcemapper', '.source'], tsconfigRootDir: import.meta.dirname });

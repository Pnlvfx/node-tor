import { storage } from '@goatjs/storage';
import path from 'node:path';

export const rootDir = await storage.use('tor', { root: true });

export const windowsExecutableName = 'tor.exe';
export const windowsExecutable = path.join(rootDir, 'tor', windowsExecutableName);

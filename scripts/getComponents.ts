import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export interface ComponentInfo {
  componentName: string;
  entryName: string;
  entryPath: string;
}

export function getComponents(): ComponentInfo[] {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const componentsRoot = path.resolve(__dirname, '../src/components');

  return fs
    .readdirSync(componentsRoot, { withFileTypes: true })
    .filter(
      (dirent) =>
        dirent.isDirectory() &&
        dirent.name !== 'icons' &&
        !dirent.name.startsWith('_')
    )
    .map((dirent) => ({
      componentName: dirent.name,
      entryName: `components/${dirent.name}/index`,
      entryPath: path.resolve(componentsRoot, dirent.name, 'index.ts')
    }));
}

import fs from 'node:fs';
import path from 'node:path';
import { getComponents } from './getComponents';

const root = process.cwd();
const generatedDir = path.join(root, 'src');
const generatedIndex = path.join(generatedDir, 'index.ts');

fs.mkdirSync(generatedDir, { recursive: true });

const content = getComponents()
  .map(({ componentName }) => {
    return `export { default as ${componentName} } from './components/${componentName}';`;
  })
  .join('\n\n');

fs.writeFileSync(generatedIndex, content);

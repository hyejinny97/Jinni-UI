import ts from 'typescript';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const distRoot = path.join(root, 'dist');
const configPath = path.join(root, 'tsconfig.app.json');
const configFile = ts.readConfigFile(configPath, ts.sys.readFile);

if (configFile.error) {
  throw new Error(
    ts.flattenDiagnosticMessageText(configFile.error.messageText, '\n')
  );
}

const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, root);
const aliases = Object.entries(parsed.options.paths ?? {}).map(
  ([alias, targets]) => ({
    aliasPrefix: alias.replace(/\/\*$/, ''),
    targetPrefix: targets[0].replace(/\/\*$/, '')
  })
);

const resolveAlias = (importPath: string, currentFile: string): string => {
  for (const alias of aliases) {
    if (
      importPath === alias.aliasPrefix ||
      importPath.startsWith(alias.aliasPrefix + '/')
    ) {
      const subPath = importPath.slice(alias.aliasPrefix.length);
      const target = path.join(root, alias.targetPrefix, subPath);
      const distTarget = target.replace(
        path.join(root, 'src'),
        path.join(root, 'dist')
      );

      let relative = path.relative(path.dirname(currentFile), distTarget);
      relative = relative.replace(/\\/g, '/');
      if (!relative.startsWith('.')) {
        relative = './' + relative;
      }

      return relative;
    }
  }
  return importPath;
};

const walk = (dir: string): string[] => {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return walk(fullPath);
    }

    return fullPath.endsWith('.d.ts') ? [fullPath] : [];
  });
};

export const rewriteDeclarationImports = () => {
  const files = walk(distRoot);

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/from\s+['"]([^'"]+)['"]/g, (_, importPath) => {
      return `from '${resolveAlias(importPath, file)}'`;
    });

    fs.writeFileSync(file, content);
  }
};

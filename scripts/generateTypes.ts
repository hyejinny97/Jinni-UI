import ts from 'typescript';
import path from 'node:path';
import { getComponents } from './getComponents';
import { rewriteDeclarationImports } from './rewriteDeclarationImports';

const root = process.cwd();
const configPath = path.join(root, 'tsconfig.app.json');
const configFile = ts.readConfigFile(configPath, ts.sys.readFile);

if (configFile.error) {
  throw new Error(
    ts.flattenDiagnosticMessageText(configFile.error.messageText, '\n')
  );
}

const parsedConfig = ts.parseJsonConfigFileContent(
  configFile.config,
  ts.sys,
  root,
  undefined,
  configPath
);

const declarationFiles = parsedConfig.fileNames.filter((file) =>
  file.endsWith('.d.ts')
);

const entries = [
  ...declarationFiles,
  path.join(root, 'src', 'index.ts'),
  ...getComponents().map((component) => component.entryPath)
];

const program = ts.createProgram({
  rootNames: entries,
  options: {
    ...parsedConfig.options,
    noEmit: false,
    declaration: true,
    emitDeclarationOnly: true,
    outDir: path.join(root, 'dist'),
    rootDir: path.join(root, 'src'),
    declarationMap: false
  }
});

const emitResult = program.emit();
rewriteDeclarationImports();

const diagnostics = ts
  .getPreEmitDiagnostics(program)
  .concat(emitResult.diagnostics);

if (diagnostics.length) {
  console.error(
    ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: (fileName) => fileName,
      getCurrentDirectory: () => root,
      getNewLine: () => '\n'
    })
  );

  process.exit(1);
}

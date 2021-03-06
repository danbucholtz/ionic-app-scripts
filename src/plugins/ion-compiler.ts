import { dirname, join } from 'path';
import { TsFiles } from '../util/interfaces';
import * as pluginutils from 'rollup-pluginutils';


export function ionCompiler(tsFiles: TsFiles) {
  const filter = pluginutils.createFilter(INCLUDE, EXCLUDE);

  return {
    name: 'ion-compiler',

    transform(sourceText: string, sourcePath: string): any {
      if (!filter(sourcePath)) {
        return null;
      }

      const file = tsFiles[sourcePath];
      if (!file || !file.output) {
        console.error(`unable to find ${sourcePath}`);
        return null;
      }

      return {
        code: file.output,
        map: file.map
      };
    },

    resolveId(importee: string, importer: string): any {
      if (!importer || /\0/.test(importee)) {
        // disregard entry module
        // ignore IDs with null character, these belong to other plugins
        return null;
      }

      const importerFile = tsFiles[importer];
      if (importerFile && importerFile.output) {
        const attemptedImportee = join(dirname(importer), importee) + '.ts';
        const importeeFile = tsFiles[attemptedImportee];
        if (importeeFile) {
          return attemptedImportee;
        }
      }

      return null;
    },

    load(sourcePath: string) {
      const file = tsFiles[sourcePath];
      if (file && file.input) {
        return file.input;
      }

      return null;
    }
  };
}


const INCLUDE = ['*.ts+(|x)', '**/*.ts+(|x)'];
const EXCLUDE = ['*.d.ts', '**/*.d.ts'];

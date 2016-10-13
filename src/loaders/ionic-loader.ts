import { getCachedTranspiledTsFiles } from '../util/helpers';

const transpiledFiles = getCachedTranspiledTsFiles();

module.exports = function ionicLoader(source: any, map: any) {

  if (transpiledFiles) {
    const file = transpiledFiles[this.resourcePath];
    if (file) {
      logIt(`Using in-memory file for ${this.resourcePath}`);
      this.callback(null, file.output, file.map);
    } else {
      logIt(`Using persisted file for ${this.resourcePath}`);
      this.callback(null, source, map);
    }
  } else {
    // the files aren't in memory, so it's a prod build
    // just use the default behavior
    this.callback(null, source, map);
  }
};

function logIt(stringToLog: string) {
  if ( stringToLog.indexOf('node_modules') === -1 ) {
    console.log(stringToLog);
  }
}
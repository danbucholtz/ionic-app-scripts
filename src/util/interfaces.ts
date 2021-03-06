
export interface BuildContext {
  rootDir?: string;
  tmpDir?: string;
  srcDir?: string;
  wwwDir?: string;
  buildDir?: string;
  moduleFiles?: string[];
  isProd?: boolean;
  isWatch?: boolean;
  jsSourceMaps?: boolean;
  cssSourceMaps?: boolean;
  useTranspileCache?: boolean;
  useBundleCache?: boolean;
  useSassCache?: boolean;
}


export interface WorkerMessage {
  task?: string;
  context?: BuildContext;
  workerConfig?: any;
  resolve?: any;
  reject?: any;
  error?: any;
  pid?: number;
}


export interface WorkerProcess {
  task: string;
  worker: any;
}


export interface TaskInfo {
  fullArgConfig: string;
  shortArgConfig: string;
  envConfig: string;
  defaultConfigFile: string;
}


export interface TsFile {
  input?: string;
  output?: string;
  map?: any;
}


export interface TsFiles {
  [sourcePath: string]: TsFile;
}

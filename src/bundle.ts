import { BuildContext, TaskInfo } from './util/interfaces';
import { BuildError } from './util/logger';
import { fillConfigDefaults, generateContext, getUserConfigFile } from './util/config';
import { rollup, rollupUpdate, getRollupConfig } from './rollup';
import { transpile, transpileUpdate } from './transpile';
import { webpack, webpackUpdate } from './webpack';


export function bundle(context?: BuildContext, configFile?: string) {
  context = generateContext(context);
  configFile = getUserConfigFile(context, taskInfo, configFile);
  const bundleConfig: BundleConfig = fillConfigDefaults(configFile, taskInfo.defaultConfigFile);

  return createBundle(context, configFile, bundleConfig).catch(err => {
    throw new BuildError(err);
  });
}

function createBundle(context: BuildContext, configFile: string, bundleConfig: BundleConfig) {
  if (bundleConfig.useWebpack) {
    // TODO - get the attribute from config later
    context.jsSourceMaps = true;
    return transpile(context).then(tsFiles => {
      return webpack(context, configFile, tsFiles);
    });
  } else {
    // TODO - the config file is almost certainly wrong here in this context,
    // so we need to change how Rollup gets access to it
    const rollupConfig = getRollupConfig(context, configFile);
    context.jsSourceMaps = rollupConfig.sourceMap;
    return transpile(context).then(tsFiles => {
      return rollup(context, configFile, tsFiles);
    });
  }
}


export function bundleUpdate(event: string, path: string, context: BuildContext) {
  const configFile = getUserConfigFile(context, taskInfo, null);
  const bundleConfig: BundleConfig = fillConfigDefaults(configFile, taskInfo.defaultConfigFile);

  if (bundleConfig.useWebpack) {
    // TODO - get the attribute from config later
    context.jsSourceMaps = true;
  } else {
    const rollupConfig = getRollupConfig(context, null);
    context.jsSourceMaps = rollupConfig.sourceMap;
  }
  return transpileUpdate(event, path, context).then(tsFiles => {
    if (bundleConfig.useWebpack) {
      return webpackUpdate(event, path, context, null, tsFiles);
    } else {
      return rollupUpdate(event, path, context, tsFiles);
    }
  })
  .catch(err => {
    throw new BuildError(err);
  });
}



const taskInfo: TaskInfo = {
  fullArgConfig: '--bundle',
  shortArgConfig: '-e',
  envConfig: 'ionic_bundle',
  defaultConfigFile: 'bundle.config'
};

export interface BundleConfig {
  useWebpack: boolean;
}

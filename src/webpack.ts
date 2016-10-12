import { BuildContext, TaskInfo } from './util/interfaces';
import { BuildError, Logger } from './util/logger';
import { fillConfigDefaults, generateContext, getUserConfigFile, replacePathVars } from './util/config';
import { runWorker } from './worker-client';

import * as wp from 'webpack';


export function webpack(context?: BuildContext, configFile?: string) {
  context = generateContext(context);
  configFile = getUserConfigFile(context, taskInfo, configFile);

  const logger = new Logger('webpack');

  return runWorker('webpack', context, configFile).then(() => {
    logger.finish();

  }).catch(err => {
    throw logger.fail(err);
  });
}


export function webpackWorker(context: BuildContext, configFile: string): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      // provide a full path for the config options
      let webpackConfig: WebpackConfig = fillConfigDefaults(configFile, taskInfo.defaultConfigFile);
      webpackConfig.entry = replacePathVars(context, webpackConfig.entry);
      webpackConfig.output.path = replacePathVars(context, webpackConfig.output.path);

      const compiler = wp(webpackConfig);
      compiler.run((err: Error, stats: any) => {
        if (err) {
          reject(err);
        } else {
          console.log('Webpack output: ', stats);
          resolve();
        }
      });
    } catch (e) {
      reject(new BuildError(e));
    }
  });
}


const taskInfo: TaskInfo = {
  fullArgConfig: '--webpack',
  shortArgConfig: '-wp',
  envConfig: 'ionic_webpack',
  defaultConfigFile: 'webpack.config'
};


export interface WebpackConfig {
  // https://www.npmjs.com/package/webpack
  entry: string;
  output: any;
}

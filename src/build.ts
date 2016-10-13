import { BuildContext } from './util/interfaces';
import { BuildError, Logger } from './util/logger';
import { generateContext } from './util/config';
import { bundle, bundleUpdate } from './bundle';
import { clean } from './clean';
import { copy } from './copy';
import { lint } from './lint';
import { minifyCss, minifyJs } from './minify';
import { ngc } from './ngc';
import { sass, sassUpdate } from './sass';


export function build(context: BuildContext) {
  context = generateContext(context);

  const logger = new Logger(`build ${(context.isProd ? 'prod' : 'dev')}`);

  return runBuild(context).then(() => {
    // congrats, we did it!  (•_•) / ( •_•)>⌐■-■ / (⌐■_■)
    logger.finish();

  }).catch(err => {
    throw logger.fail(err);
  });
}


function runBuild(context: BuildContext) {
  if (context.isProd) {
    // production build
    return buildProd(context);
  }

  // dev build
  return buildDev(context);
}


function buildProd(context: BuildContext) {
  // sync empty the www directory
  clean(context);

  // async tasks
  // these can happen all while other tasks are running
  const copyPromise = copy(context);
  const lintPromise = lint(context);

  // kick off ngc to run the Ahead of Time compiler
  return ngc(context).then(() => {
    // ngc has finished, now let's bundle it all together
    return bundle(context);

  }).then(() => {
    // js minify can kick off right away
    //const jsPromise = minifyJs(context);

    // sass needs to finish, then css minify can run when sass is done
    const sassPromise = sass(context).then(() => {
      return minifyCss(context);
    });

    return Promise.all([
      //jsPromise,
      sassPromise
    ]);

  }).then(() => {
    // ensure the async tasks have fully completed before resolving
    return Promise.all([
      copyPromise,
      lintPromise
    ]);
  });
}


function buildDev(context: BuildContext) {
  // sync empty the www directory
  clean(context);

  // just bundle, and if that passes then do the rest at the same time
  return bundle(context)
    .then(() => {
      return Promise.all([
        sass(context),
        copy(context),
        lint(context)
      ]);
    });
}


export function buildUpdate(event: string, path: string, context: BuildContext) {
  return bundleUpdate(event, path, context)
    .then(() => {
      if (event !== 'change') {
        // if just the TS file changed, then there's no need to do a sass update
        // however, if a new TS file was added or was deleted, then we should do a sass update
        return sassUpdate(event, path, context);
      }
    })
    .catch(err => {
      throw new BuildError(err);
    });
}

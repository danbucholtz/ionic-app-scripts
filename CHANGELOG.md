# 0.0.31 (2016-10-11)

* Add ability use multiple processor cores for various subtasks
* Use typescript `createProgram` to transpile entire app
* Add syntax highlighting and colors to typescript, sass and tslint errors
* Add task to copy `src/manifest.json` to `www/manifest.json`


# 0.0.30 (2016-10-06)

* Fix JS source maps
* Fix template inlining


# 0.0.29 (2016-10-05)

* Addressed memory usage error
* Dev builds no longer use the `.tmp` directory
* Dev build entry files should be the source `main.dev.ts` file
* Custom rollup configs should remove the `ngTemplate()` plugin

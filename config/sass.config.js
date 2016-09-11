
module.exports = {

  /**
   * "outputFilename" is the filename of the saved CSS file
   * from the sass build. The directory which it is saved in
   * is set within the "buildDir" config options.
   */
  outputFilename: 'main.css',

  /**
   * "sourceMap" if a source map should be built or not.
   */
  sourceMap: true,

  /**
   * "outputStyle" how node-sass should output the css file.
   */
  outputStyle: 'expanded',

  /**
   * "autoprefixer" is the config options for autoprefixer.
   * Excluding this config will skip using autoprefixer.
   */
  autoprefixer: {
    browsers: [
      'last 2 versions',
      'iOS >= 8',
      'Android >= 4.4',
      'Explorer >= 11',
      'ExplorerMobile >= 11'
    ],
    cascade: false
  },

  /**
   * "includePaths" is used by node-sass for additional
   * paths to search for sass imports by just name.
   */
  includePaths: [
    'node_modules/ionic-angular/themes',
    'node_modules/ionicons/dist/scss'
  ],

  /**
   * "includeFiles" is an array of regex patterns to search for
   * sass files in the same directory as the component module.
   */
  includeFiles: [
    /\.(scss)$/i
  ],

  /**
   * "excludeFiles" is an array of regex patterns for files which
   * should be excluded. If a file matches both include and exclude
   * patterns, then the file it will be excluded.
   */
  excludeFiles: [
    /*  /\.(wp).(scss)$/i  */
  ],

  /**
   * "variableSassFiles" lists out the files which include
   * only sass variables. These variables are the first sass files
   * to be imported so their values override default variables.
   */
  variableSassFiles: [
    '{{SRC}}/theme/variables.scss'
  ],

  /**
   * Compiled modules may be within a different directory
   * than its source file and sibling component sass files.
   * For example, NGC places it's files within the tmp directory
   * but doesn't copy over its sass files. This is just useful
   * to also check the source directory for sass files.
   */
  directoryMaps: {
    '{{TMP}}': '{{SRC}}'
  },

  /**
   * "excludeModules" is used just as a way to skip over
   * modules which we know wouldn't have any sass to be
   * bundled. "excludeModules" isn't necessary, but is a
   * good way to speed up build times by skipping modules.
   */
  excludeModules: [
    '@angular',
    'core-js',
    'ionic-native',
    'rxjs',
    'rxjs-es',
    'zone.js'
  ]

};

/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    /* --------------------------------------- */
    /* --( Variables )-- */
    /* --------------------------------------- */

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

    /* --------------------------------------- */
    /* --( Clean old build directory )-- */
    /* --------------------------------------- */

    clean: {
      options: { force: true },
      all: {
        src: ['<%= pkg.buildDir %>/<%= pkg.name %>']
      },
      scripts: {
        src: ['<%= pkg.buildDir %>/<%= pkg.name %>/app']
      }
    },

    /* --------------------------------------- */
    /* --( JSHint )-- */
    /* --------------------------------------- */

    jshint: {
      options: {
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        laxcomma: true,
        laxbreak: true,
        browser: true,
        unused: false,
        globals: {
          define: true,
          require: true
        }
      },
      release: ['app/**/*.js', '!app/**/*.spec.js'],
      dev: {
        options: {devel: true, debug: true},
        files: {
          src: ['app/**/*.js', '!app/**/*.spec.js']
        }
      }
    },

    /* --------------------------------------- */
    /* --( Copy Files into Build Directory )-- */
    /* --------------------------------------- */

    copy: {
      app: {
        files: [{expand: true, src: ['app/**'], dest: '<%= pkg.buildDir %>/<%= pkg.name %>/'}]
      },
      vendor: {
        files: [{expand: true, src: ['vendor/**'], dest: '<%= pkg.buildDir %>/<%= pkg.name %>/'}]
      },
      assets: {
        files: [{expand: true, src: ['assets/**'], dest: '<%= pkg.buildDir %>/<%= pkg.name %>/'}]
      }
    },

    /* --------------------------------------- */
    /* --( Process Index file )-- */
    /* --------------------------------------- */

    processhtml: {
      dev: {
        files: {
          '<%= pkg.buildDir %>/<%= pkg.name %>/index.html' : ['index.html']
        }
      },
      release: {
        files: {
          '<%= pkg.buildDir %>/<%= pkg.name %>/index.html' : ['index.html']
        }
      },
    },

    /* --------------------------------------- */
    /* --( Build Require.js App  )-- */
    /* --------------------------------------- */

    requirejs: {
      options: {
        // Include the main ration file.
        mainConfigFile: 'app/main.js',

        // Setting the base url to the distribution directory allows the
        // Uglify minification process to correctly map paths for Source
        // Maps.
        baseUrl: '<%= pkg.buildDir %>/<%= pkg.name %>/app',

        // Wrap everything in an IIFE.
        wrap: true,

        // Set main.js as the main entry point.
        include: ['../vendor/almond/almond', 'main'],
        insertRequire: ['main'],

        // Output file.
        out: '<%= pkg.buildDir %>/<%= pkg.name %>/source.min.js',

        // Runn each module through ngmin
        normalizeDirDefines: 'all',
        onBuildRead: function (moduleName, path, contents) {
          return require('ngmin').annotate(contents);
        }

      },
      // Production Settings
      release: {
        options: {
          // Turn on Uglification
          optimize: 'uglify2',
          generateSourceMaps: true,
          preserveLicenseComments: false
        }
      },
      // Development Settings
      dev: {
        options: {
          // Turn on Uglification
          optimize: 'none'
        }
      }
    },

    /* --------------------------------------- */
    /* --( Create Angular template cache )-- */
    /* --------------------------------------- */

    html2js: {
      options: {
        base: '',
        fileHeaderString:
          "require(['angular'], function(angular) {",
        fileFooterString:
          "});"
      },
      app: {
        src: ['app/**/*.html'],
        dest: '<%= pkg.buildDir %>/<%= pkg.name %>/app/templates.js'
      },
    },

    /* --------------------------------------- */
    /* --( Temporary HTTP Server )-- */
    /* --------------------------------------- */

    connect: {
      server: {
        options: {
          port: 9001,
          keepalive: true
        }
      }
    },

    /* --------------------------------------- */
    /* --( Compile SASS )-- */
    /* --------------------------------------- */

    compass: {
      options: {
        sassDir: 'scss',
        imagesDir: 'assets/img',
        fontDir: 'assets/fonts',
        cssDir: 'assets/css'
      },
      release: {
        options: {
          environment: 'production'
        }
      },
      dev: {
        options: {
          environment: 'development'
        }
      }
    },

    /* --------------------------------------- */
    /* --( Renamed Watch Command )-- */
    /* --------------------------------------- */

    delta: {
      options: {
        livereload: true
      },
      app_js: {
        files: ['app/**/*.js', '!app/**/*.spec.js'],
        tasks: ['jshint:dev', 'copy:app']
      },
      assets: {
        files: ['assets/**/*'],
        tasks: ['copy:assets']
      },
      templates: {
        files: ['app/**/*.html'],
        tasks: ['copy:app', 'html2js']
      },
      sass: {
        files: ['scss/**/*.scss', 'app/**/*.scss'],
        tasks: ['compass:dev']
      },
      index: {
        files: ['index.html'],
        tasks: ['processhtml:dev']
      }
    },

    /* --------------------------------------- */
    /* --( Karma Test Config )-- */
    /* --------------------------------------- */

    karma: {
      unit: {
        configFile: 'test/karma.conf.js'
      }
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-karma');

  // Default task.
  grunt.registerTask('default', []);

  // Watch Alias
  grunt.renameTask('watch', 'delta');
  grunt.registerTask('watch', [ 'build:dev', 'delta' ]);

  // Production build
  grunt.registerTask('build', [ 'build:release' ]);
  grunt.registerTask('build:release', [
    'jshint:release', 'clean:all', 'compass:release', 'copy', 'html2js', 'requirejs:release',
    'processhtml:release'
  ]);

  // Development build
  grunt.registerTask('build:dev', [
    'jshint:dev', 'clean:all', 'compass:dev', 'copy', 'html2js', 'requirejs:dev',
    'processhtml:dev'
  ]);

};


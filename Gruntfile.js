'use strict';
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    paths: {
      app: 'app',
      dist: 'dist'
    },

    watch: {
      compass: {
        files: ['<%= paths.app %>/styles/{,*/}*.{scss,sass}'],
        tasks: 'compass:server'
      },
      handlebars: {
        files: ['<%= paths.app %>/scripts/templates/*.hbs'],
        tasks: 'handlebars:compile'
      }
    },

    connect: {
      options: {
        port: 9000,
        hostname: 'localhost'
      },
      server: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'app')
            ];
          }
        }
      },
      test: {
        options: {
          port: 9002,
          middleware: function (connect) {
            return [
              mountFolder(connect, '.tmp'),
              mountFolder(connect, 'test')
            ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [
              mountFolder(connect, 'dist')
            ];
          }
        }
      }
    },

    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      },
      test: {
        path: 'http://localhost:<%= connect.test.options.port %>'
      }
    },

    clean: {
      dist: ['.tmp', '<%= paths.dist %>/*'],
      server: '.tmp'
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= paths.app %>/scripts/{,*/}*.js',
        '!<%= paths.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },

    mocha: {
      all: {
        options: {
          reporter: 'Spec',
          run: false,
          urls: ['http://localhost:<%= connect.test.options.port %>/index.html']
        }
      }
    },

    compass: {
      options: {
        sassDir: '<%= paths.app %>/styles',
        imagesDir: '<%= paths.app %>/images',
        fontsDir: '/styles/fonts',
        importPath: '<%= paths.app %>/components',
        relativeAssets: true
      },
      dist: {
        options: {
          generatedImagesDir: '<%= paths.dist %>/images',
          cssDir: '<%= paths.dist %>/styles',
          outputStyle: 'compressed'
        }
      },
      server: {
        options: {
          generatedImagesDir: '.tmp/images',
          cssDir: '.tmp/styles',
          debugInfo: true
        }
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= paths.app %>/images',
          src: [
            '**/{,*/}*.{png,jpg,jpeg}',
            // Exclude sprites from being copied/minified
            '!sprites/**'
          ],
          dest: '<%= paths.dist %>/images'
        }]
      }
    },

    requirejs: {
      dist: {
        options: {
          name: 'main',
          baseUrl: '<%= paths.app %>/scripts',
          mainConfigFile: '<%= paths.app %>/scripts/config.js',
          out: '<%= paths.dist %>/scripts/main.js',
          findNestedDependencies: true,

          optimize: 'uglify2',
          preserveLicenseComments: false,

          // Use Almond as AMD loader in production
          almond: true,
          replaceRequireScript: [{
            files: [ '<%= paths.dist %>/index.html' ],
            module: 'main',
            modulePath: 'scripts/main'
          }],

          // Require.js can't find compiled JS files
          // ( https://github.com/yeoman/yeoman/issues/956 )
          paths: {
            'templates': '../../.tmp/scripts/templates'
          }
        }
      }
    },

    htmlmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= paths.app %>',
          src: '*.html',
          dest: '<%= paths.dist %>'
        }]
      },
      options: {
        removeComments: true,
        collapseWhitespace: true
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= paths.app %>',
          dest: '<%= paths.dist %>',
          src: [
            '*.{ico,txt}'
          ]
        }]
      }
    },

    handlebars: {
      compile: {
        files: {
          '.tmp/scripts/templates.js': [
            '<%= paths.app %>/scripts/templates/*.hbs'
          ]
        },
        options: {
          namespace: 'Handlebars.templates',
          amd: true,
          processName: function (filename) {
            // funky name processing here
            return filename
              .replace(/^app\/scripts\/templates\//, '')
              .replace(/\.hbs$/, '');
          }
        }
      }
    },

    manifest: {
      generate: {
        options: {
          basePath: '<%= paths.dist %>/',
          network: ['http://*', 'https://*'],
          preferOnline: true,
          timestamp: true
        },
        src: [
          '*.html',
          'scripts/*.js',
          'styles/*.css',
          'styles/fonts/*',
          'images/**/*'
        ],
        dest: '<%= paths.dist %>/manifest.appcache'
      }
    }
  });

  grunt.registerTask('server', function (target) {
    if (target === 'dist') {
      grunt.task.run([
        'build',
        'open:server',
        'connect:dist:keepalive'
      ]);
    } else if (target === 'test') {
      grunt.task.run([
        'clean:server',
        'handlebars:compile',
        'compass:server',
        'connect:test',
        'open:test',
        'watch'
      ]);
    } else {
      grunt.task.run([
        'clean:server',
        'handlebars:compile',
        'compass:server',
        'connect:server',
        'open:server',
        'watch'
      ]);
    }
  });

  grunt.registerTask('test', [
    'jshint',
    'clean:server',
    'handlebars:compile',
    'compass',
    'connect:test',
    'mocha'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'handlebars:compile',
    'compass:dist',
    'htmlmin',
    'requirejs',
    'imagemin',
    'copy',
    'manifest'
  ]);

  grunt.registerTask('default', [
    'test',
    'build'
  ]);
};

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['specs/server/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    jshint: {
      files: [
        'client/**/*.js',
        'server/**/*.js',
        'specs/**/*.js'
      ],
      options: {
        force: 'true',
        jshintrc: '.jshintrc',
        ignores: [
          'specs/client/**/*.js'
        ]
      }
    },

    watch: {
      scripts: {
        files: [
          'server/**/*.js',
          'specs/server/**/*.js'
        ],
        tasks: [
          'test'
        ]
      }
    },

    karma: {
      unit: {
        configFile: 'client/karma.conf.js',
        singleRun: true,
        browsers: ['Chrome'],
        logLevel: 'ERROR'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-npm-install');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('test', 'Setup database and run mocha tests', [
    'mochaTest',
    'karma'
  ]);

  grunt.registerTask('build', 'Run npm-install, jshint, mochaTest and jsdoc tasks', [
    'npm-install',
    'jshint',
    'test'
  ]);

  grunt.registerTask('default', ['build']);
};

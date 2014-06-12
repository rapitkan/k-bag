(function () {
  
  'use strict';

  var gulp = require('gulp'),
      project = require('../projectStructure.json'),
      browserify = require('gulp-browserify'),
      jade = require('gulp-jade'),
      scss = require('gulp-ruby-sass'),
      connect = require('gulp-connect'),
      debug = require('gulp-debug'),
      jshint = require('gulp-jshint'),
      source = require('vinyl-source-stream'),
      rename = require('gulp-rename'),
      karma = require('gulp-karma');

/*******************
* TASKS
*******************/
  gulp.task('browserify', function() {
      // Single entry point to browserify
      gulp.src([project.devFolder + '/index.js'])
          .pipe(browserify({
            transform: ["debowerify"],
            insertGlobals: true,
            debug: true
          }))
          .pipe(rename('bundle.js'))
          .pipe(gulp.dest(project.devFolder))
          .pipe(connect.reload());
  });

  gulp.task('jshint', function() {
    gulp.src([project.devFolder + '/index.js', project.devFolder + '/**/*.js'])
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('jshint-stylish'));
  });

  gulp.task('views', function () {
    gulp.src([project.devFolder + '/index.jade', project.devFolder + '/**/*.jade'])
        .pipe(jade())
        .pipe(connect.reload())
        .pipe(gulp.dest(project.distFolder));
  });

  gulp.task('connect', function () {
    connect.server({
      root: project.distFolder,
      livereload: true
    });
  });

  gulp.task('scss', function () {
    gulp.src([project.devFolder + '/app.scss'])
      .pipe(scss({sourcemap: true}))
      .pipe(gulp.dest(project.distFolder));
  });

  gulp.task('copy-images', function () {
    gulp.src(project.devFolder + '/images/*.*')
      .pipe(gulp.dest(project.distFolder));
  });

  gulp.task('karma', function() {
    gulp.src('./foobar')
      .pipe(karma({
        configFile: 'karma.conf.js',
        action: 'watch'
      }));
  });

  gulp.task('watch', ['jshint'], function () {
    // Watch jade files
    gulp.watch([project.devFolder +'/index.jade', project.devFolder + '/**/*.jade'], { maxListeners: 999 }, ['views']);
    // Watch the main js file
    gulp.watch([project.devFolder + '/index.js', project.devFolder + '/**/*.js'], { maxListeners: 999}, ['browserify']);
  });

/*******************
* MAIN TASKS
*******************/
  gulp.task('dev', ['connect', 'views', 'browserify', 'scss', 'copy-images', 'watch']);

  gulp.task('test', ['karma']);

  gulp.task('build', ['views', 'browserify', 'scss', 'copy-images']);

}());
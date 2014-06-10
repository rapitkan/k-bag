(function () {
  
  'use strict';

  var gulp = require('gulp'),
      browserify = require('gulp-browserify'),
      jade = require('gulp-jade'),
      scss = require('gulp-ruby-sass'),
      connect = require('gulp-connect'),
      jshint = require('gulp-jshint'),
      watchify = require('watchify'),
      source = require('vinyl-source-stream'),
      rename = require('gulp-rename'),
      karma = require('gulp-karma');

/*******************
* TASKS
*******************/
  gulp.task('browserify', function() {
      // Single entry point to browserify
      gulp.src(['./dev/index.js'])
          .pipe(browserify({
            transform: ["debowerify"],
            insertGlobals: true,
            debug: true
          }))
          .pipe(rename('bundle.js'))
          .pipe(gulp.dest('./dist'))
          .pipe(connect.reload());
  });

  gulp.task('jshint', function() {
    gulp.src(['./dev/index.js', './dev/**/*.js'])
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('jshint-stylish'));
      /*.pipe(jshint())
      .pipe(jshint.reporter('default'));*/
  });

  gulp.task('views', function () {
    gulp.src('./dev/index.jade')
        .pipe(jade())
        .pipe(connect.reload())
        .pipe(gulp.dest('./dist'));
  });

  gulp.task('connect', function () {
    connect.server({
      root: './dist',
      livereload: true
    });
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
    gulp.watch(['./dev/index.jade', './dev/**/*.jade'], { maxListeners: 999 }, ['views']);
    // Watch the main js file
    gulp.watch(['./dev/index.js', './dev/**/*.js'], { maxListeners: 999}, ['browserify']);
  });

/*******************
* MAIN TASKS
*******************/
  gulp.task('dev', ['connect', 'views', 'browserify', 'watch']);

  gulp.task('test', ['karma']);

  gulp.task('build', ['views', 'browserify']);

}());
(function () {
  
  'use strict';

  var gulp = require('gulp'),
      browserify = require('gulp-browserify'),
      jade = require('gulp-jade'),
      scss = require('gulp-ruby-sass'),
      connect = require('gulp-connect'),
      jshint = require('gulp-jshint');

  gulp.task('browserify', function() {
      // Single entry point to browserify
      gulp.src('./dev/index.js')
          .pipe(browserify({
            insertGlobals: true,
            debug: true
          }))
          .pipe(connect.reload())
          .pipe(gulp.dest('./dist'));
  });

  gulp.task('jshint', function() {
    gulp.src('./src/scripts/*.js')
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
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

  gulp.task('watch', ['jshint'], function () {
    // Watch jade files
    gulp.watch(['./dev/index.jade', './dev/**/*.jade'], ['views']);
    // Watch js files
    gulp.watch(['./dev/index.js', './dev/**/*.js'], ['jshint', 'browserify']);
  });

  gulp.task('dev', ['connect', 'views', 'browserify', 'watch']);
}());
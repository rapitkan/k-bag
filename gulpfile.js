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
      gulp.src(['./dev/index.js', './dev/angular-mocks.js'])
          .pipe(browserify({
            insertGlobals: true,
            debug: true
          }))
          .pipe(rename('bundle.js'))
          .pipe(gulp.dest('./dist'))
          .pipe(connect.reload());
  });

  gulp.task('jshint', function() {
    gulp.src(['./dev/index.js', './dev/**/*.js'])
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

  gulp.task('karma', function() {
    gulp.src('./foobar')
      .pipe(karma({
        configFile: 'karma.conf.js',
        action: 'watch'
      }));
  });

  gulp.task('watch', ['jshint'], function () {
    function rebundle() {
      return bundler.bundle().pipe(source('bundle.js')).pipe(gulp.dest('./dist/'));
    }
    // Watch jade files
    gulp.watch(['./dev/index.jade', './dev/**/*.jade'], { maxListeners: 999 }, ['views']);
    // Watch the main js file
    var bundler = watchify(['./dev/index.js', './dev/angular-mocks'], {
      debug: true
    });
    bundler.on('update', rebundle);
    return rebundle();
  });

/*******************
* MAIN TASKS
*******************/
  gulp.task('dev', ['connect', 'views', 'watch']);

  gulp.task('test', ['karma']);

  gulp.task('build', ['views', 'browserify']);

}());
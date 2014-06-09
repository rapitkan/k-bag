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
      karma = require('gulp-karma');

/*******************
* TASKS
*******************/
  gulp.task('browserify', function() {
      // Single entry point to browserify
      gulp.src('./dev/index.min.js')
          .pipe(browserify({
            insertGlobals: true,
            debug: true
          }))
          .pipe(connect.reload())
          .pipe(gulp.dest('./dist'));
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

  gulp.task('test', function() {
    gulp.src('./foobar')
      .pipe(karma({
        configFile: 'karma.conf.js',
        action: 'watch'
      }));
  });

  gulp.task('watch', ['jshint'], function () {
    // Watch jade files
    gulp.watch(['./dev/index.jade', './dev/**/*.jade'], { maxListeners: 999 }, ['views']);
    // Watch js files    
    var bundler = watchify('./dev/index.js');
    bundler.on('update', rebundle);
    function rebundle() {
        return bundler.bundle()
            .pipe(source('bundle.js'))
            .pipe(gulp.dest('./dist/'));
    }
    return rebundle();
  
    // gulp.watch(['./dev/index.js', './dev/**/*.js'], { maxListeners: 999 }, ['jshint', 'browserify']);
  });

/*******************
* MAIN TASKS
*******************/
  gulp.task('dev', ['connect', 'views', 'browserify', 'watch']);

}());
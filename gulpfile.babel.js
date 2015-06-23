var gulp = require('gulp'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    rename = require('gulp-rename'),
    karma = require('gulp-karma'),
    connect = require('gulp-connect'),
    debug = false,
    WATCH_MODE = 'watch';

var mode = WATCH_MODE;

// Lints JavaScript code style based on jshint rules in .jshintrc
gulp.task('lint', () => {
  gulp.src('src/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish));
});

// Creates distribution and minified distribution file from source
gulp.task('js', () => {
  var jsTask = gulp
    .src('src/**/*.js')
    .pipe(babel())
    .pipe(concat('ng-suggestion.js'))
    .pipe(gulp.dest('dist/js'));
  if (!debug) {
    jsTask.pipe(uglify());
  }
  jsTask
    .pipe(rename('ng-suggestion.min.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

// Uses the connect server to serve the demo page (index.html)
gulp.task('connect', () => {
  gulp.watch(['index.html'], () => {
    gulp.src(['index.html'])
      .pipe(connect.reload());
  });

  connect.server({
    livereload: true
  });
});

// Watches files for changes and re-runs relevant tasks
gulp.task('watch', () => {
  var jsWatcher = gulp.watch('src/**/*.js', gulp.parallel('lint', 'js'));

  function changeNotification(event) {
    console.log('File', event.path, 'was', event.type);
  }

  jsWatcher.on('change', changeNotification);
});

gulp.task('default', gulp.parallel('lint', 'js', 'watch'));

gulp.task('server', gulp.parallel('connect', 'default'));
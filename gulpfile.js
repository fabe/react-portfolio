var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var rename = require('gulp-rename');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

// Basic usage
gulp.task('scripts', function() {
  var entryFile = './jsx/client.jsx';
  
  var bundler = browserify(entryFile, {extensions: [ ".js", ".jsx" ]});

  bundler.transform(babelify, {presets: "react"});

  bundler.add(entryFile);

  var stream = bundler.bundle();
  stream.on('error', function (err) { console.error(err.toString()) });

  stream
    .pipe(source(entryFile))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(rename('index.js'))
    .pipe(gulp.dest('public/'));
});

gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function() {
  gulp.watch(['./jsx/**/*'], ['scripts']);
  gulp.watch('./sass/**/*', ['sass']);
});

gulp.task('default', ['scripts', 'sass', 'watch']);
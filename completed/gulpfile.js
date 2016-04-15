var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var notify = require('gulp-notify');
var eslint = require('gulp-eslint');
var sourcemaps = require('gulp-sourcemaps');

// Scripts (JSX to JS)
gulp.task('scripts', function() {
  var entryFile = './jsx/client.jsx';

  // Set up Browserify
  var bundler = browserify(entryFile, {
    extensions: [ ".js", ".jsx" ],
    debug: true
  });

  // Transform JSX
  bundler.transform(babelify, {presets: "react"});

  bundler.add(entryFile);

  // Error handling
  var stream = bundler.bundle();
  stream.on('error', function(err) {
    console.log(err.toString());
  });

  // Pack our scripts together and get them ready
  stream
    .on('error', function(err) {
      console.log(err.toString());
      this.emit('end');
    })
    .pipe(source(entryFile))
    .pipe(rename('index.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(uglify({compress: true, mangle: true}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/'))
});

// SASS to CSS (not important to this workshop)
gulp.task('sass', function () {
  gulp.src('../sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./build/css/'));
});

// BrowserSync (our local webserver)
gulp.task('browser-sync', function() {
    browserSync({
        server : {},
        notify: false
    });
});

// We're watching the JSX and SCSS files for changes
gulp.task('watch', function() {
  gulp.watch(['./jsx/**/*'], ['lint', 'scripts']);
  gulp.watch('../sass/**/*', ['sass']);
});

// Get smarter errors...
gulp.task('lint', function () {
    return gulp.src([
      'jsx/**/*.js',
      'jsx/**/*.jsx'
    ])
      .pipe(eslint({ "ecmaFeatures": { "jsx": true } } ))
      .pipe(eslint.format())
      .pipe(eslint.failOnError())
      .on('error', handleErrors)
});

// Notify on error
function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

// Default task that combines all tasks
gulp.task('default', ['lint', 'scripts', 'sass', 'watch', 'browser-sync']);

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var reactify = require('reactify');
var webserver = require('gulp-webserver');

var scriptsDir = './scripts';
var buildDir = './build';

/*
  Styles
*/
gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(buildDir + '/css'));
});

/*
  Images
*/
gulp.task('images',function(){
  gulp.src('sass/images/**')
    .pipe(gulp.dest(buildDir + '/css/images'))
});

/*
  Scripts
*/
function handleErrors(err) {
  gutil.log(err.message)
}

function buildScript(file, watch) {
  var props = {entries: [scriptsDir + '/' + file]};
  var bundler = watch ? watchify(props) : browserify(props);
  bundler.transform(reactify);
  function rebundle() {
    var stream = bundler.bundle();
    return stream.on('error', handleErrors)
    .pipe(source(file))
    //.pipe(buffer())
    //.pipe(uglify())
    .pipe(gulp.dest(buildDir + '/'))
  }
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });
  return rebundle();
}

gulp.task('build', function() {
  return buildScript('main.js', false);
});

/*
  Server
*/
gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: false,
      directoryListing: false,
      open: false,
      fallback: 'index.html'
    }));
});

gulp.task('default', ['images','sass','build','webserver'], function() {
  gulp.watch('sass/**/*', ['sass']);
  gulp.watch('scripts/**/*', ['build']);
});

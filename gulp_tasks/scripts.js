const gulp = require('gulp');
const xo = require('gulp-xo');
const plumber = require('gulp-plumber');

const conf = require('../conf/gulp.conf');

gulp.task('scripts', scripts);

function scripts() {
  return gulp.src(conf.path.src('**/*.js'))
    .pipe(plumber({errorHandler: errorHandler}))
    .pipe(xo())
    .pipe(gulp.dest(conf.path.tmp()));
}

function errorHandler() {}

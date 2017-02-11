require('dotenv').config();

const gulp = require('gulp');
const gutil = require('gulp-util');
const browserify = require('browserify');
const watchify = require('watchify');
const envify = require('envify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const id = x => x;
const makeBundler = (path, wrapper = id, opts = {}) => {
  const options = Object.assign({}, opts, {
    entries: `./extension/lib/${path}.js`
  });
  const bundler = wrapper(browserify(options));

  const bundle = () =>
    bundler
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source(`${path}-bundle.js`))
      .pipe(buffer())
      .pipe(gulp.dest('./extension/dist'));

  bundler.transform(envify.bind(envify, process.env));
  bundler.on('update', bundle);
  bundler.on('log', gutil.log);

  return bundle;
};

const watch = path => makeBundler(path, watchify, watchify.args);

gulp.task('watch:background', watch('background'));
gulp.task('watch:popup', watch('popup'));
gulp.task('compile:background', makeBundler('background'));
gulp.task('compile:popup', makeBundler('popup'));
gulp.task('compile', ['compile:background', 'compile:popup']);
gulp.task('default', ['watch:background', 'watch:popup']);

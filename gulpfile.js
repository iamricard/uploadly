require('dotenv').config();

const gulp = require('gulp');
const gutil = require('gulp-util');
const browserify = require('browserify');
const watchify = require('watchify');
const envify = require('envify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const es = require('event-stream');

const makeBundler = (file, wrapper, opts = {}) => {
  const options = Object.assign({}, opts, {
    entries: `./extension/lib/${file}.js`
  });
  const bundler = wrapper(browserify(options));

  const bundle = () =>
    bundler
      .bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify Error'))
      .pipe(source(`${file}-bundle.js`))
      .pipe(buffer())
      .pipe(gulp.dest('./extension/dist'));

  bundler.transform(envify.bind(envify, process.env));
  bundler.on('update', bundle);
  bundler.on('log', gutil.log);

  return bundle();
};

const watch = file => makeBundler(file, watchify, watchify.args);

gulp.task('watch', () =>
  es.merge(['background', 'popup'].map(watch)));
gulp.task('compile', () =>
  es.merge(['background', 'popup'].map((f) => makeBundler(f, (x) => x))));
gulp.task('default', ['watch']);

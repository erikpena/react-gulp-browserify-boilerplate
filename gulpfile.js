'use strict';

var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var htmlrep = require('gulp-html-replace');
var merge = require('merge-stream');
var path = require('path');
var del = require("del");

var paths = {
	HTML: './public/index.html',
  VENDOR: './vendor',
	ENTRY: './src/js/app/App.jsx',
	DEST: './dist',
  DEST_SNAPSHOT: './dist/snapshot',
  DEST_BUILD:  './dist/build',
  BUNDLE: './js/bundle.js',
  BUNDLE_MIN: './js/bundle.min.js'
};

var htmlBulidReplacementConfig = {
  js_src: [ paths.BUNDLE_MIN ],
  js_vendor: [
    "./vendor/jquery/dist/jquery.min.js",
    "./vendor/bootstrap/dist/js/bootstrap.min.js",
    "./vendor/react/react.min.js",
    "./vendor/react/react-dom.min.js",
    "./vendor/lodash/lodash.min.js"
  ], css_vendor: [
    './vendor/bootstrap/dist/css/bootstrap.min.css',
    './vendor/bootstrap/dist/css/bootstrap-theme.min.css'
  ]
};

gulp.task('default', [ 'copy:snapshot', 'watch' ]);
gulp.task('production', [ 'copy:build', 'replaceHtml', 'build' ]);

gulp.task('watch', ['clean:snapshot'], function() {
  var opts = {
    entries: paths.ENTRY,
    transform: [ reactify ],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  };

  var watcher = watchify(browserify(opts));

  var bundle = function() {
    return watcher.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(paths.BUNDLE))
    .pipe(gulp.dest(paths.DEST_SNAPSHOT));
  };

  watcher.on('update', function() {
    bundle();

    console.log("Updated.");
  });

  gulp.watch(paths.HTML, ['copy:snapshot']);

  return bundle();
});

gulp.task('build', ['clean:build'], function() {
  var opts = {
    entries: paths.ENTRY,
    transform: [ reactify ]
  };

  return browserify(opts)
    .bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source(paths.BUNDLE_MIN))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify())
      .on('error', gutil.log.bind(gutil, 'Uglify Error'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.DEST_BUILD));
});

gulp.task('replaceHtml', function() {
  return gulp.src(paths.HTML)
    .pipe(htmlrep(htmlBulidReplacementConfig))
    .pipe(gulp.dest(paths.DEST_BUILD));
});

gulp.task('clean:build', function () {
  return del.sync(paths.DEST_BUILD);
});

gulp.task('clean:snapshot', function () {
  return del.sync(paths.DEST_SNAPSHOT);
});

gulp.task('copy:snapshot', function() {
  var copyHtml = gulp.src([ paths.HTML ])
    .on('error', gutil.log.bind(gutil, 'Copy Html Error'))
    .pipe(gulp.dest(paths.DEST_SNAPSHOT));

  var vendorSrc = path.join(paths.VENDOR, "**/*");
  var vendorDest = path.join(paths.DEST_SNAPSHOT, paths.VENDOR);

  var copyVendor = gulp.src(vendorSrc, { base: paths.VENDOR })
    .on('error', gutil.log.bind(gutil, 'Copy Vendor Error'))
    .pipe(gulp.dest(path.join(vendorDest)));

  return merge(copyHtml, copyVendor);
});

gulp.task('copy:build', function() {
  var vendorSrc = path.join(paths.VENDOR, "**/*");
  var vendorDest = path.join(paths.DEST_BUILD, paths.VENDOR);

  return gulp.src(vendorSrc, { base: paths.VENDOR })
    .on('error', gutil.log.bind(gutil, 'Copy Vendor Error'))
    .pipe(gulp.dest(vendorDest));
});
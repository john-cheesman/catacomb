var gulp,
    sourcemaps,
    source,
    buffer,
    browserify,
    babel,
    uglify,
    config,
    gutil;

gulp       = require('gulp');
sourcemaps = require('gulp-sourcemaps');
source     = require('vinyl-source-stream');
buffer     = require('vinyl-buffer');
browserify = require('browserify');
babel      = require('babelify');
uglify     = require('gulp-uglify');
config     = require('../config').scripts;
gutil      = require('gulp-util');

gulp.task('scripts', ['clean-scripts'], function() {
    var bundler = browserify(config.src, { debug: true }).transform(babel);

    return bundler.bundle()
        .on('error', function(err) { console.error(err); this.emit('end'); })
        .pipe(source(config.outputName))
        .pipe(buffer())
        .pipe(gutil.env.type === 'release' ? uglify() : gutil.noop())
        .pipe(gutil.env.type !== 'release' ? sourcemaps.init({ loadMaps: true }) : gutil.noop())
        .pipe(gutil.env.type !== 'release' ? sourcemaps.write('./') : gutil.noop())
        .pipe(gulp.dest(config.dest));
});

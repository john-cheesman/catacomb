var gulp,
    del,
    config;

gulp   = require('gulp');
del    = require('del');
config = require('../config');

gulp.task('clean-scripts', function() {
    return del(config.scripts.dest);
});

gulp.task('clean-images', function() {
    return del(config.images.dest);
});

gulp.task('clean-maps', function() {
    return del(config.maps.dest);
});

var gulp,
    config;

gulp   = require('gulp');
config = require('../config');

gulp.task('watch', function() {
    gulp.watch(config.scripts.watch, ['scripts']);
    gulp.watch(config.images.watch, ['images']);
    gulp.watch(config.maps.watch, ['maps']);
});

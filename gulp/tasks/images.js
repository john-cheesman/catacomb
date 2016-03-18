var gulp,
    config;

gulp   = require('gulp');
config = require('../config').images;

gulp.task('images', ['clean-images'], function() {
    return gulp.src(config.src)
        .pipe(gulp.dest(config.dest));
});

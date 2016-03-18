var gulp,
    config;

gulp   = require('gulp');
config = require('../config').maps;

gulp.task('maps', ['clean-maps'], function() {
    return gulp.src(config.src)
        .pipe(gulp.dest(config.dest));
});

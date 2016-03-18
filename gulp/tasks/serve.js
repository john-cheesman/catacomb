var gulp,
    http,
    ecstatic,
    config;

gulp     = require('gulp');
http     = require('http');
ecstatic = require('ecstatic');
config   = require('../config').serve;

gulp.task('serve', function() {
    return http.createServer(ecstatic({
            root: config.base
        }))
        .listen(config.port);
});

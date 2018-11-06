const gulp = require('gulp');
const shell = require('shelljs');
const zip = require('gulp-zip');

gulp.task('copy', function () {
    shell.rm('-rf', 'app/www');
    shell.cp('index.js', 'app');

    return gulp.src(['www/**', '!**/*.gz', '!**/*.map'])
        .pipe(gulp.dest('app/www'));

});

gulp.task('prepare', ['copy'], function (done) {
    done();
});

gulp.task('zip', function () {
    shell.mv('dist/win-unpacked/memory-match-*.exe', 'dist/win-unpacked/memory-match.exe');
    return gulp.src('dist/win-unpacked/**')
        .pipe(zip('memory-match.zip'))
        .pipe(gulp.dest('dist'));
});

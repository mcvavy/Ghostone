const gulp = require('gulp');
const stylus = require('gulp-stylus');


// gulp plugins and utils
const autoprefixer = require("gulp-autoprefixer");
const livereload = require('gulp-livereload');
const sourcemaps = require('gulp-sourcemaps');
const zip = require('gulp-zip');

// postcss plugins
const cssnano = require('cssnano');

const nodemonServerInit = function () {
    livereload.listen();
};

gulp.task('build', ['css'], function (/* cb */) {
    return nodemonServerInit();
});

gulp.task('css', function () {
    return gulp.src('assets/src/style.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus({
            linenos: true,
            compress: true
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('assets/built/'))
        .pipe(livereload());
});

gulp.task('watch', function () {
    gulp.watch('assets/src/**', ['css']);
});

gulp.task('zip', ['css'], function () {
    var targetDir = 'dist/';
    var themeName = require('./package.json').name;
    var filename = themeName + '.zip';

    return gulp.src([
        '**',
        '!node_modules', '!node_modules/**',
        '!dist', '!dist/**'
    ])
        .pipe(zip(filename))
        .pipe(gulp.dest(targetDir));
});

gulp.task('default', ['build'], function () {
    gulp.start('watch');
});

let gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    lineec = require('gulp-line-ending-corrector'),

    mobileRoothPath = './image_processing/',
    mobileScssPath = mobileRoothPath + 'coreFiles/scss/',
    mobileCssPath = mobileRoothPath + 'www/css/',
    mobileCssFiles = [
      mobileCssPath + 'index.css'
    ];

function mobileCss() {
    return gulp
        .src([mobileScssPath + 'index.scss'])
        .pipe(sourcemaps.init({ "loadMaps": true }))
        .pipe(sass({
            "outputStyle": "expanded" // compressed || compact
        }).on('error', sass.logError))
        .pipe(autoprefixer('last 2 versions'))
        .pipe(sourcemaps.write())
        .pipe(lineec())
        .pipe(gulp.dest(mobileCssPath));
}

function mobileConcatCss() {
    return gulp
        .src(mobileCssFiles)
        .pipe(sourcemaps.init({ "loadMaps": true, "largeFiles": true }))
        .pipe(concat('index.min.css'))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./maps/'))
        .pipe(lineec())
        .pipe(gulp.dest(mobileCssPath));
}


function watch() {
    gulp.watch(mobileScssPath, gulp.series([mobileCss, mobileConcatCss]));
}

async function firstRun() {
    mobileCss()
    mobileConcatCss()
}

let build = gulp.series(firstRun, watch);
// gulp.task('build', ['firstRun', 'buildTask']);
gulp.task('default', build); 
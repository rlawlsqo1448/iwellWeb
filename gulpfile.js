const gulp = require('gulp');
const path = require('path');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const open = require('gulp-open');

const Paths = {
  HERE: './',
  DIST: 'dist/',
  CSS: './assets/css/',
  SCSS_TOOLKIT_SOURCES: './assets/scss/argon-dashboard.scss',
  SCSS: './assets/scss/**/**'
};

// SCSS 컴파일
function compileScss() {
  return gulp.src(Paths.SCSS_TOOLKIT_SOURCES)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write(Paths.HERE))
    .pipe(gulp.dest(Paths.CSS));
}

// SCSS 변경 감지
function watchScss() {
  gulp.watch(Paths.SCSS, compileScss);
}

// 브라우저 열기
function openApp() {
  return gulp.src('index.html')
    .pipe(open());
}

// 작업 등록
exports['compile-scss'] = compileScss;
exports.watch = watchScss;
exports.open = openApp;
exports['open-app'] = gulp.series(openApp, watchScss);
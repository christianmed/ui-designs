'use strict';

const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const pref = require('gulp-autoprefixer');
const brow = require('browser-sync').create();

let folder = './01/';

let src = {
  pug: `${folder}dev/*.pug`,
  sass: `${folder}dev/*.scss`,
  html: `${folder}dist/`,
  css: `${folder}dist/css/`,
};

gulp.task('pug', () => {
  return gulp.src(src.pug)
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest(src.html));
});

gulp.task('styles', () => {
  return gulp.src(src.sass)
    .pipe(sass({ outputStyle: 'nested' }).on('error', sass.logError))
    .pipe(pref({ browsers: 'last 10 versions', cascade: true }))
    .pipe(gulp.dest(src.css))
    .pipe(brow.stream());
});

gulp.task('watcher', ['pug', 'styles'], () => {
  gulp.watch(src.pug, ['pug']);
  gulp.watch(src.sass, ['styles']);
  gulp.watch(src.html + '*.html').on('change', brow.reload);
});

gulp.task('default', ['watcher'], () => {
  brow.init({ server: src.html });
});
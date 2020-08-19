'use strict';
const gulp = require('gulp');
const sass = require('gulp-sass');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const purgecss = require('gulp-purgecss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');

sass.compiler = require('node-sass');

const sassPaths = ['./node_modules'];

function html() {
  return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('./public/'));
}

function css() {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        includePaths: sassPaths
    }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(csso())
    .pipe(rename(function(path) {
      path.extname = ".min.css";
    }))
    .pipe(
      purgecss({
        content: ['public/**/*.html']
      })
    )
    .pipe(gulp.dest('./public/css/'))      
}

gulp.watch('./src/scss/**/*.scss', css);
gulp.watch('./src/**/*.html', html);

exports.default = gulp.parallel(html, css)
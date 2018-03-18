'use strict';

const gulp = require('gulp');
const vulcanize = require('gulp-vulcanize');
const crisper = require('gulp-crisper');

gulp.task('vulcanize', function() {
  return gulp.src('build/default/index.html')
    .pipe(vulcanize())
    .pipe(crisper({
      scriptInHead: false
    }))
    .pipe(gulp.dest('build/default'));
});
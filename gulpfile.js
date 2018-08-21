const gulp = require('gulp');
const styleguide = require('sc5-styleguide');
const sass = require('gulp-sass');
const outputPath = 'output';
 
gulp.task('styleguide:generate', function() {
  return gulp.src('styleguide/**/*.scss')
    .pipe(styleguide.generate({
        title: 'My Styleguide',
        extraHead: [
          `
          <style>
            .code-import {
              background-color: #000;
              padding: 10px;
              border-radius: 4px;
              color: #fff !important;
            }
          </style>
          `
        ],
        server: true,
        port: 4000,
        rootPath: outputPath,
        overviewPath: 'styleguide/overview.md'
      }))
    .pipe(gulp.dest(outputPath));
});
 
gulp.task('styleguide:applystyles', function() {
  return gulp.src('styleguide/**/*.scss')
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(styleguide.applyStyles())
    .pipe(gulp.dest(outputPath));
});
 
gulp.task('watch', ['styleguide'], function() {
  gulp.watch(['styleguide/**/*.scss'], ['styleguide']);
});
 
gulp.task('styleguide', ['styleguide:generate', 'styleguide:applystyles']);
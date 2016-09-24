/* * gulp file cheetsheet
 * 
 * I've been slowly teaching myself to program and the web languages of late.
 * 
 * I am learning the fundamentals of js by learning to use and hack the 
 *  tooling around it.
 *
 * This file is not to be used in a production environment.
 *
 *				SASSDOC GULP PLUGIN
 * 
 */ 

var gulp = require('gulp');
var sassdoc = require('sassdoc');
var sass = require('gulp-sass');

gulp.task('styles', function () {
	  var options = {
    dest: 'docs',
    verbose: true,
    display: {
      access: ['public', 'private'],
      alias: true,
      watermark: true,
    },
    groups: {
      'undefined': 'Ungrouped',
      foo: 'Foo group',
      bar: 'Bar group',
    },
    basePath: 'https://github.com/SassDoc/sassdoc',
  };
  
  return gulp.src('path/to/source/**/*.scss')
    .pipe(sassdoc())
    .pipe(sass())
    .pipe(gulp.dest('path/to/styles'));
});
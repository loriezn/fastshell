/* * gulp file cheetsheet
 * 
 * I've been slowly teaching myself to program and the web languages of late.
 * 
 * I am learning the fundamentals of js by learning to use and hack the 
 *  tooling around it.
 *
 * This file is not to be used in a production environment.
 *
 * 				GULP RESUME PLUGIN
 */ 

var resume = require('gulp-resume');
var rename = require('gulp-rename');
 
gulp.task('resume', function() {
  return gulp.src('resume.json')
    .pipe(resume({
      format: 'html',
      theme: 'elegant'
    }))
    .pipe(rename('resume.html'))
    .pipe(gulp.dest('.'));
});
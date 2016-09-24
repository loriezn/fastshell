/* * gulp file cheetsheet
 * 
 * I've been slowly teaching myself to program and the web languages of late.
 * 
 * I am learning the fundamentals of js by learning to use and hack the 
 *  tooling around it.
 *
 * This file is not to be used in a production environment.
 */ 

var posthtml = require('gulp-posthtml');
var gulp = require('gulp');

gulp.task('posthtml', function () {
    var plugins = [
        require('posthtml-doctype')('<!DOCTYPE html>'),
        require('posthtml-custom-elements')()
    ];

    var options = { closingSingleTag: 'slash' };


    return gulp.src('./html/*.html')
        .pipe(posthtml(plugins, options))
        .pipe(gulp.dest('./dest'));
});
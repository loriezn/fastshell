/* * gulp file cheetsheet
 * 
 * I've been slowly teaching myself to program and the web languages of late.
 * 
 * I am learning the fundamentals of js by learning to use and hack the 
 *  tooling around it.
 *
 * This file is not to be used in a production environment.
 */ 

// VARS
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    header  = require('gulp-header'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    resume = require('gulp-resume'),
    clean = require('gulp-clean'),
    rename = require('gulp-rename'),
    ghPages = require('gulp-gh-pages'),
    imagemin = require('gulp-imagemin'),
    responsive = require('gulp-responsive'),
    imageop = require('gulp-image-optimization'),
    package = require('./package.json');

// BANNER
var banner = [
  '/*!\n' +
  ' * <%= package.name %>\n' +
  ' * <%= package.title %>\n' +
  ' * <%= package.url %>\n' +
  ' * @author <%= package.author %>\n' +
  ' * @version <%= package.version %>\n' +
  ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
  ' */',
  '\n'
].join('');


// CSS
gulp.task('css', function () {
    return gulp.src('src/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest('tmp/css'))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(header(banner, { package : package }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('tmp/css'))
    .pipe(browserSync.reload({stream:true}));
});

// JS
gulp.task('js',function(){
  gulp.src('src/js/scripts.js')
    .pipe(sourcemaps.init())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('tmp/js'))
    .pipe(uglify())
    .pipe(header(banner, { package : package }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('tmp/js'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

 
// JSON RESUME
gulp.task('resume', function() {
  return gulp.src('src/resume.json')
    .pipe(resume({
      format: 'html',
      theme: 'elegant'
    }))
    .pipe(rename('src/html/resume.html'))
    .pipe(gulp.dest('.'));
});

gulp.task('minimages', () =>
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('tmp/img'))
);

// IMAGES
gulp.task('images', function(cb) {
    gulp.src('src/img/*.+(png|jpg|gif|jpeg)')
    .pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    }))
    .pipe(gulp.dest('tmp/img'))
    .on('end', cb).on('error', cb)
    ;
});
// RESPONSIVE IMAGES
gulp.task('imgresp', function () {
  return gulp.src('src/img/**/*.{png,jpg}')
    .pipe(responsive({
      'background-*.jpg': {
        width: 700,
        quality: 50
      },
      'cover.png': {
        width: '50%',
        // convert to jpeg format
        format: 'jpeg',
        rename: 'cover.jpg'
      },
      // produce multiple images from one source
      'logo.png': [
        {
          width: 200
        },{
          width: 200 * 2,
          rename: 'logo@2x.png'
        }
      ]
    }))
    .pipe(responsive({
      'background-*.jpg': {
        width: 700,
        quality: 50
      },
      'cover.png': {
        width: '50%',
        // convert to jpeg format
        format: 'jpeg',
        rename: 'cover.jpg'
      },
      // produce multiple images from one source
      'logo.png': [
        {
          width: 200
        },{
          width: 200 * 2,
          rename: 'logo@2x.png'
        }
      ]
    }))
    .pipe(gulp.dest('tmp/img'));
});

// HTML
/*gulp.task('html', function()) {
    return gulp.src(app)
}*/

// GITHUB PAGES
gulp.task('ghDeploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

// COPY
gulp.task('copy', function(){
gulp.task('scripts', ['clean-scripts'], function () {
  gulp.src('src/js')
    .pipe(gulp.dest('tmp/js'));
});

gulp.task('clean', ['scripts']);

return gulp.src("tmp/**/*")
  .pipe(gulp.dest('app/'));
});

// CLEAN
gulp.task('clean-scripts', function () {
  return gulp.src('tmp/js/*.js', {read: false})
    .pipe(clean());
});

// BROWSER SYNC
gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "src"
        }
    });
});
gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['css', 'js', 'browser-sync'], function () {
    gulp.watch("src/scss/**/*.scss", ['css']);
    gulp.watch("src/js/**/*.js", ['js']);
    gulp.watch("src/**/*.html", ['bs-reload']);
});
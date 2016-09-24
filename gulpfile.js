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

// CLEAN
gulp.task('clean-scripts', function () {
  return gulp.src('app/tmp/*.js', {read: false})
    .pipe(clean());
});

gulp.task('scripts', ['clean-scripts'], function () {
  gulp.src('app/scripts/*.js')
    .pipe(gulp.dest('app/tmp'));
});

gulp.task('clean', ['scripts']);

// CSS
gulp.task('css', function () {
    return gulp.src('src/scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest('app/assets/css'))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(header(banner, { package : package }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/assets/css'))
    .pipe(browserSync.reload({stream:true}));
});

// JS
gulp.task('js',function(){
  gulp.src('src/js/scripts.js')
    .pipe(sourcemaps.init())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(header(banner, { package : package }))
    .pipe(gulp.dest('app/assets/js'))
    .pipe(uglify())
    .pipe(header(banner, { package : package }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/assets/js'))
    .pipe(browserSync.reload({stream:true, once: true}));
});

 
// JSON RESUME
gulp.task('resume', function() {
  return gulp.src('app/assets/resume.json')
    .pipe(resume({
      format: 'html',
      theme: 'elegant'
    }))
    .pipe(rename('app/assets/html/resume.html'))
    .pipe(gulp.dest('.'));
});


// GITHUB PAGES
gulp.task('ghDeploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('minimages', () =>
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);

// IMAGES
gulp.task('images', function(cb) {
    gulp.src('app/asstes/img/*.+(png|jpg|gif|jpeg)')
    .pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    }))
    .pipe(gulp.dest('app/assets/img'))
    .on('end', cb).on('error', cb)
    ;
});
// RESPONSIVE IMAGES
gulp.task('imgresp', function () {
  return gulp.src('src/*.{png,jpg}')
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
    .pipe(gulp.dest('app/assets/img'));
});

// HTML
/*gulp.task('html', function()) {
    return gulp.src(app)
}*/

// BROWSER SYNC
gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: "app"
        }
    });
});
gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['css', 'js', 'browser-sync'], function () {
    gulp.watch("src/scss/*/*.scss", ['css']);
    gulp.watch("src/js/*.js", ['js']);
    gulp.watch("app/*.html", ['bs-reload']);
    gulp.watch("app/assets/html/*.html", ['bs-reload']);
});

var gulp = require('gulp');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var handlebars = require('gulp-handlebars');
var defineModule = require('gulp-define-module');
var declare = require('gulp-declare');
var stylus = require('gulp-stylus');

var paths = {
  scripts: ['src/models/*.js', 'src/collections/*.js', 'src/views/*.js', 'src/*.js'],
  images: 'src/img/**/*',
  templates: 'src/templates/*.hbs',
  styles: 'src/styles/*.styl'
};

gulp.task('webserver', function() {
  connect.server({
    livereload:true,
    root: 'dist',
    port: '1337'
  });
});

gulp.task('templates', function(){
  gulp.src(paths.templates)
    .pipe(handlebars())
    .pipe(defineModule('plain'))
    .pipe(declare({
      namespace: 'HAZE.templates'
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('dist/js/'));
});

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use all packages available on npm
// gulp.task('clean', function(cb) {
//   // You can use multiple globbing patterns as you would with `gulp.src`
//   del(['build'], cb);
// });

gulp.task('scripts', function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload());
});

// Get and render all .styl files recursively
gulp.task('stylus', function () {
  gulp.src(paths.styles)
    .pipe(stylus())
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('dist/css'));
});


// Copy all static images
// gulp.task('images', ['clean'], function() {
//   return gulp.src(paths.images)
//     // Pass in options to the task
//     .pipe(imagemin({optimizationLevel: 5}))
//     .pipe(gulp.dest('dist/img'));
// });

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.styles, ['stylus']);
  gulp.watch(paths.templates, ['templates']);
  // gulp.watch(paths.images, ['images']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts', 'stylus', 'templates', 'webserver', 'watch']);

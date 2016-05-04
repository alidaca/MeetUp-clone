var gulp        = require('gulp');
var clean       = require('del');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');
var jade        = require('gulp-jade');
var runSequence = require('run-sequence');
var jshint      = require('gulp-jshint');



/** 
* Configure browser-sync to load files from build directory
**/

gulp.task('browser-sync', function(){
  browserSync.init({
  server: {
      baseDir: "./build"
  }
  });
});

/**
* Cleans the build directory
**/

gulp.task('clean',function(){
  return clean('./build/**/*');
});

/**
 * Compile files from jade into build
 */
gulp.task('jade', function(){
  return gulp.src('source/jadeFiles/**/*.jade')
  .pipe(jade())
  .pipe(gulp.dest('./build'))
  //.pipe(browserSync.reload({stream:true}));;
});


/**
 * Compile files from sass into build
 */
 gulp.task('sass', function () {
     return gulp.src('source/assets/css/main.sass')
         .pipe(sass({
             includePaths: ['css'],
             onError: browserSync.notify
         }))
         .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
         .pipe(gulp.dest('./build/assets/css'))
         //.pipe(browserSync.reload({stream:true}));
 });

 /**
 * adds javascript to build 
 **/

 gulp.task('javascript', function(){
   return gulp.src('source/assets/js/**/*.js')
   .pipe(gulp.dest('./build/assets/js'))
   //.pipe(browserSync.reload({stream:true}));;
 });

  /**
 * adds imgages to build
 **/

 gulp.task('img', function(){
   return gulp.src('source/assets/img/**/*')
   .pipe(gulp.dest('./build/assets/img'));
   //.pipe(browserSync.reload({stream:true}));;
 });

   /**
 * Js linting
 **/

 gulp.task('jsLint', function(){
  gulp.src('source/assets/js')
  .pipe(jshint())
  .pipe(jshint.reporter());
 });


/**
 * Watch sass files for changes & recompile
 * Watch jade files for changes and recompile
 * Watch html/md files & reload BrowserSync

 */
 gulp.task('watch', function () {
     gulp.watch('source/assets/css/**', ['sass']);
     gulp.watch('source/jadeFiles/**/*.jade', ['jade']);
     gulp.watch('source/assets/js/**/*.js', ['jsLint', 'javascript']);
     gulp.watch('source/assets/img/**', ['img']);
     // gulp.watch('build/**/*.*').on('change', browserSync.reload);
     gulp.watch('build/*.html').on('change', browserSync.reload);
     gulp.watch('build/assets/js/*.js').on('change', browserSync.reload);
     gulp.watch('build/assets/css/*.css').on('change', browserSync.reload);
     gulp.watch('build/assets/img/**').on('change', browserSync.reload);
 });

 /**
* Builds a current copy of the project in the build directory
**/

gulp.task('build', function () {
  runSequence('clean',['sass','jade','javascript','img'],'browser-sync','watch');
  });

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['build']);

var gulp         = require('gulp'),
	concat       = require('gulp-concat'),
	sourcemaps   = require('gulp-sourcemaps'),
	ngAnnotate   = require('gulp-ng-annotate'),
	sass         = require('gulp-sass'),
	autoprefixer = require('gulp-autoprefixer'),
	minifycss    = require('gulp-minify-css'),
	rename       = require('gulp-rename'),
	browserSync  = require('browser-sync').create(),
	concatCss    = require('gulp-concat-css'),
	uglify       = require('gulp-uglifyjs'),
	imagemin     = require('gulp-imagemin'),
	order        = require('gulp-order');


gulp.task('browser-sync', [
							// 'controllers',
							// 'js',
							'styles',							
							'compress',							
							'vendorCss',													
							], function() {
		browserSync.init({
				server: {
						baseDir: "./app"
				},
				notify: false,
				files: ['./app/components/**/*.html','./app/*.html','./app/components/**/*.js','./app/app.js','./app/assets/css/*.css']
		});
});

gulp.task('js', function () {
  gulp.src(['app/assets/libs/**/*.js'])
	  .pipe(order([
	    "app/libs/angular/*.js",
	    "app/libs/external-angular/*.js",
	    "app/libs/external-library/*.js"    
	  ]))
    .pipe(sourcemaps.init())
      .pipe(concat('vendor.min.js'))
      .pipe(uglify())
      .pipe(ngAnnotate())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/'))
});


gulp.task('styles', function () {
	gulp.src('app/assets/sass/*.sass')
	.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({
		browsers: ['last 15 versions'],
		cascade: false
	}))
	.pipe(minifycss(''))
	.pipe(gulp.dest('app/assets/css'));
});

gulp.task('compress', function() {
  return gulp.src('app/assets/img/*')
  .pipe(imagemin(''))
  .pipe(gulp.dest('app/assets/img/'));
});

gulp.task('vendorCss', function () {
  return gulp.src('app/libs/**/*.css')
    .pipe(concatCss("vendor.css"))   
    .pipe(minifycss('')) 
    .pipe(rename("vendor.min.css"))
    .pipe(gulp.dest('app/assets/css'));
});

gulp.task('watch', function () {
	gulp.watch('app/assets/sass/*.sass', ['styles']);
	gulp.watch('app/libs/**/*.js', ['js']);
	gulp.watch('app/**/*.html');		
});
gulp.task('default', ['watch','browser-sync']);

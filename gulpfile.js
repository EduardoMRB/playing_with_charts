var gulp = require('gulp'), 
    path = require('path'),
    concat = require('gulp-concat'),
    bowerFiles = require('gulp-bower-files'),
    rename = require('gulp-rename'),

    BOWER_DEPS = path.join(__dirname, 'bower_deps'),
    DIST_FOLDER = path.join(__dirname, 'public/hipopotamo-voador'),
    vendorJsFiles = BOWER_DEPS + '/**/*.js',
    jsFiles = 'assets/js/**/*.js',
    vendorCssFiles = BOWER_DEPS + '/**/*.css';
      

gulp.task('bower', function () {
  bowerFiles()
    .pipe(gulp.dest(BOWER_DEPS));
});

gulp.task('vendorCss', function () {
  return gulp.src(vendorCssFiles)
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest(DIST_FOLDER));
});

gulp.task('vendorJs', function () {
  return gulp.src(vendorJsFiles)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(DIST_FOLDER));
});

gulp.task('js', function () {
  return gulp.src(jsFiles)
    .pipe(concat('dist.js'))
    .pipe(gulp.dest(DIST_FOLDER));
});

gulp.task('watch', function () {
  gulp.watch(vendorJsFiles, ['vendorJs']);
  gulp.watch(jsFiles, ['js']);
});

gulp.task('default', ['bower', 'vendorCss', 'vendorJs', 'js']);

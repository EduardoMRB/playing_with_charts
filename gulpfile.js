var gulp = require('gulp'), 
    path = require('path'),
    concat = require('gulp-concat'),
    bowerFiles = require('gulp-bower-files'),
    rename = require('gulp-rename'),

    BOWER_DEPS = path.join(__dirname, 'bower_deps'),
    DIST_FOLDER = path.join(__dirname, 'public/hipopotamo-voador'),
    vendorJsFiles = BOWER_DEPS + '/**/*.js',
    jsFiles = 'assets/js/**/*.js';
      

gulp.task('bower', function () {
  bowerFiles()
    .pipe(gulp.dest(BOWER_DEPS));
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

gulp.task('default', ['bower', 'vendorJs', 'js']);

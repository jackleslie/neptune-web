var gulp = require("gulp");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var plumber = require("gulp-plumber");
var cached = require("gulp-cached");
var dependents = require("gulp-dependents");
var notify = require("gulp-notify");

// Less Compiler
const lessCompiler = () => {
  return gulp
    .src(["src/less/*.less", "src/less/bundles/*.less"])
    .pipe(cached("less"))
    .pipe(dependents())
    .pipe(notify("Modified file: <%= file.relative %>!"))
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss())
    .pipe(gulp.dest("dist/css"));
};

// Watch files
const lessWatcher = () => {
  gulp.watch(["src/**/*.less"], gulp.series(lessCompiler));
};

exports.lessWatcher = lessWatcher;
exports.lessCompiler = lessCompiler;
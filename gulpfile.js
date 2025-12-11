/**
 * Import Gulp Needed Packages to work with AngularJS
 * Features:
 * - Live Server
 * - Support SCSS
 * - Gulp
 * - JS Bundler with CommonJS
 * - CSS & JS Minification
 * - Cache Busting
 * - Live Reload
 * - ESLint
 * - Autoprefixer
 */

var gulp = require("gulp");
var webserver = require("gulp-webserver");
var del = require("del");
var rimraf = require("rimraf");
var sass = require("sass-embedded");
var eslint = require("gulp-eslint-new");
var babel = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");
var browserify = require("browserify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var uglify = require("gulp-uglify");
var gutil = require("gulp-util");
var ngAnnotate = require("browserify-ngannotate");
var tsify = require("tsify");
var concat = require("gulp-concat");
var CacheBuster = require("gulp-cachebust");
const livereload = require("gulp-livereload");
const autoprefix = require("gulp-autoprefixer");
const through = require("through2");
const path = require("path");
const applySourceMap = require("vinyl-sourcemaps-apply");
var cachebust = new CacheBuster();

function compileSass(options) {
  var sassOptions = options || {};

  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError("sass-embedded", "Streaming is not supported"));
      return;
    }

    sass
      .compileAsync(file.path, {
        style: sassOptions.outputStyle || "compressed",
        sourceMap: true
      })
      .then(function(result) {
        file.contents = Buffer.from(result.css);
        file.path = file.path.replace(/\.scss$/, ".css");

        if (result.sourceMap) {
          result.sourceMap.file = path.basename(file.path);
          applySourceMap(file, result.sourceMap);
        }

        cb(null, file);
      })
      .catch(function(error) {
        cb(new gutil.PluginError("sass-embedded", error));
      });
  });
}

/**
 * ESLint task
 */

gulp.task("lint", function() {
  return gulp
    .src(["./src/**/*.{ts,js}", "./gulpfile.js"])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

/**
 * Deletes the dist folder
 */

gulp.task("clean", function(cb) {
  rimraf.sync("dist");
  cb();
});

/**
 * Sub Cleaning Tasks
 */

gulp.task("clean-build-js", function(cb) {
  del(["./dist/bundle.*"]).then(() => cb());
});

gulp.task("clean-build-css", function(cb) {
  del(["./dist/style.*"]).then(() => cb());
});

gulp.task("clean-build-template-cache", function(cb) {
  del(["./dist/partials.*"]).then(() => cb());
});

/**
 * Builds SCSS files
 */

gulp.task("build-css", function() {
  return gulp
    .src("./src/assets/scss/style.scss")
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(
      compileSass({
        outputStyle: "compressed"
      })
    )
    .pipe(autoprefix("last 2 versions"))
    .pipe(cachebust.resources())
    .pipe(sourcemaps.write("./maps"))
    .pipe(gulp.dest("./dist"))
    .pipe(livereload());
});

/**
 * Build a minified Javascript bundle
 */

gulp.task("build-js", function() {
  var b = browserify({
    entries: "./src/modules/app.module.ts",
    debug: true,
    extensions: [".js", ".ts"],
    paths: ["./src/modules"],
    transform: [ngAnnotate]
  }).plugin(tsify);

  return b
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(cachebust.resources())
    .pipe(
      sourcemaps.init({
        loadMaps: true
      })
    )
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(uglify())
    .on("error", gutil.log)
    .pipe(sourcemaps.write("./maps"))
    .pipe(gulp.dest("./dist"))
    .pipe(livereload());
});

/**
 * Fills in the Angular template cache
 */

gulp.task("build-template-cache", function() {
  var ngHtml2Js = require("gulp-ng-html2js");

  return gulp
    .src("./src/modules/**/*.view.html")
    .pipe(
      ngHtml2Js({
        moduleName: "UsersApp.Partials",
        prefix: "/modules/"
      })
    )
    .pipe(concat("partials.js"))
    .pipe(cachebust.resources())
    .pipe(
      sourcemaps.init({
        loadMaps: true
      })
    )
    .pipe(uglify())
    .pipe(sourcemaps.write("./maps"))
    .pipe(gulp.dest("./dist/"))
    .pipe(livereload());
});

/**
 * CacheBust References
 */

gulp.task("code-cache-bust", function(cb) {
  gulp
    .src("./src/index.html")
    .pipe(cachebust.references())
    .pipe(gulp.dest("dist"));
  cb();
});


/**
 * Assets
 */

gulp.task("assets", function (cb) {
  gulp
      .src(["./src/assets/**/*", "!src/assets/scss/**/*"])
      .pipe(gulp.dest("dist/assets"))
  cb();
});


/**
 * Build Task
 */

gulp.task(
  "build",
  gulp.series(
    "clean",
    gulp.parallel(
      "build-css",
      "assets",
      gulp.series("lint", gulp.parallel("build-template-cache", "build-js"))
    ),
    "code-cache-bust"
  )
);

/**
 * Watch Task
 */

gulp.task(
  "watch",
  gulp.series("build", function(cb) {

    gulp.watch(
      "./src/modules/**/*.{js,ts}",
      gulp.series(["clean-build-js", "lint", "build-js", "code-cache-bust"])
    );

    gulp.watch(
      "./src/modules/**/*.view.html",
      gulp.series([
        "clean-build-template-cache",
        "lint",
        "build-template-cache",
        "code-cache-bust"
      ])
    );

    gulp.watch(
      "./src/assets/scss/**/*.scss",
      gulp.series(["clean-build-css", "build-css", "code-cache-bust"])
    );

    gulp.watch(
      ["./assets/**/*", "!assets/scss/**/*"],
      gulp.series(["assets"])
    );

    cb();
  })
);

/**
 * Launches a Webserver
 */

gulp.task("webserver", function() {
  gulp.src("./dist/").pipe(
    webserver({
      livereload: true,
      directoryListing: true,
      open: "http://localhost:8000/index.html"
    })
  );
});

/**
 * Start the Dev Server
 */

gulp.task("dev", gulp.series(["watch", "webserver"]));

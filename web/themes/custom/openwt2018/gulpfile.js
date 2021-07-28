'use strict';

// Build Linux-like paths
function createPath(...items) { return path.join(...items).replace(/\\/g, '/'); }

/* Requirements */
var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass'),
    notify = require("gulp-notify"),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
	path = require('path'),
	clean = require('gulp-clean'),
	cleanCSS = require('gulp-clean-css'),
	terser = require('gulp-terser')
	
/* Folder names */
var folders = {
	base : "assets",
	destination: "dist",
	css: "styles",
	js: "scripts",
	img: "images",
	fonts: "fonts"
}

/* Files to handle */
var files = {
	sass : [
		createPath(folders.base, folders.css, 'scss', 'style.scss'),
	], css : [
		createPath(folders.base, folders.css, 'animate.css'),
		createPath(folders.base, folders.css, 'bootstrap-grid.min.css'),
		createPath(folders.base, folders.css, 'normalize.css'),
		createPath(folders.base, folders.css, 'remodal.css')
	], js : [
		createPath(folders.base, folders.js, '*.js')
	], img : [
		createPath(folders.base, folders.img, '**', '*')
	], fonts : [
		createPath(folders.base, folders.fonts, '**', '*')
	]
}

/* Destination folders */
var dest = {
	css : createPath(folders.destination, folders.css),
	js : createPath(folders.destination, folders.js),
	img : createPath(folders.destination, folders.img),
	fonts : createPath(folders.destination, folders.fonts)
}

/* Tasks */
gulp.task('clean', function() {
	return gulp.src(folders.destination)
		.pipe(clean());
});

gulp.task('sass', function() {
    return gulp.src(files.sass)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
		.pipe(sourcemaps.write('.'))
		.pipe(cleanCSS())
        .pipe(gulp.dest(dest.css))
		.pipe(notify({message: "Sass compiled & minified !", onLast: true}));
});

gulp.task('css', function() {
	return gulp.src(files.css)
		.pipe(cleanCSS())
		.pipe(gulp.dest(dest.css))
		.pipe(notify({message: "Vendor CSS minified !", onLast: true}));
});

gulp.task('js', function() {
	return gulp.src(files.js)
		.pipe(terser()).on('error', function(err) {
			console.log(err);
		})
		.pipe(gulp.dest(dest.js))
		.pipe(notify({message: "JavaScript uglified !", onLast: true}));
});

gulp.task('img', function() {
	return gulp.src(files.img)
	.pipe(gulp.dest(dest.img))
	.pipe(notify({message: "Images transferred !", onLast: true}));
});

gulp.task('fonts', function() {
	return gulp.src(files.fonts)
	.pipe(gulp.dest(dest.fonts))
	.pipe(notify({message: "Fonts transferred !", onLast: true}));
});

gulp.task('build', function (callback) {
    runSequence('clean', 'sass', 'css', 'js', 'img', 'fonts', callback);
});
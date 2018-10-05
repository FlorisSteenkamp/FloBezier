'use strict';

var gulp       = require('gulp');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var uglify     = require('gulp-uglify-es').default;
var sourcemaps = require('gulp-sourcemaps');
var env        = require('babel-preset-env');
var rename     = require('gulp-rename');
var derequire  = require('gulp-derequire');
var ts         = require("gulp-typescript");
var tsify      = require("tsify");

var tsProject  = ts.createProject("./tsconfig.json");

gulp.task('default', nodeTask);
gulp.task('node',    nodeTask);
gulp.task('browser', browserTask);


/**
 * Build for browser.
 */
function nodeTask() {

	function showOnError(err) {	
		if (!err) { return; }
		
		console.error(err.toString());
		console.error(err.stack); 
	}

	return tsProject.src()
		.pipe(tsProject())
		.pipe(sourcemaps.init())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest("node"));
}


/**
 * Build for browser.
 */
function browserTask() {
	
	function showOnError(err) {	
		if (!err) { return; }
		
		console.error(err.toString());
		console.error(err.stack); 
	}
	
    browserify({
    		entries: 'index.ts',
    		standalone: 'FloBezier3',
   	})
	.plugin(tsify)
	.bundle(showOnError)
	.pipe(source('index.js'))
	.pipe(derequire())
	.pipe(gulp.dest('../browser/'))
	.pipe(rename({ extname: '.min.js' }))
	.pipe(buffer())
	.pipe(sourcemaps.init())
	.pipe(uglify())
	.on('error', showOnError)
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest('../browser/'));
}


const gulp = require('gulp')
const imagemin = require('gulp-imagemin')
const del = require('del')
const usemin = require('gulp-usemin')
const rev = require('gulp-rev')
const cssnano = require('gulp-cssnano')
const uglify = require('gulp-uglify')
const browserSync = require('browser-sync')

gulp.task('prevDist', function() {
	browserSync.init({
		server: {
			baseDir: "docs"
		}
	})
})

gulp.task('deleteDistFolder', function() {
	return del('./docs')
})

gulp.task('copyGeneralFiles', function() {
	let pathsToCopy = [
		'./app/**/*',
		'!./app/index.html',
		'!./app/assets/images/**',
		'!./app/assets/styles/**',
		'!./app/assets/scripts/**',
		'!./app/temp',
		'!./app/temp/**'
	]
	return gulp.src(pathsToCopy)
		.pipe(gulp.dest('./docs'))
})

gulp.task('optimizeImages', function() {
	return gulp.src(['./app/assets/images/**/*', '!./app/assets/icons', '!./app/assets/images/icons/**/*'])
		.pipe(imagemin({
			progressive: true,
			interlaced: true,
			multipass: true
		}))
		.pipe(gulp.dest('./docs/assets/images'))
})

gulp.task('usemin', (function() {
	return gulp.src('./app/index.html')
		.pipe(usemin({
			css: [function() {return rev()}, function() {return cssnano()}],
			js: [function() {return rev()},function() {return uglify()}]
		}))
		.pipe(gulp.dest('./docs'))
}))

gulp.task('build', gulp.series('deleteDistFolder', 'copyGeneralFiles', 'icons', 'optimizeImages', 'styles', 'scripts', 'usemin'))
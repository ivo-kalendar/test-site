const gulp = require('gulp')
const watch = require('gulp-watch')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssvars = require('postcss-simple-vars')
const nested = require('postcss-nested')


gulp.task('default', async function() { await console.log('I created a first Gulp task.')})
gulp.task('html', async function() { await console.log('Imagine something useful being done to your HTML here.')})
gulp.task('styles', async function() {
	return gulp.src('./app/assets/styles/style.css')
		.pipe(postcss([cssvars, nested, autoprefixer]))
	 	.pipe(gulp.dest('./app/temp/styles'))
})


gulp.task('watch', async function() {
	await watch('./app/*.html', gulp.series('html'))
	await watch('./app/assets/styles/**/*.css', gulp.series('styles'))
})

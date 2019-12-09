const gulp = require('gulp')
const watch = require('gulp-watch')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssvars = require('postcss-simple-vars')
const nested = require('postcss-nested')
const cssImport = require('postcss-import')
const browserSync = require('browser-sync').create()


gulp.task('html', async function() { await browserSync.reload()})
gulp.task('styles', async function() {
	return gulp.src('./app/assets/styles/style.css')
		.pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
	 	.pipe(gulp.dest('./app/temp/styles'))
	 	.pipe(browserSync.stream())
})


gulp.task('watch', async function() {
	await browserSync.init({
		server: {
			baseDir: "app"
		}
	})
	await watch('./app/index.html', gulp.series('html'))
	await watch('./app/assets/styles/**/*.css', gulp.series('styles'))
})

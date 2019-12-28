
const gulp = require('gulp')
const watch = require('gulp-watch')
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssvars = require('postcss-simple-vars')
const nested = require('postcss-nested')
const cssImport = require('postcss-import')
const mixins = require('postcss-mixins')
const browserSync = require('browser-sync').create()
const hexrgba = require('postcss-hexrgba')


gulp.task('styles', async function() {
	return gulp.src('./app/assets/styles/style.css')
		.pipe(postcss([cssImport, mixins, cssvars, nested, hexrgba, autoprefixer]))
		.on('error', function(err) {
			console.log(err.toString())
			this.emit('end')
		})
	 	.pipe(gulp.dest('./app/temp/styles'))
	 	.pipe(browserSync.stream())
})


gulp.task('watch', async function() {
	await browserSync.init({
		server: {
			baseDir: "app"
		}
	})
	await watch('./app/index.html', async function() { await browserSync.reload()})
	await watch('./app/assets/styles/**/*.css', gulp.series('styles'))
	await watch('./app/assets/scripts/**/*.js', gulp.series('modernizr', 'scripts', function() {browserSync.reload()}))
})

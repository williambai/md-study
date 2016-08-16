var gulp = require('gulp');
var inject = require('gulp-inject');

/**
 * 根据backbone框架的要求，将模板文件(*.tpl)内嵌在布局文件(.html)中
 * @param  {[type]} ){	var target        [description]
 * @return {[type]}         [description]
 */
gulp.task('backbone', function(){
	var target = gulp.dest('./public');
	var layout = gulp.src('./public/tpl/backbone/backbone.html');
	var source = gulp.src('./public/tpl/backbone/**/*.tpl');
	return layout.pipe(inject(source,{
	    starttag: '<!-- inject:tpl -->',
	    transform: function (filePath, file) {
	      // return file contents as string 
	      return file.contents.toString('utf8');
	    }
	})).pipe(target);
});

const gulp             = require('gulp');
const concat           = require('gulp-concat');
const sourcemaps       = require('gulp-sourcemaps');
const uglify           = require('gulp-uglify');
const htmlToJs         = require('gulp-html-to-js');
const sass             = require('gulp-sass')(require('sass'));
const rollup           = require('@rollup/stream');
const rollupSourcemaps = require('rollup-plugin-sourcemaps');
const rollupBabel      = require('@rollup/plugin-babel');
const nodeResolve      = require('@rollup/plugin-node-resolve');
const source           = require('vinyl-source-stream');
const buffer           = require("vinyl-buffer");
const wrapFile         = require('gulp-wrap-file');
const sort             = require('gulp-sort');



var conf = {
    name: 'CoreUI.table',
    dist: "./dist",
    js: {
        fileMin: 'coreui-table.min.js',
        file: 'coreui-table.js',
        main: 'src/main.js',
        src: 'src/js/**/*.js'
    },
    css: {
        fileMin: 'coreui-table.min.css',
        file: 'coreui-table.css',
        main: 'src/main.scss',
        src: [
            'src/css/**/*.scss',
        ]
    },
    css_bootstrap: {
        fileMin: 'coreui-table.bootstrap.min.css',
        main: 'src/css/table.bootstrap.scss',
    },
    tpl: {
        file: 'tpl.js',
        dist: './src/js',
        src: [
            'src/html/**/*.html',
            'src/html/*.html'
        ]
    }
};


gulp.task('build_css', function(){
    return gulp.src(conf.css.main)
        .pipe(sourcemaps.init())
        .pipe(sass({includePaths: ['node_modules'], outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(concat(conf.css.fileMin))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(conf.dist));
});

gulp.task('build_css_fast', function(){
    return gulp.src(conf.css.main)
        .pipe(sass({includePaths: ['node_modules']}).on('error', sass.logError))
        .pipe(concat(conf.css.fileMin))
        .pipe(gulp.dest(conf.dist));
});


gulp.task('build_js_fast', function() {
    return rollup({
        input: conf.js.main,
        output: {
            sourcemap: true,
            format: 'umd',
            name: conf.name
        },
        onwarn: function (log, handler) {
            if (log.code === 'CIRCULAR_DEPENDENCY') {
                return; // Ignore circular dependency warnings
            }
            handler(log.message);
        },
        context: "window",
        plugins: [
            nodeResolve(),
            rollupSourcemaps(),
            rollupBabel({babelHelpers: 'bundled'}),
        ]
    })
        .pipe(source(conf.js.fileMin))
        .pipe(buffer())
        .pipe(gulp.dest(conf.dist));
});


gulp.task('build_js', function() {
    return rollup({
        input: conf.js.main,
        output: {
            sourcemap: true,
            format: 'umd',
            name: conf.name
        },
        onwarn: function (log, handler) {
            if (log.code === 'CIRCULAR_DEPENDENCY') {
                return; // Ignore circular dependency warnings
            }
            handler(log.message);
        },
        context: "window",
        plugins: [
            nodeResolve(),
            rollupSourcemaps(),
            rollupBabel({babelHelpers: 'bundled'}),
        ]
    })
        .pipe(source(conf.js.fileMin))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify({
            mangle: {
                reserved: ['TableInstance']
            }
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(conf.dist));
});


gulp.task('build_tpl', function() {
    return gulp.src(conf.tpl.src)
        .pipe(sort())
        .pipe(htmlToJs({global: 'tpl', concat: conf.tpl.file}))
        .pipe(wrapFile({
            wrapper: function(content, file) {
                content = content.replace(/\\n/g, ' ');
                content = content.replace(/[ ]{2,}/g, ' ');
                return 'let ' + content + ";\nexport default tpl;"
            }
        }))
        .pipe(gulp.dest(conf.tpl.dist));
});


gulp.task('build_bootstrap', function() {
    return gulp.src(conf.css_bootstrap.main)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed', includePaths: ['node_modules']}).on('error', sass.logError))
        .pipe(concat(conf.css_bootstrap.fileMin))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(conf.dist));
});


gulp.task('build_watch', function() {
    gulp.watch(conf.css.src, gulp.series(['build_css_fast']));
    gulp.watch(conf.tpl.src, gulp.series(['build_tpl', 'build_js_fast']));
    gulp.watch([conf.js.src, '!' + conf.tpl.dist + '/' + conf.tpl.file], gulp.parallel(['build_js_fast']));
});

gulp.task("default", gulp.series([ 'build_tpl', 'build_js', 'build_css' ]));
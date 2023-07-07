const gulp       = require('gulp');
const concat     = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const uglify     = require('gulp-uglify');
const minifyHtml = require("gulp-htmlmin");
const html2js    = require('gulp-html2js');
const cleanCSS   = require('gulp-clean-css');
const wrapFile   = require('gulp-wrap-file');
const rename     = require("gulp-rename");



var conf = {
    dist: "./dist",
    js: {
        fileMin: 'coreui-table.min.js',
        file: 'coreui-table.js',
        src: [
            'src/js/coreui.table.js',
            'src/js/coreui.table.ejs.js',
            'src/js/coreui.table.instance.js',
            'src/js/coreui.table.templates.js',
            'src/js/columns/*.js',
            'src/js/controls/*.js',
            'src/js/filters/*.js',
            'src/js/search/*.js',
            'src/js/lang/*.js',
        ]
    },
    js_dependents: {
        dist: './src/js',
        src: [
            'node_modules/ejs/ejs.min.js'
        ],
        rename: {
            'ejs.min' : 'coreui.table.ejs'
        },
        wrapper: function(content, file) {
            if (file.path.indexOf('ejs.min.js') >= 0) {
                return "(function() {" +
                    "\"use strict\";" +
                    content + ";" +
                    "CoreUI.table.ejs = ejs;" +
                    "})();"
            }

            console.warn('!!! not found dependent wrapper for file: ' + file.path)
            return '';
        }
    },
    tpl: {
        file: 'coreui.table.templates.js',
        dist: './src/js',
        variable: 'CoreUI"]["table"]["tpl',
        src: [
            'src/html/**/*.html',
            'src/html/*.html'
        ]
    },
    css: {
        fileMin: 'coreui-table.min.css',
        file: 'coreui-table.css',
        src: [
            'src/css/coreui.table.css'
        ]
    }
};


gulp.task('build_css_min', function(){
    return gulp.src(conf.css.src)
        .pipe(sourcemaps.init())
        .pipe(cleanCSS())
        .pipe(concat(conf.css.fileMin))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(conf.dist));
});

gulp.task('build_css_min_fast', function(){
    return gulp.src(conf.css.src)
        .pipe(sourcemaps.init())
        .pipe(concat(conf.css.fileMin))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(conf.dist));
});

gulp.task('build_css', function(){
    return gulp.src(conf.css.src)
        .pipe(sourcemaps.init())
        .pipe(concat(conf.css.file))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(conf.dist));
});

gulp.task('build_js_min', function() {
    return gulp.src(conf.js.src)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat(conf.js.fileMin, {newLine: ";\n"}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(conf.dist));
});

gulp.task('build_js_min_fast', function() {
    return gulp.src(conf.js.src)
        .pipe(sourcemaps.init())
        .pipe(concat(conf.js.fileMin, {newLine: ";\n"}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(conf.dist));
});

gulp.task('build_js', function() {
    return gulp.src(conf.js.src)
        .pipe(sourcemaps.init())
        .pipe(concat(conf.js.file, {newLine: ";\n"}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(conf.dist));
});

gulp.task('build_dependents', function() {

    return gulp.src(conf.js_dependents.src)
        .pipe(wrapFile({
            wrapper: conf.js_dependents.wrapper
        }))
        .pipe(rename(function (path) {
            if (conf.js_dependents.rename.hasOwnProperty(path.basename)) {
                path.basename = conf.js_dependents.rename[path.basename];
            }
        }))
        .pipe(gulp.dest(conf.js_dependents.dist));
});

gulp.task('build_tpl', function() {
    return gulp.src(conf.tpl.src)
        .pipe(minifyHtml({
            collapseWhitespace: false,
            ignoreCustomFragments: [ /<%[^%]+%>/ ]
        }))
        .pipe(html2js(conf.tpl.file, {
            adapter: 'javascript',
            base: 'templates',
            name: conf.tpl.variable,
            rename: function (moduleName) {
                return moduleName.replace('../src/html/', '');
            }
        }))
        .pipe(gulp.dest(conf.tpl.dist));
});


gulp.task('build_watch', function() {
    gulp.watch(conf.css.src, gulp.series(['build_css_fast']));
    gulp.watch(conf.tpl.src, gulp.series(['build_tpl', 'build_js_min_fast']));
    gulp.watch(conf.js.src, gulp.parallel(['build_js_fast']));
});

gulp.task("default", gulp.series([ 'build_tpl', 'build_js_min', 'build_js', 'build_css_min', 'build_css' ]));
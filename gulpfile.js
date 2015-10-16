var gulp = require('gulp');

var jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    express = require('express');

gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
});

// For development, but express will handle this in prod.
gulp.task('serve', function() {
    connect.server();
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'serve', 'watch']);

// I run on deploy!
// gulp.task('heroku:production', function() {
//     console.log('starting up!');
// });

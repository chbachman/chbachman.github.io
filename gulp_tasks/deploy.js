'use strict'
const gulp = require('gulp')
const ghPages = require('gh-pages')

// 'gulp deploy' -- pushes your dist folder to Github
gulp.task('upload', function (cb) {
  ghPages.publish('dist', {
    branch: 'master'
  }, cb)
})

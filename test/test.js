'use strict';

const prefixUrl = require('../');
const vinyl = require('vinyl-fs');
const concat = require('concat-stream');
const trumpet = require('trumpet');
const stream = require('stream');
const expect = require('chai').expect;
let prefix = 'http://cdn/';

describe('gulp-prefix-url',function () {
  describe('prefixUrl()',function () {
    /**
     *
     * */
    it('should prefix "' + prefix + '" for link href',function (done) {
      let tr = new trumpet();
      tr.select('link', function (node) {
        node.getAttribute('href',function (attrValue) {
          if(new RegExp('^' + prefix).test(attrValue)) {
            done();
          } else {
            done(new Error('should prefix "' + prefix + '" for link href'));
          }
        });
      });
      vinyl.src(__dirname + '/basic-test.html')
        .pipe(prefixUrl(prefix))
        .pipe(concat(function (data) {
          let file = data[0];
          let bufferStream = new stream.PassThrough();
          bufferStream.end( file.contents );
          bufferStream.pipe(tr);
        }));
    });

    it('should prefix "' + prefix + '" for img src',function (done) {
      let tr = new trumpet();
      tr.select('img', function (node) {
        node.getAttribute('src',function (attrValue) {
          if(new RegExp('^' + prefix).test(attrValue)) {
            done();
          } else {
            done(new Error('should prefix "' + prefix + '" for img src'));
          }
        });
      });
      vinyl.src(__dirname + '/basic-test.html')
        .pipe(prefixUrl(prefix))
        .pipe(concat(function (data) {
          let file = data[0];
          let bufferStream = new stream.PassThrough();
          bufferStream.end( file.contents );
          bufferStream.pipe(tr);
        }));
    });

    it('should prefix "' + prefix + '" for script src',function (done) {
      let tr = new trumpet();
      tr.select('script', function (node) {
        node.getAttribute('src',function (attrValue) {
          if(new RegExp('^' + prefix).test(attrValue)) {
            done();
          } else {
            done(new Error('should prefix "' + prefix + '" for script src'));
          }
        });
      });
      vinyl.src(__dirname + '/basic-test.html')
        .pipe(prefixUrl(prefix))
        .pipe(concat(function (data) {
          let file = data[0];
          let bufferStream = new stream.PassThrough();
          bufferStream.end( file.contents );
          bufferStream.pipe(tr);
        }));
    });

    it('should not prefix "' + prefix + '" for ignored mark attribute',function (done) {
      let tr = new trumpet();
      tr.select('img', function (node) {
        node.getAttribute('src',function (attrValue) {
          if(!new RegExp('^' + prefix).test(attrValue)) {
            done();
          } else {
            done(new Error('should not prefix "' + prefix + '" for ignored mark attribute'));
          }
        });
      });
      vinyl.src(__dirname + '/basic-test.html')
        .pipe(prefixUrl(prefix,{},'a'))
        .pipe(concat(function (data) {
          let file = data[0];
          let bufferStream = new stream.PassThrough();
          bufferStream.end( file.contents );
          bufferStream.pipe(tr);
        }));
    });

    it('should prefix "' + prefix + '" for custom mark attribute',function (done) {
      let tr = new trumpet();
      tr.select('img', function (node) {
        node.getAttribute('data-lazyload-src',function (attrValue) {
          if(new RegExp('^' + prefix).test(attrValue)) {
            done();
          } else {
            done(new Error('should not prefix "' + prefix + '" for custom mark attribute'));
          }
        });
      });
      vinyl.src(__dirname + '/img-custom-attribute.html')
        .pipe(prefixUrl(prefix,{
          "img[data-lazyload-src]" : "data-lazyload-src"
        }))
        .pipe(concat(function (data) {
          let file = data[0];
          let bufferStream = new stream.PassThrough();
          bufferStream.end( file.contents );
          bufferStream.pipe(tr);
        }));
    });

    it('should not prefix "' + prefix + '" for double slash',function (done) {
      let tr = new trumpet();
      tr.select('script', function (node) {
        node.getAttribute('src',function (attrValue) {
          if(new RegExp('^\/\/').test(attrValue)) {
            done();
          } else {
            done(new Error('should not prefix "' + prefix + '" for double slash'));
          }
        });
      });
      vinyl.src(__dirname + '/double-slash.html')
        .pipe(prefixUrl(prefix))
        .pipe(concat(function (data) {
          let file = data[0];
          let bufferStream = new stream.PassThrough();
          bufferStream.end( file.contents );
          bufferStream.pipe(tr);
        }));
    });
  });
});

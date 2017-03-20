'use strict';
const through = require('through2'),
      url = require("url"),
      urlJoin = require("url-join"),
      trumpet = require("trumpet"),
      concat  = require("concat-stream"),
      objectAssign = require('object-assign');

let _prefixer = function(prefix, attr, ignoreRegex) {
  return function(node) {
    node.getAttribute(attr, function(uri) {
      uri = url.parse(uri, false, true);
      if(uri.host || !uri.path)
        return;
      if (!/^[!#$&-;=?-\[\]_a-z~\.\/\{\}]+$/.test(uri.path)) {
        return;
      }
      if (ignoreRegex && new RegExp(ignoreRegex).test(uri.path)){
        return;
      }
      let filePrefix = (typeof prefix === 'function') ? prefix(uri) : prefix;
      node.setAttribute(attr, urlJoin(filePrefix, uri.path));
    });
  };
};

module.exports = function(prefix, selectors, ignore) {
  return through.obj(function(file, enc, cb) {
    let defaultSelector = {
      "script[src]" : "src",
      "link[href]" : "href",
      "img[src]" : "src"
    };
    selectors = objectAssign({},defaultSelector,selectors || {});
    if(!prefix) {
      cb(null, file);
    } else {
      let tr = trumpet();
      for (let key in selectors)
        tr.selectAll(key, _prefixer(prefix, selectors[key], ignore))
        tr.pipe(concat(function (data) {
        if (Array.isArray(data) && data.length === 0){
          data = null;
        }
        file.contents = data;
        cb(null, file);
      }));
      file.pipe(tr);
    }
  });
};

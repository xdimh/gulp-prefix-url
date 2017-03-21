# gulp-prefix-url
 

[![Travis](https://img.shields.io/travis/xdimh/gulp-prefix-url.svg?style=flat-square)]()    [![Coveralls](https://img.shields.io/coveralls/xdimh/gulp-prefix-url.svg?style=flat-square)]()  [![npm](https://img.shields.io/npm/v/gulp-prefix-url.svg?style=flat-square)]()
[![Github All Releases](https://img.shields.io/github/downloads/xdimh/gulp-prefix-url/total.svg?style=flat-square)]()

这个插件修改自[gulp-prefix](https://github.com/007design/gulp-prefix),用于为html中的某些标签特定的属性值,如link[href]的值添加前缀,往往是静态资源cdn域名地址。

```html
<!-- 添加前缀钱 -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>gulp-prefix-url test</title>
    <link rel="stylesheet" href="/a.css">
</head>
<body>
<img src="/a.png" alt="test">
<script src="a.js"></script>
</body>
</html>


<!-- 添加前缀后 -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>gulp-prefix-url test</title>
    <link rel="stylesheet" href="http://cdn/a.css">
</head>
<body>
<img src="http://cdn/a.png" alt="test">
<script src="http://cdn/a.js"></script>
</body>
</html>
```

## 安装

```npm install gulp-prefix-url --save```

## 如何使用?

```javascript
const gulp = require('gulp'),
      prefixUrl = require('gulp-prefix-url'),
      prefix = 'http://cdn';
  
gulp.task('prefix',function() {
  return gulp.src(__dirname + '/src/*.html')
              .pipe(prefixUrl(prefix))
              .pipe(gulp.dest(__dirname + '/dist'));
});

```


## 参数说明

### prefixUrl(prefix,[selectors],[ignore])

* prefix 

  > type string|function 需要添加的前缀。如果prefix为函数,该函数需要返回一个字符串,这个字符串即为需要添加的前缀,如下:
  
  ```javascript
  const gulp = require('gulp'),
        prefixUrl = require('gulp-prefix-url');
      
  let prefixFn = function() {
      let prefix = 'http://cdn';
      return prefix;
    };
    
  gulp.task('prefix',function() {
    return gulp.src(__dirname + '/src/*.html')
                .pipe(prefixUrl(prefixFn))
                .pipe(gulp.dest(__dirname + '/dist'));
  });
  ```
* selectors
 
  > type object 是一个key-value对象,key为属性选择器,value为具体的属性,如果不提供,插件会使用默认值进行前缀添加,具体格式如下:
  
  ```javascript
  const gulp = require('gulp'),
        prefixUrl = require('gulp-prefix-url'),
        prefix = 'http://cdn/',
        selectors = {
          "img[data-lazyload-src]" : "data-lazyload-src"
        };
      
    gulp.task('prefix',function() {
      return gulp.src(__dirname + '/src/*.html')
                  .pipe(prefixUrl(prefix,selectors))
                  .pipe(gulp.dest(__dirname + '/dist'));
    });
  
  //默认的选择器配置如下
  /*
   let defaultSelector = {
     "script[src]" : "src",
     "link[href]" : "href",
     "img[src]" : "src"
   };
   //最后得到的选择器
   finalSelectors = {
     "script[src]" : "src",
     "link[href]" : "href",
     "img[src]" : "src",
     "img[data-lazyload-src]" : "data-lazyload-src"
   }
  */
  ```
* ignore 
  > string regex 用于过滤一些不需要处理的属性值。这里的``regexString`` 最后会通过``new Regex(regexString)``创建得到正则表达式。
  
  ```javascript
    const gulp = require('gulp'),
          prefixUrl = require('gulp-prefix-url'),
          prefix = 'http://cdn/';
        
    let ignore = 'filter';
       
    gulp.task('prefix',function() {
      return gulp.src(__dirname + '/src/*.html')
                .pipe(prefixUrl(prefix,{},ignore))
                .pipe(gulp.dest(__dirname + '/dist'));
    });
  ```
  
  
## 证书

[MIT](https://github.com/xdimh/gulp-prefix-url/blob/master/LICENSE)

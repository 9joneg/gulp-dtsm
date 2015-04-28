gulp-dtsm
===

[![Build Status](https://drone.io/github.com/9joneg/gulp-dtsm/status.png)](https://drone.io/github.com/9joneg/gulp-dtsm/latest)

Gulp plugin for DTSM

```
var dtsm = require('gulp-dtsm');

gulp.task('dtsm', function() {
    return gulp.src('./dtsm.json')
        .pipe(dtsm());
});
```

## Installation

```
$ npm i 9joneg/gulp-dtsm
```

## License

[MIT](http://9joneg.mit-license.org/)

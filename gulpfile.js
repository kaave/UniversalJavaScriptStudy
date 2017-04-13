const
  gulp = require('gulp'),
  eslint = require('gulp-eslint'),
  stylelint = require('gulp-stylelint'),
  stylefmt = require('gulp-stylefmt'),
  flow = require('gulp-flowtype');

const src = {
  scripts: ['./source/**/*.js', './source/**/*.jsx'],
  styles: ['./source/**/*.scss'],
  dest: './source/'
};

const config = {
  eslint: {
    configFile: '.eslintrc'
  },
  stylelint: {
    // エラーがあってもプロセスを終了しない。それがやりたかったらgulp経由でlintしなーい
    failAfterError: false,
    reporters: [
      { formatter: 'string', console: true }
    ]
  },
  flow: {
    // @flowなしのファイルもチェックするか しません
    all: false,
    // エラーだけでなくやばそうなのも一緒にチェックするか しません
    weak: false,
    // 型定義ファイルのパス 自前で別途追加したいときはどうぞ
    //declarations: './declarations',
    // 型チェックしたらflowプロセスをkillするか しません
    killFlow: false,
    // コケたらビープ通知するか やかましい しない
    beep: false,
    // コケたらタスク止めるか gulpから走らせるときはしません
    abort: false
  }
};

gulp.task('lint:scripts', () => (
  gulp.src(src.scripts)
    .pipe(eslint(config.eslint))
    .pipe(eslint.format())
    //.pipe(eslint.failAfterError())
    //.pipe(eslint.formatEach('compact', process.stderr))
));

gulp.task('lint:styles', () => gulp.src(src.styles).pipe(stylelint(config.stylelint)));
gulp.task('typecheck', () => gulp.src(src.scripts).pipe(flow(config.flow)));

gulp.task('check', ['lint:scripts', 'lint:styles', 'typecheck']);

gulp.task('stylefmt', () => (
  gulp.src(src.styles)
    .pipe(stylefmt())
    .pipe(gulp.dest(src.dest))
));

gulp.task('default', ['check'], () => {
  gulp.watch(src.scripts, ['lint:scripts', 'typecheck']);
  gulp.watch(src.styles, ['lint:styles']);
});


module.exports = {
  require: ['./test/helpers/_setup.js'],
  files: ['./test/spec/**/*'],
  ignoredByWatcher: ['!**/*.{js,vue}'],
  snapshotDir: './test/snapshot',
  babel: true,
  tap: true,
  verbose: true,
  color: true,
};

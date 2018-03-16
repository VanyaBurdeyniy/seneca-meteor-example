Package.describe({
  name: 'spirent:stylesheets-helper',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.6.1');
  api.use('ecmascript');
  api.use('less');
  api.addFiles('main.less', 'client');
  api.addAssets([
    'font/OpenSans-Regular-webfont.ttf'
  ], 'client');
  api.mainModule('stylesheets-helper.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('spirent:stylesheets-helper');
  api.mainModule('stylesheets-helper-tests.js');
});

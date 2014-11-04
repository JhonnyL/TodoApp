require.config({
  paths: {
    'jquery': '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min',
    'underscore': '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min'
  },
  shim: {
    'jquery': {
      exports: '$'
    },
    'underscore': {
      exports: '_'
    }
  }
});

define([
  'app'
], function (App) {
  var App = new App();

  App.start();
});
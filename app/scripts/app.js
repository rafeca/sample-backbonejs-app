define([
  'backbone',
  'router',
  'template-helpers'
], function (Backbone, Router) {
  'use strict';

  var router = new Router();

  Backbone.history.start();

  return {
    router: router
  };
});

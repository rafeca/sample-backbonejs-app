define([
  'backbone',
  'views/index'
], function (Backbone, IndexView) {
  'use strict';

  var Router = Backbone.Router.extend({
    routes: {
      '*path': 'index'
    },

    index: function () {
      var indexView = new IndexView();
      indexView.render();
    }
  });

  return Router;
});

define([
  'backbone',
  'zeptojs',
  'templates'
], function (Backbone, $, templates) {
  'use strict';

  var Index = Backbone.View.extend({

    el: '#main-page',

    template: templates.index,

    render: function () {
      this.$el.html(this.template());
    }
  });

  return Index;
});

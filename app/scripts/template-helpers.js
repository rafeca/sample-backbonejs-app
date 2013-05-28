define([
  'handlebars',
  'underscore'
], function (Handlebars, _) {
  'use strict';

  var helpers = {
    // Handlebars helpers go here...
  };

  // Register all the helpers
  _.each(helpers, function (helper, name) {
    Handlebars.registerHelper(name, helper);
  });
});

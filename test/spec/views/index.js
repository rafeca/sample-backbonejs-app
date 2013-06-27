define([
  'views/index'
], function (View) {
  'use strict';

  describe('views/index tests', function () {
    it('should render the view successfully', function () {
      var view = new View({ el: '#test-placeholder' });
      view.render();

      expect(view.$el.find('h2').html()).to.contain('Sample web app');

      view.remove();
    });
  });
});

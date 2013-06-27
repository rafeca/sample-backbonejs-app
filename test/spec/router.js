define([
  'backbone',
  'router',
  'views/index'
], function (Backbone, Router, IndexView) {
  'use strict';

  describe('router tests', function () {
    beforeEach(function () {
      this.router = new Router();
    });

    it('should render Index when loading empty path', function () {
      var viewMock = sinon.mock(IndexView.prototype);
      viewMock.expects('render').once();

      Backbone.history.loadUrl('');

      viewMock.verify();
    });

    it('should render Index when loading any random URL', function () {
      var viewMock = sinon.mock(IndexView.prototype);
      viewMock.expects('render').once();

      Backbone.history.loadUrl('random-404-url');

      viewMock.verify();
    });
  });
});

define([
  'jquery',
  'underscore'
], function ($, _) {
  'use strict';

  var View = function (options) {
    _.extend(this, options);
  };

  _.extend(View.prototype, {

    render: function () {
      var template = this.getTemplate();
      $(this.context).append(template(this.model));
    },

    getTemplate: function () {
      return _.template($("#item-tmpl").html());
    }
  });

  return View;
});
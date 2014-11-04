define([
  'underscore'
], function (_) {
  'use strict';

  var Model = function (data) {
    _.extend(this, data);
  };

  _.extend(Model.prototype, {

    get: function (attr) {
      return this.data[attr];
    },

    set : function (attr, val) {
      this.data[attr] = val;     
    },

    all : function () {
      return this.data;
    }
  });

  return Model;
});
define([
  'jquery',
  'underscore',
  'model',
  'view'
], function ($, _, Model, View) {
  'use strict';

  var App = function () {
    this.region = $('.list');
    this.collection = [];
  };

  _.extend(App.prototype, {

    /**
     * Initializer
     */
    start: function () {
      var self = this;

      // load items from json file
      self.loadItemData().done(function (items) {

        // Populate collection with items
        _.each(items, function (item) {
          self.collection.push(new Model({data: item}));
        });

        self.show();
        self.registerEvents();
      });
    },

    /**
     * Render the article table
     */
    show: function () {
      var itemView, self;

      self = this;
      self.region.html('');
      _.each(self.collection, function (item) {
        itemView = new View({
          context: self.region,
          model: item.data
        });

        itemView.render();
      });
    },

    /**
     * Mark an article as selected
     */
    mark: function (id) {
      var model, checked, message;

      model = this.find(id);
      checked = model.get('checked') === true ? false : true;
      model.set('checked', checked);
      this.collection[model.get('id') - 1] = model;

      message = checked === true ? 'checked' : 'unchecked';
      console.log('"' + model.get('title') + '" was ' + message);

      this.show();
    },

    /**
     * Find a model by id
     * @param int id
     * @return {Object} Model object
     */
    find: function (id) {
      return _.find(this.collection, function (item) {
        return item.get('id') === parseInt(id);
      });
    },

    /**
     * Load the article data
     * @return {Object} jQuery Deferred object
     */
    loadItemData: function () {
      return $.getJSON('/json/items.json');
    },

    /**
     * Register events
     */
    registerEvents: function () {
      var self, element;

      self = this;
      $(document).on('click', '.item', function (e) {
        element = $(e.target).closest('tr');
        self.mark(element.attr('id'));
      });
    }
  });

  return App;
});
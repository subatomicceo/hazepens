// var HAZE = HAZE || {};

(function () {

  window.HAZE = {
    Views: {},
    Extensions: {},
    Router: null,

    init: function () {

      this.instance = new HAZE.Views.App();
      Backbone.history.start();

    }
  };

  $(function() {
    window.HAZE.init();
  });

  HAZE.Router = Backbone.Router.extend({

    routes: {
      'activity': 'activity',
      '': 'home'
    },

    home: function () {
      var view = new HAZE.Views.Home();
      HAZE.instance.goto(view);
    },

    activity: function () {
      var view = new HAZE.Views.Activity();
      HAZE.instance.goto(view);
    }

  });

  HAZE.Extensions.View = Backbone.View.extend({

    initialize: function () {
      this.router = new HAZE.Router();
    },

    render: function(options) {

      options = options || {};

      if (options.page === true) {
        this.$el.addClass('page');
      }

      return this;

    },

    transitionIn: function (callback) {

      var view = this,
          delay

      var transitionIn = function () {
        view.$el.addClass('is-visible');
        view.$el.one('transitionend', function () {
          if (_.isFunction(callback)) {
            callback();
          }
        })
      };

      _.delay(transitionIn, 20);

    },

    transitionOut: function (callback) {

      var view = this;

      view.$el.removeClass('is-visible');
      view.$el.one('transitionend', function () {
        if (_.isFunction(callback)) {
          callback();
        };
      });

    }

  });

  HAZE.Views.App = HAZE.Extensions.View.extend({

    el: 'body',

    goto: function (view) {

      var previous = this.currentPage || null;
      var next = view;

      if (previous) {
        previous.transitionOut(function () {
          previous.remove();
        });
      }

      next.render({ page: true });
      this.$el.append( next.$el );
      next.transitionIn();
      this.currentPage = next;

    }

  });

  HAZE.Views.Home = HAZE.Extensions.View.extend({

    className: 'home',

    render: function () {
      var template = HAZE.templates.home;
      this.$el.html(template());
      return HAZE.Extensions.View.prototype.render.apply(this, arguments);
    }

  });

  HAZE.Views.Activity = HAZE.Extensions.View.extend({

    className: 'activity',

    render: function () {
      var template = HAZE.templates.activity;
      this.$el.html(template());
      return HAZE.Extensions.View.prototype.render.apply(this, arguments);
    }

  });

}());

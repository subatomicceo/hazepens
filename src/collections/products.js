var HAZE = HAZE || {};
(function(){
  'use strict';

  var PC = Backbone.Collection.extend({
    model: HAZE.productsModel,
    url: "../data/songs.json"
  });

  HAZE.productsCollection = new PC();

})();

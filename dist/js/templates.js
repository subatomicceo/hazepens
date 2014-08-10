this["HAZE"] = this["HAZE"] || {};
this["HAZE"]["templates"] = this["HAZE"]["templates"] || {};
this["HAZE"]["templates"]["activity"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h1>Activity</h1>\n<p><a href=\"#/\">&larr; Home</a></p>\n";
  });;
this["HAZE"] = this["HAZE"] || {};
this["HAZE"]["templates"] = this["HAZE"]["templates"] || {};
this["HAZE"]["templates"]["home"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h1>Home</h1>\n<p><a href=\"#/activity\">Products &rarr;</a></p>\n";
  });;
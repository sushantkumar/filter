"use strict";
var home = require('./user');
var html = require('./fetchHtml');

module.exports = function (app) {

  app.get('/',home.all);
  app.get('/filter',home.platform);
  app.get('/fetchHtml', html.fetchData);


};
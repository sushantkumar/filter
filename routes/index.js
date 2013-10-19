"use strict";
var home = require('./user');

module.exports = function (app) {

  app.get('/',home.all);
  app.get('/filter',home.platform);


};
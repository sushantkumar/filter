"use strict";

var prod = require('../model/product');


var home = {
  all: function(req, res, next) {
    prod.all(function(err, data){
      if(!err){
        res.render('index', {'product': data});
      }
    });
  },
  platform: function(req, res, next) {
    prod.byPlatform(req.query.filter, function(err, data){
      if(!err){
        res.json(200, data);
      }
    });
  },
  ram: function(req, res, next) {
    prod.byRam('1', function(err, data){
      if(!err){
        res.json(200, data);
      }
    });
  },
  dualSim: function(req, res, next) {
    prod.byDualsim('android', function(err, data){
      if(!err){
        res.json(200, data);
      }
    });
  },
  dualCore: function(req, res, next) {
    prod.byDualcore('1', function(err, data){
      if(!err){
        res.json(200, data);
      }
    });
  },
  camera: function(req, res, next) {
    prod.byCamera('android', function(err, data){
      if(!err){
        res.json(200, data);
      }
    });
  },
  price: function(req, res, next) {
    prod.byPrice('10000', function(err, data){
      if(!err){
        res.json(200, data);
      }
    });
  }
};
module.exports = home;
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
        var products ={};
        var html ='';
        for(var i=0; i<data.length; i++){
          html += "<li>"+data[i].brand + ' ' + data[i].platform 
        }
        products.html=html;
        products.itemsCount = data.length;
        res.json(200, products);
      }
    });
  }
};
module.exports = home;
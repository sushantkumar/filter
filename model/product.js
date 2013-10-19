"use strict";
var mysql = require('mysql');
var util = require('util');
var LRU = require("lru-cache");

var options = {
    max: 500,
    length: function(n) {
      return n * 2;
    },
    maxAge: 1000 * 60 * 2
};
var LRU_cache = LRU(options);

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'sample'
});
connection.connect();

var product = {

  all: function(cb){
    var query = util.format('select * from sample');
    connection.query(query, function(err, rows) {
      cb(err, rows);
    });
  },
  byPlatform: function(platform, cb){
    var query;
    if(!platform){
      query = 'select * from sample';
    }
    else {
      var i=0;
      var params = '';
      var plat = [];
      for(i; i<platform.length;i++){
        switch(platform[i].key){
          case 'platform':
            plat.push(platform[i].value);
            break;
          case 'ram':
            var ram = platform[i].value;
            break;
          case 'camera':
            var camera = platform[i].value;
            break;
          case 'dualcore':
            var dualcore = platform[i].value;
            break;
          case 'dualsim':
            var dualsim = platform[i].value;
            break;
          default:
            break;
        }
      }
      var whr = plat.length ? 'where platform in("'+plat.join('","')+'")' : '';
      if(ram != undefined)
        whr += ' and ram > "'+ ram +'"';
      if(camera != undefined)
        whr += ' and camera > "'+ camera + '"';
      if(dualsim != undefined)
        whr += ' and dualsim = "'+ dualsim+'"';
      if(dualcore != undefined)
        whr += ' and dualcore = "' +dualcore+'"';

      query = 'select * from sample '+ whr;
    }
    var product = LRU_cache.get(query);
    if(!product) {
      connection.query(query, function(err, rows) {
        if(!err){
          LRU_cache.set(query, rows);
        }
        cb(err, rows);
      });
    }
    else{
      cb(null, product); 
    }
  }


};
module.exports = product;


"use strict";
var mysql = require('mysql');
var util = require('util');

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
    console.log(platform);
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
    console.log(plat);
    params = params.slice(0, params.length - 3);
    //var query = 'select * from sample where '+ params;
    var whr = plat.length ? 'where platform in("'+plat+'")' : '';
    if(ram != undefined)
      whr += ' and ram > "'+ ram +'"';
    if(camera != undefined)
      whr += ' and camera > "'+ camera + '"';
    if(dualsim != undefined)
      whr += ' and dualsim = "'+ dualsim+'"';
    if(dualcore != undefined)
      whr += ' and dualcore = "' +dualcore+'"';

    var query = 'select * from sample '+ whr;

    console.log(query);

    connection.query(query, function(err, rows) {
      cb(err, rows);
    });
  }


};
module.exports = product;


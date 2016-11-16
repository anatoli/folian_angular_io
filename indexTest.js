var express   =    require("express");
var mysql     =    require('mysql');
var app       =    express();

var pool      =    mysql.createPool({
  connectionLimit : 100, //important
  host: '127.0.0.1',
  user: '123456qwerty',
  password: '123456qwerty',
  database: 'database1',
  port: 3306,
  debug    :  false
});

function handle_database(req,res) {

  pool.getConnection(function(err,connection){
    if (err) {
      connection.release();
      console.log(connection)
      res.json({"code" : 100, "status" : "Error in connection database"});
      return;
    }

    console.log('connected as id ' + connection.threadId);

    connection.query("select * from user",function(err,rows){
      connection.release();
      if(!err) {
        res.json(rows);
        console.log(rows)
      }
    });

    connection.on('error', function(err) {
      res.json({"code" : 100, "status" : "Error in connection database"});
      return;
    });
  });
}

app.get("/",function(req,res){-
  handle_database(req,res);
});

app.listen(3000);/**
 * Created by Anatoliy Arinovich on 16.11.2016.
 */

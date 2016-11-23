/**
 * Created by Anatoli on 05.08.2016.
 */
var bcrypt = require('bcrypt-nodejs');
var dbconfig = require('./database');
var connection = mysql.createConnection(dbconfig.connection);

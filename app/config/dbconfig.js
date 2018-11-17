/* Load modules */
let sqlite3 = require('sqlite3').verbose();

/*
 * Database configuration
 */

/* Load database file (Creates file if not exists) */
let db = new sqlite3.Database('./sqlite.db');

/* Init trade and users tables if they don't exist */
let init = function () { 
    
     db.run("CREATE TABLE if not exists users (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " name TEXT," + 
        " trade INT" +
        ")");

    db.run("CREATE TABLE if not exists trades (" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT," +
        " type TEXT," +
        " user INT," +
        " symbol TEXT," +
        " shares INT," +
        " price TEXT," +
        " timestamp TEXT" + 
        ")");
};

module.exports = {
    init: init,
    db: db
};


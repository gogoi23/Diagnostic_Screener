// this file is used to connect to the mysql database

const mysql = require('mysql2');
const async = require('async');

const host = "localhost";   // database host
const database = "diagnostic_screener"; // database name
const user = "root"; // username 
const password = "Jantu1234!"; //password 

/**
 * dbquery
 *
 * performs a given SQL query on the database and returns the results
 * to the caller
 *
 * @param query     the SQL query to perform (e.g., "SELECT * FROM ...")
 * @param callback  the callback function to call with two values
 *                   error - (or 'false' if none)
 *                   results - as given by the mysql client
 */
exports.dbquery = function(query_str, callback) {
    var dbclient;
    async.waterfall([
        // Step 1: Connect to the database
        function (next) {
            dbclient = mysql.createConnection({
                host: host,
                user: user,
                password: password,
                database: database,
            });

            dbclient.connect(function(err) {
                if (err) {
                    return next(err);
                }
                next(null);
            });
        },
        
        // Step 2: Issue query 
        function (next) {
            dbclient.query(query_str, function(err, rows, fields) {
                if (err) {
                    return next(err);
                }
                next(null, rows);
            });
        }
    ],
    
    // Waterfall cleanup function
    function (err, results) {
        if (err) {
            console.log("Database query failed.");
            console.log(err);
            if (typeof callback === 'function') {
                callback(err, null);
            }
        } else {
            if (typeof callback === 'function') {
                callback(null, results);
            }
        }

        // Close connection to database
        if (dbclient) {
            dbclient.end();
        }
    });
}
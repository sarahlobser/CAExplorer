var mysql = require('mysql');

exports.getConnection = function(callback) {
    var con = mysql.createConnection({
        host     : process.env.DB_HOST || 'localhost',
        user     : process.env.DB_USER || 'root',
        password : process.env.DB_PASS || 'root',
        database : process.env.DB_NAME || 'ca'
    });
    
    con.connect(function(err){
        if(err){
            console.log('Error connecting to the DB');
            return callback(err);
        }
        callback(err, con);
    });
};
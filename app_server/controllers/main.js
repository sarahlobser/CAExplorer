var mysql = require('../models/mysql.js');

module.exports.index = function(req, res) {
    mysql.getConnection(function(err, con) {
        con.query("select * from favorite", function(err, rows) {
            if(err) throw err;
            res.render('explorer', {favorites: rows});
        })
    })
}

module.exports.savefavorite = function(req, res) {
    console.log("I'm in save favorite");
    console.log(req.body.ruleset);
    mysql.getConnection(function(err, con) {
        con.query("insert into favorite (ruleset, author) values ('" + req.body.number + "', 'sarah')", function(err, rows) {
            if(err) throw err;
            res.redirect('/');
        });
    })
}

module.exports.getFavorite = function(req, res) {
    var ruleset = req.params.ruleset;
    mysql.getConnection(function(err, con) {
        con.query("select * from favorite", function(err, rows) {
            if(err) throw err;
            console.log(ruleset);
            res.render('explorer', {favorites: rows, ruleset: ruleset});
        })
    })
};
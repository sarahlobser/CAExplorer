var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mysql = require('mysql');
var path = require('path');

// app.js configuration for body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//set location of views
app.set('views', path.join(__dirname, 'app_server', 'views'));

//set location of static content
app.use(express.static(__dirname + '/public'));

//set handlebars to be the default templating engine
var handlebars = require('express-handlebars').create({defaultLayout:'../../app_server/views/layouts/main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var models = require('./app_server/models');

//require routing from index
app.use('/explore', require('./app_server/routes/index'));

//404 and 500 routes
app.use(function(req, res){
                  res.status(404);
                  res.send('404');
            });

            app.use(function(err, req, res, next){
                  console.log(err.stack);
                  res.status(500);
                  res.send('500');
            });

//set up port 3000
app.listen(port, function() {
    console.log('ca app started on' + port + 
               '; press ctrl-c to terminate.')
});
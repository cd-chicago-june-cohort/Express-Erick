var express = require("express");
var path = require("path");
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();

app.use(session({secret: 'codingdojorocks'})); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./static")));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    if(req.session.counter){
        req.session.counter += 1;
    }
    else{
        req.session.counter = 1;
    } 
    res.render("index", {'counter':req.session.counter});
})

app.get('/two', function(req, res){
    req.session.counter += 1;
    res.redirect('/');
})

app.get('/reset', function(req, res){
    req.session.counter = 0;
    res.redirect('/');
})

app.post('/users', function(req, res) {
    console.log("POST DATA", req.body);

    // This is where we would add the user to the database
    // Then redirect to the root route
    res.redirect('/');
})

app.listen(8000, function() {
    console.log("listening on port 8000");
});
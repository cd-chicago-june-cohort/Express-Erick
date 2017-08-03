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
    req.session.destroy();
    res.render("index");
})

app.post('/process', function(req, res) {
    if(req.session.random){
        req.session.guess = req.body.guess;
    }
    else{
        req.session.random = Math.floor(Math.random() * 100) + 1;
        req.session.guess = req.body.guess;
    }
    res.redirect('/result');
})

app.get('/result', function(req, res){
    number = req.session.random
    guess = req.session.guess
    info = {
        'number':number,
        'guess':guess
    }
    console.log(req.session.random);
    res.render("result", info);
})

app.listen(8000, function() {
    console.log("listening on port 8000");
});
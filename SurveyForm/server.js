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
    res.render("index");
})

app.get('/result', function(req, res) {
    console.log(req.session.info);
    res.render("result", {'info':req.session.info});
})

app.post('/process', function(req, res) {
    req.session.info = req.body;
    res.redirect('/result');
})

app.listen(8000, function() {
    console.log("listening on port 8000");
});
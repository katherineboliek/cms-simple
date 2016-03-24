var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var db = require('./config/db');
var post = require('./controllers/post');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/posts', post.list); //list page

app.get('/post/new', post.form); //new action
app.post('/posts', post.create); //new action

app.get('/posts/:id', post.disp); //show post without edit ability

app.post('/posts/:id', post.update); //edit action
app.get('/posts/edit/:id', post.show); //edit form

//app.post('/posts/:id', post.update); //edit action
//app.get('/posts/:id', post.show); //edit form

app.get('/posts/delete/:id', post.remove); //delete action

db.connect('mongodb://localhost:27017/test', function(err) {
    console.log("MongoDB connected...");
    app.listen(8080, function() {
        console.log("Express started...");
    });
});

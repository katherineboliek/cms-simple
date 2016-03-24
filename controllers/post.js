var db = require('../config/db');

exports.list = function(req, res) {
    var collection = db.get().collection('posts');

    collection.find({}).toArray(function(err, results) {
        res.render('post/list', {posts: results});
    });
};

exports.show = function(req, res) {
    var collection = db.get().collection('posts');

    collection.find({"custom": req.params.id}).limit(1).toArray(function(err, results) {
        res.render('post/show', {post: results[0]});
    });
};

exports.disp = function(req, res) {
    var collection = db.get().collection('posts');

    collection.find({"custom": req.params.id}).limit(1).toArray(function(err, results) {
        res.render('post/disp', {post: results[0]});
    });
};

exports.update = function(req, res) {
    var collection = db.get().collection('posts');

    //note about xss and sanitization
    collection.updateOne(
        {custom: req.params.id},
        {
            $set: {
                title: req.body.title,
                date: new Date(),
                custom: req.body.custom,
                author: req.body.author,
                category: req.body.category,
                content: req.body.content,
                link: req.body.link
            }
        }
    );

    res.redirect('/posts');
};

exports.form = function(req, res) {
    res.render('post/form');
}

exports.create = function(req, res) {
    var collection = db.get().collection('posts');

    //note about xss and sanitization
    collection.insert({
        title: req.body.title,
        date: new Date(),
        custom: req.body.custom,
        author: req.body.author,
        category: req.body.category,
        content: req.body.content,
        link: req.body.link
    });

    res.redirect('/posts');
};

exports.remove = function(req, res) {
    var collection = db.get().collection('posts');

    //note about xss and sanitization
    collection.removeOne({
        custom: req.params.id
    });

    return res.redirect('/posts');
};

const express = require('express');
const router = express.Router({mergeParams: true});
const Campground = require('../models/camps');
const Comment = require('../models/comments');
const loginRequire = require('./index').loginRequire;

// Comment routes

router.get('/new', loginRequire, (req, res) => {
    Campground.findById(req.params.id)
        .then(foundCampground => {
            res.render('comments/new', { campground: foundCampground });
        }).catch(err => {
            console.log(err);
        });
});

router.post('/', loginRequire, (req, res) => {
    Campground.findById(req.params.id)
        .then((campground) => {
            Comment.create(req.body)
                .then(comment => {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }).catch(err => {
                    console.log(err);
                });
        }).catch(err => {
            console.log(err);
        });
});

module.exports = router;
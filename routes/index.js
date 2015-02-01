var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
	var models = require('../models');	
	models.Page.find({}, function(err, pages){
		res.render('index', { title: 'Wikistacks', docs: pages });
	})
});

router.get('/add', function(req, res, next) {
  res.render('add', { title: 'Wikistacks -- Add A Page' });
});

router.post('/add', function(req, res, next) {
	var post = req.body.pagecontent;
	var postTitle = req.body.pagetitle;
	var generateUrlName = function(name) {
	    if (typeof name != "undefined" && name !== "") {
	        return name.replace(/\s/ig, "_").replace(/\W/ig, "");
	    } else {
	        return Math.random().toString(36).substring(2, 7);
	    }
	};
	var urlName = generateUrlName(postTitle);
	console.log("we got this far!", post, postTitle);
	var models = require('../models/');

  // STUDENT ASSIGNMENT:
  // add definitions of the `title`, `body` and `url_name` variables here

  var page = new models.Page({ title: postTitle, body: post, url_name: urlName });
  page.save();
  res.redirect('/');
});

module.exports = router;

var express = require("express"),
	app = express(),
	engines = require("consolidate"),
	MongoClient = require("mongodb").MongoClient,
	assert = require("assert"),
	bodyParser = require('body-parser');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({ extended: true })); 

MongoClient.connect("mongodb://127.0.0.1:27017/app_demo", function(err, db){
	assert.equal(null, err);
	console.log("Connection to database Ok >_<");

	app.get("/", function(req, res, next){
		res.render("form");
	});

	app.post("/saveMovie", function(req, res, next){
		var title = req.body.title,
			year = req.body.year,
			imdb = req.body.imdb;
		console.log("aaaaaaaaaaaaaa");
		if (typeof title == 'undefined' || typeof year == 'undefined' || typeof imdb == 'undefined') {
			res.render("form", {"err": "Fill all the values plz"});
		}else{
			console.log("bbbbbbbbbbbbbbbb");
			db.collection("movies").insert({
				"title": title,
				"year": year,
				"imdb": imdb
			});
			db.close();
			res.send("Sucess!!!!!");
		}
	});

	app.use(function(req, res){
		res.status(HttpStatus.NOT_FOUND).send("Not found :(");
		
	});
});

var server = app.listen(3000, function() {
    var port = server.address().port;
    console.log('Express server listening on port %s.', port);
});
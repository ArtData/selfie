var Flickr = require("node-flickr");
var config = require('config');
var keys = {"api_key": config.get('flickr.api_key')}
var flickr = new Flickr(keys);
var request = require('request');

var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

var router = express.Router();

router.param(function(name, fn){
  if (fn instanceof RegExp) {
    return function(req, res, next, val){
      var captures;
      if (captures = fn.exec(String(val))) {
        req.params[name] = captures;
        next();
      } else {
        next('route');
      }
    }
  }
});

router.param('id', /^\d+$/);

router.get('/:id', function (req, res, next) {

	var artworkId = req.params.id;

	request('https://' + config.get('sfmoma.username') + ':' + config.get('sfmoma.password') + '@api.sfmoma.org/collection/artworks/' + artworkId + '/', function (error, response, body) {

		if (!error && response.statusCode == 200) {

			var data = JSON.parse(body);

			var artist = data.creators[0].artist;
			var lastName = artist.split(' ').pop();
			var text = data.display_title + ' ' + lastName + ' ' + 'sfmoma';

			if (!data.image.image_url) {
				next(new Error('SFMOMA Image not found.'));
				return;
			}

			var output = {
				'title': data.display_title,
				'artist': artist,
				'photos': [],
				'sfmoma_image_url': data.image.image_url
			};

			flickr.get("photos.search", {"text": text, "extras": "url_l"}, function(result){

				result.photos.photo.forEach(function(photo) {

					if (photo.url_l) {

						output['photos'].push(photo.url_l);

					}

				});

				if (output['photos'].length === 0) {

					next(new Error('No Flickr photos found.'));
					return;

				}

				res.send(output);

			});

		} else {

			next(new Error('SFMOMA API responded with an error.'));
			return;

		}

	});

})

app.use('/artworks', router);

app.use(function(err, req, res, next) {

	res.send('Failed.');

});

var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);

});
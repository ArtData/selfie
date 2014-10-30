var Flickr = require("node-flickr");
var config = require('config');
var keys = {"api_key": config.get('flickr.api_key')}
var flickr = new Flickr(keys);
var request = require('request');
var path = require('path');

var express = require('express');
var exphbs  = require('express-handlebars');
var app = express();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

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
			var text = encodeURIComponent(data.display_title + ' ' + lastName + ' ' + 'sfmoma');

			if (artworkId == 143230) {
				data.image.image_url = '/2012.154_01_A02.jpg';
			}

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


			output = { title: 'Exploded Views',
			  artist: 'Jim Campbell',
			  'sfmoma_image_url': data.image.image_url,
			  photos:
			   [ 'https://farm4.staticflickr.com/3741/11092685214_499329ae47_b.jpg',
			     'https://farm9.staticflickr.com/8387/8599098596_a418f70f2d_b.jpg',
			     'https://farm9.staticflickr.com/8093/8560539440_6f7bf3b33a_b.jpg',
			     'https://farm9.staticflickr.com/8083/8363269465_cec8dc6fd9_b.jpg',
			     'https://farm9.staticflickr.com/8042/8052177493_315b727086_b.jpg',
			     'https://farm9.staticflickr.com/8035/8033104623_1441d6fa7b_b.jpg',
			     'https://farm9.staticflickr.com/8314/8022242303_eab1b63923_b.jpg',
			     'https://farm9.staticflickr.com/8295/8010740080_b7fc00f0af_b.jpg',
			     'https://farm9.staticflickr.com/8461/7995146182_e72186b50e_b.jpg',
			     'https://farm9.staticflickr.com/8305/7994636866_bea8ccae67_b.jpg',
			     'https://farm9.staticflickr.com/8437/7816347278_1e0a51f064_b.jpg',
			     'https://farm8.staticflickr.com/7118/7804665672_ccf86f550d_b.jpg',
			     'https://farm9.staticflickr.com/8155/7660266616_0f1b4b561e_b.jpg',
			     'https://farm9.staticflickr.com/8012/7612627066_ac01865a31_b.jpg',
			     'https://farm9.staticflickr.com/8001/7521425322_fa06ce9e57_b.jpg',
			     'https://farm8.staticflickr.com/7097/7158550593_1e300026c8_b.jpg',
			     'https://farm8.staticflickr.com/7241/7297153518_f83993132d_b.jpg',
			     'https://farm8.staticflickr.com/7182/7002428168_e006e2cb78_b.jpg',
			     'https://farm9.staticflickr.com/8147/6994964568_9abfdab5f0_b.jpg',
			     'https://farm8.staticflickr.com/7040/7141055657_523fe5e301_b.jpg',
			     'https://farm8.staticflickr.com/7086/7141055561_20ce1ee8ec_b.jpg',
			     'https://farm8.staticflickr.com/7123/7140422421_6768c49918_b.jpg',
			     'https://farm8.staticflickr.com/7093/7134706239_f949e67b59_b.jpg',
			     'https://farm8.staticflickr.com/7120/6988454060_cfc57d8820_b.jpg',
			     'https://farm8.staticflickr.com/7262/7134535431_444579eb12_b.jpg',
			     'https://farm9.staticflickr.com/8155/7134530765_ab469ba96e_b.jpg',
			     'https://farm8.staticflickr.com/7132/6988439478_7ce0eb2696_b.jpg',
			     'https://farm9.staticflickr.com/8022/6981424258_ed4887aa1a_b.jpg',
			     'https://farm8.staticflickr.com/7078/6981428380_63437955b8_b.jpg',
			     'https://farm8.staticflickr.com/7225/6955098756_ccf793a30e_b.jpg',
			     'https://farm6.staticflickr.com/5079/6941108770_cce75b9b0d_b.jpg',
			     'https://farm8.staticflickr.com/7254/6888374848_33b245d408_b.jpg',
			     'https://farm8.staticflickr.com/7096/7025846313_5f363a424a_b.jpg',
			     'https://farm8.staticflickr.com/7060/6861139434_cb010a233a_b.jpg',
			     'https://farm8.staticflickr.com/7264/6995584413_8d8d7fa1be_b.jpg',
			     'https://farm7.staticflickr.com/6215/6995583871_5e17b6edaa_b.jpg',
			     'https://farm8.staticflickr.com/7056/6938389413_ebe7ce693a_b.jpg',
			     'https://farm8.staticflickr.com/7174/6657814913_4a94d5f575_b.jpg',
			     'https://farm8.staticflickr.com/7145/6649139091_7ff4a80a39_b.jpg',
			     'https://farm8.staticflickr.com/7157/6640389137_6986256a14_b.jpg',
			     'https://farm8.staticflickr.com/7170/6618566299_a661d6fb5f_b.jpg',
			     'https://farm8.staticflickr.com/7167/6618565559_d7c97ba16f_b.jpg',
			     'https://farm8.staticflickr.com/7149/6610116099_89446a4c32_b.jpg',
			     'https://farm8.staticflickr.com/7164/6547275185_1fbbe58fe0_b.jpg',
			     'https://farm8.staticflickr.com/7011/6465210617_0a502f7012_b.jpg',
			     'https://farm7.staticflickr.com/6098/6356241409_737888b155_b.jpg',
			     'https://farm7.staticflickr.com/6046/6328598530_5d72b2f2d4_b.jpg',
			     'https://farm7.staticflickr.com/6059/6328598110_0c39ef6ae2_b.jpg',
			     'https://farm7.staticflickr.com/6232/6327052004_53c8b24a7b_b.jpg' ] };

			// flickr.get("photos.search", {"text": text, "extras": "url_l"}, function(result){

				// result.photos.photo.forEach(function(photo) {

				// 	if (photo.url_l) {

				// 		output['photos'].push(photo.url_l);

				// 	}

				// });

				if (output['photos'].length === 0) {

					next(new Error('No Flickr photos found.'));
					return;

				}

		        res.render('art', {output: JSON.stringify(output)});

				// res.send(output);

			// });

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

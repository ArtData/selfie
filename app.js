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

			data.image.image_url = '/2012.154_01_A02.jpg';

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

			if (artworkId == 22031) {

				output = {"title":"No. 14, 1960","artist":"Mark Rothko","photos":["https://farm3.staticflickr.com/2944/15343214066_c091b8bc64_b.jpg","https://farm3.staticflickr.com/2903/14827025764_56e84eae8c_b.jpg","https://farm8.staticflickr.com/7373/11569615425_ac98fb6cc9_b.jpg","https://farm4.staticflickr.com/3749/8941074193_18401d1269_b.jpg","https://farm6.staticflickr.com/5444/8932107582_538230785d_b.jpg","https://farm8.staticflickr.com/7363/8924227278_d4cda2a287_b.jpg","https://farm9.staticflickr.com/8268/8923599113_be20e85579_b.jpg","https://farm9.staticflickr.com/8124/8923593647_061c6f1ca4_b.jpg","https://farm3.staticflickr.com/2810/8856394848_414379a7d2_b.jpg","https://farm9.staticflickr.com/8250/8617758623_a4461dc3e2_b.jpg","https://farm9.staticflickr.com/8467/8411916871_2de806b209_b.jpg","https://farm9.staticflickr.com/8202/8248545275_001369d0f5_b.jpg","https://farm9.staticflickr.com/8312/8064194673_4265e9edc8_b.jpg","https://farm8.staticflickr.com/7265/7612642640_eaac8a20e5_b.jpg","https://farm8.staticflickr.com/7222/7343751502_67980f01fd_b.jpg","https://farm8.staticflickr.com/7185/6993029191_2377d38172_b.jpg","https://farm8.staticflickr.com/7168/6722582561_20cf6a8f30_b.jpg","https://farm8.staticflickr.com/7029/6693078961_8069ecb709_b.jpg","https://farm8.staticflickr.com/7020/6625112381_698546bc0b_b.jpg","https://farm7.staticflickr.com/6154/6192335226_14c51ce106_b.jpg","https://farm7.staticflickr.com/6152/6164537960_f1edd901a5_b.jpg","https://farm7.staticflickr.com/6001/5980497457_0a3ffd2095_b.jpg","https://farm7.staticflickr.com/6012/5980498343_b39fe7eb6d_b.jpg","https://farm7.staticflickr.com/6007/5939494293_b9a39fb57c_b.jpg","https://farm4.staticflickr.com/3269/5731907659_6913a77786_b.jpg","https://farm6.staticflickr.com/5050/5287976459_f363af8edd_b.jpg","https://farm6.staticflickr.com/5045/5288572982_3b9760d27d_b.jpg","https://farm5.staticflickr.com/4084/5087354259_ccee6b1a95_b.jpg","https://farm5.staticflickr.com/4064/4452399015_3dd40769b1_b.jpg","https://farm5.staticflickr.com/4022/4452403181_fc76939864_b.jpg","https://farm5.staticflickr.com/4020/4453176386_c2398df2ed_b.jpg","https://farm3.staticflickr.com/2455/3881394861_83aa242ebd_b.jpg","https://farm4.staticflickr.com/3418/3881395055_4ca850634e_b.jpg","https://farm3.staticflickr.com/2597/3737280213_d842da7810_b.jpg","https://farm4.staticflickr.com/3427/3244804327_51b1f8cf55_b.jpg","https://farm4.staticflickr.com/3158/3086586398_217f29b944_b.jpg","https://farm4.staticflickr.com/3260/2909321756_c69e00b471_b.jpg","https://farm1.staticflickr.com/129/399456230_78c94870a0_b.jpg","https://farm1.staticflickr.com/21/24481687_e850177469_b.jpg"],"sfmoma_image_url":"https://api.sfmoma.org/images/97.524_01_b04.jpg"};

			}

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

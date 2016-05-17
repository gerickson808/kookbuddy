var router = require('express').Router();
module.exports = router;
var http = require('http');
var path = require('path');
var API_KEY = require(path.join(__dirname, '../../../env')).API_KEY;

router.get('/:spotId', function(req, res, next){
	// http.get('http://magicseaweed.com/api/'+API_KEY+'/forecast/?spot_id=10', function(error, response){
	// 	if(error) console.log("There was an error");
	// 	res.send(response)
	// });
	var options = {
		hostname:'magicseaweed.com',
		path:'/api/'+API_KEY+'/forecast/?spot_id='+req.params.spotId,

	};
	http.get(options,function(response){
		var data = "";
		response.on('data', chunk => {
			data += chunk.toString();
		})
		.on('error', function(){
			res.sendStatus("500");
		})
		.on('end', () => {
			res.send(data);
		});
	});
});
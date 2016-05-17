var router = require('express').Router();
var cheerio = require('cheerio');
var bluebird = require('bluebird');
var request = require('request');
var http = require('http');
module.exports = router;


router.get('/', function(req, res, next){
	var urlBase = 'http://magicseaweed.com';
	var spots = [{name: 'Kailua', url:'/Kailua-Surf-Guide/671', id:'671'}];
	parsePage(spots, urlBase, spots[0].url)
	.then(finalSpots => {
		spots = spots.concat(finalSpots);
	});
});

function assocArrayToArray(obj){
	let arr = [];
	for(var key in obj){
		if(!isNaN(Number(key))){
			arr[Number(key)] = obj[key];
		}
	}
	return arr;
}

function parsePage(spots, urlBase, pageUrl){
	return new Promise(function(resolve, reject){
		request(urlBase + pageUrl, function(err,response,html){
			if(!err){
				var $ = cheerio.load(html);
				var links = assocArrayToArray($('#spots').find('a'));
				Promise.all(links.map(function(link){
					let spot = {};
					spot.name = link.attribs.title.split(' ').filter(e=> e != 'Surf' && e!= 'Guide').join(" ");
					spot.url = link.attribs.href;
					spot.id = spot.url.split("/")[2];

					let exists = spots.filter(e => e.name == spot.name);
					if(!exists.length){
						spots.push(spot);
						return parsePage(spots, urlBase, spot.url);
					}
					else return;
				}))
				.then(function(result){
					resolve(spots);
				});
			}
			else{
				console.log('Error running scraper: ', err);
				reject(err);
			}
		});
		return spots;
	});
}
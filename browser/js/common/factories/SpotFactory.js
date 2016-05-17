app.factory('SpotFactory', function($http){

var factory = {
	getSpot: function(spotId){
		return $http.get('/api/spots/'+spotId)
		.then(function(response){
			console.log("response", response);
			console.log(".data", response.data);
			return response.data;
		});
	}
};

return factory;

});
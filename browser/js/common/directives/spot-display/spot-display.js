app.directive('spotDisplay', function(SpotFactory){
	return {
		restrict:'E',
		scope:{
			spotId:'=',
		},
		templateUrl:'js/common/directives/spot-display/spot-display.html',
		link: function(scope){
				SpotFactory.getSpot(scope.spotId)
				.then(spotInfo => {
					scope.spotInfo = spotInfo;
				});
		}
	};
});
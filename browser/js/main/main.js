app.config(function ($stateProvider) {
    $stateProvider.state('main', {
        url: '/',
        templateUrl: 'js/main/main.html',
        controller: function($http, $scope){
        	$scope.runScraper = function(){
        		$http.get('/api/scraper')
        		.then(console.log);
        	};
        	console.log("YO",$scope.runScraper);
        }
    });
});
// controller apunta a app
// $scope -> variable intermediaria entre el js y el front
app.controller('categorie', ['$scope', 'productModel', function ($scope, productModel) {
	productModel.searchApi().then(function (data) {

		$scope.categories = data.children_categories;

		for (var i = 0; i < $scope.categories.length; i++) {
			productModel.findDetails($scope.categories[i].id).then(function (detailData) {
				$scope.categories[detailData.id] = new Array();
				$scope.categories[detailData.id] = detailData;

				productModel.find(detailData.name).then(function (subData) {
					$scope.categories[detailData.id]['list'] = new Array();
					$scope.categories[detailData.id]['list'] = subData;
					console.log(subData.results);
				});
			});
		}
		console.log($scope.categories);
	});

	$scope.viewProduct = function( cat, pId ){
		
		var productChoose = $scope.categories[ cat.id ].list.results[ pId ];
		$scope.modalImg = productChoose.thumbnail;
		$scope.modalTitle = productChoose.title;
		$scope.modalPrice = productChoose.price;
		$scope.modalCurrency = productChoose.currency_id;
		$scope.modalCondition = productChoose.condition;
		$scope.modalQuantity = productChoose.available_quantity;
		console.log( productChoose );

	}

}]);
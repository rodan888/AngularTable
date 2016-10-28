angular.module('MyApp')
	.controller('tableCtrl', ['$scope', '$filter', 'dataService', tableCtrl]);	
		function tableCtrl($scope, $filter, dataService) {
				// init
				$scope.sortingOrder = 'name';
				$scope.reverse = false;
				$scope.filteredItems = [];
				$scope.groupedItems = [];
				$scope.itemsPerPage = 5;
				$scope.pagedItems = [];
				$scope.currentPage = 0;	

				var searchMatch = function (item, query) {					
							if (!query) {
									return true;
							}										
							return item.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1;
					},
					editRow = function(id,name,price,quantity){
						this.id = id;
						this.name = name;
						this.price = price;
						this.quantity = quantity;
					};

				dataService.getData('table.json')
					.then(function (response) {
						$scope.items = response.data;						
						$scope.search();				
					}, function (error) {
						console.log(error)
				});

				$scope.search = function () {
						$scope.filteredItems = $filter('filter')($scope.items, function (item) {
								for(var attr in item) {
									if (searchMatch(item[attr], $scope.query))
												return true;
								}
								return false;
						});						
						if ($scope.sortingOrder !== '') {
								$scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sortingOrder, $scope.reverse);
						}
						$scope.currentPage = 0;						
						$scope.groupToPages();
				};

				$scope.editItem = function(ind, item){
					$scope.editRow = new editRow(item.id, item.name, item.price, item.quantity)
					$scope.index = ind;
					$scope.popup = true;					
				};				
				$scope.saveRow = function(){
					$scope.items[$scope.index] = $scope.editRow;
					$scope.search();
				};				
				$scope.groupToPages = function () {
						$scope.pagedItems = [];						
						for (var i = 0; i < $scope.filteredItems.length; i++) {
								if (i % $scope.itemsPerPage === 0) {
										$scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
								} else {
										$scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
								}
						}
				};				
				$scope.range = function (start, end) {
						var ret = [];
						if (!end) {
								end = start;
								start = 0;
						}
						for (var i = start; i < end; i++) {
								ret.push(i);
						}
						return ret;
				};				
				$scope.prevPage = function () {
						if ($scope.currentPage > 0) {
								$scope.currentPage--;
						}
				};				
				$scope.nextPage = function () {
						if ($scope.currentPage < $scope.pagedItems.length - 1) {
								$scope.currentPage++;
						}
				};				
				$scope.setPage = function () {
						$scope.currentPage = this.n;
				};
				$scope.sort_by = function(newSortingOrder) {
						if ($scope.sortingOrder == newSortingOrder)
								$scope.reverse = !$scope.reverse;
						$scope.sortingOrder = newSortingOrder;
			};
		};
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

				dataService.getData('table.json')
					.then(function (response) {
						$scope.items = response.data;						
						$scope.search();				
					}, function (error) {
						console.log(error)
				});

				var searchMatch = function (item, query) {					
						if (!query) {
								return true;
						}										
						return item.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1;
				};

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
					$scope.items[ind] = item;
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

						// icon setup
						// $('th i').each(function(){
						// 		// icon reset
						// 		$(this).removeClass().addClass('icon-sort');
						// });
						// if ($scope.reverse)
						// 		$('th.'+new_sorting_order+' i').removeClass().addClass('icon-chevron-up');
						// else
						// 		$('th.'+new_sorting_order+' i').removeClass().addClass('icon-chevron-down');
				};
		};
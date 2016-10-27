(function(){
	angular
		.module('MyApp')
		.service('dataService', ['$http', function ($http) {
			this.getData = function (urlBase) {
				return $http.get(urlBase);
			};
			this.getDataItem = function (urlBase, id) {
				return $http.get(urlBase + '/' + id);
			};
			this.insertData = function (urlBase, cust) {
				return $http.post(urlBase, cust);
			};
			this.updateData = function (urlBase, cust) {
				return $http.put(urlBase + '/' + cust.id, cust)
			};
			this.deleteData = function (urlBase, id) {
				return $http.delete(urlBase + '/' + id);
			};			
		}])
}());
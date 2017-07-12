(function() {
  angular.module('loc8rApp')
    .factory('AboutService', ['$http', '$q', function($http, $q) {

      var httpAsPromise = function(options) {
        var deferred = $q.defer();
        $http(options).
        success(function(response, status, headers, config) {
            deferred.resolve(response);
          })
          .error(function(response, status, headers, config) {
            deferred.reject(response);
          });
        return deferred.promise;
      };

      function getReiviews() {
        return httpAsPromise({
          method: 'GET',
          url: '/api/locations/59663efe2fe8af4c2826f7e6'
        });
      }

      function getLocation(locationId) {
        // 59663efe2fe8af4c2826f7e6
        var deferred = $q.defer();
        $http.get('/api/locations/' + locationId).then(function(res) {
          deferred.resolve(res.data);
        }, function(err) {
          deferred.reject(err);
        });
        return deferred.promise;
      }

      return {
        getReiviews: getReiviews,
        getLocation: getLocation
      };
    }]);
})();

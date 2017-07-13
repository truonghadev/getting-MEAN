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
          url: '/api/locations/595f4fbb2e61088a9a009288',
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTY2ZTljODYxNjc1NTc4MmViZDZhZjUiLCJlbWFpbCI6InRydW9uZy5oYS5kZXZAZ21haWwuY29tIiwibmFtZSI6IlRydW9uZyBIYSIsImV4cCI6MTUwMDUzMjc5NCwiaWF0IjoxNDk5OTI3OTk0fQ.RUo6ZEeXQdhGqdq4uFjlXS13LSTAdcTe_Xo_u7D8R4o'
          }
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

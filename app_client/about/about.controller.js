(function() {
  angular.module('loc8rApp')
    .controller('AboutController', ['$scope', 'AboutService', function($scope, AboutService) {
      $scope.data = {
        title: 'About Loc8r',
        content: 'Loc8r was created to help people find places to sit down and get a bit of work done.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed lorem ac nisi dignissim accumsan. Nullam sit amet interdum magna. Morbi quis faucibus nisi. Vestibulum mollis purus quis eros adipiscing tristique. Proin posuere semper tellus, id placerat augue dapibus ornare. Aenean leo metus, tempus in nisl eget, accumsan interdum dui. Pellentesque sollicitudin volutpat ullamcorper.\n\nSuspendisse tincidunt, lectus non suscipit pharetra, purus ipsum vehicula sapien, a volutpat mauris ligula vel dui. Proin varius interdum elit, eu porttitor quam consequat et. Quisque vitae felis sed ante fringilla fermentum in vitae sem. Quisque fermentum metus at neque sagittis imperdiet. Phasellus non laoreet massa, eu laoreet nibh. Pellentesque vel magna vulputate, porta augue vel, dapibus nisl. Phasellus aliquet nibh nec nunc posuere fringilla. Quisque sit amet dignissim erat. Nulla facilisi. Donec in sollicitudin ante. Cras rhoncus accumsan rutrum. Sed aliquet ligula dui, eget laoreet turpis tempor vitae.'
      };
      AboutService.getReiviews().then(function(res) {
        console.log(res);
      });
      AboutService.getLocation('59663efe2fe8af4c2826f7e6').then(function(res) {
        console.log('getLocation', res);
      });
    }]);
})();

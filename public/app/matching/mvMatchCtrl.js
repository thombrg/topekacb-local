angular.module('app').controller('mvMatchCtrl', ['$scope', '$filter', 'mvNotifier', 'Adopter',
function($scope, $filter, mvNotifier, Adopter, adoptee) {
  $scope.template = {
    adopterMatchUrl: '/partials/matching/adopter-match',
    adopteeListUrl: '/partials/adopters/adoptee-list'
  };
	$scope.adopterSearchResults = [];
  $scope.adopteeSearchResults = [];
  $scope.currentAdopter;
  $scope.currentAdoptee;
  $scope.ageRanges = ["0-7", "8-12", "13-18"];
  $scope.adopteeEnums;
  $scope.adopteeAges = [];

	$scope.applyPage = function(page, data, pageInfo) {
      pageInfo.current = page;
      if(data && data.totalCount) {
      	pageInfo.total = Math.ceil(data.totalCount / pageInfo.size);
      }
      pageInfo.previous = page > 1 ? page - 1 : page;
      pageInfo.next = page < pageInfo.total ? page + 1 : page;

   };

	$scope.getAdopterPage = function(page) {
		$scope.adopterPage.current = page;
		$scope.searchAdopters();
	};

  $scope.selectAdopter = function(adopter){
    $scope.adopter = Adopter.get({ _id: adopter._id });
    $scope.adopter.$promise.
      then(function(data) {
        $scope.adoptees = data.adoptees;
      });
    $scope.searchAdoptees(adopter.criteria);
  };

  $scope.getAdopteePage = function(page) {
      $scope.adopteePage.current = page;
      if ($scope.currentAdopter) {
          $scope.searchAdoptees($scope.currentAdopter.criteria);
      }
  };

  $scope.selectAdoptee = function(selectedAdoptee) {
      $scope.currentAdoptee = selectedAdoptee;
      $scope.adopteeAges = [];
      selectedAdoptee.householdMembers.forEach(function(member){
          if (member.age < 8 && $scope.adopteeAges.indexOf($scope.ageRanges[0]) == -1){
              $scope.adopteeAges.push($scope.ageRanges[0]);
          }
          if (member.age > 7 && member.age < 13 && $scope.adopteeAges.indexOf($scope.ageRanges[1]) == -1) {
              $scope.adopteeAges.push($scope.ageRanges[1]);
          }
          if (member.age > 12 && member.age < 19 && $scope.adopteeAges.indexOf($scope.ageRanges[2]) == -1){
              $scope.adopteeAges.push($scope.ageRanges[2]);
          }
      });
      console.log($scope.adopteeAges);
  };

  $scope.selectAdopter = function(adopter){
      $scope.currentAdopter = adopter;
      $scope.searchAdoptees(adopter.criteria);
  }
    
}]);
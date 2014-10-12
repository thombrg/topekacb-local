angular.module('app').factory('adoptee', function($resource, $q) {
  var AdopteeResource = $resource('/api/adoptees/:_id', {_id: "@id"}, {
      updateAdoptee: {
          method:'PUT',
          isArray:false
      },
      enums : {
          method : 'GET',
          url : '/api/adoptees/:_id/enums',
          isArray : false
      }
  });

  return AdopteeResource;
});
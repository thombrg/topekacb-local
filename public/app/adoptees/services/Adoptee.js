angular.module('app').factory('Adoptee', function($resource, $q) {
  var AdopteeResource = $resource('/api/adoptees/:_id', {_id: "@id"}, {
      updateAdoptee: {
          method:'PUT',
          isArray:false
      },
      query : {
          method : 'GET',
          isArray : false
      },
      enums : {
          method : 'GET',
          url : '/api/adoptees/:_id/enums',
          isArray : false
      }
  });

  return AdopteeResource;
});
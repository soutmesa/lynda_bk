angular.module('lynda_bk')
.factory('bkFactory', ['$http', function($http){
  var factory = {};
  var url = '/lynda_bk/api.php?act=';
  factory.getCategories = function(successCallback){
    $http.get(url + 'get_categories')
      .success(function(result) {
        successCallback(result);
      })
      .error(function(data,status){
        console.log(data);
      });
    }
    factory.getCourses = function(limit, offset, successCallback){
      $('.pace').removeClass('pace-inactive');
      $http.get(url + 'get_courses&limit=' + limit + '&offset=' + offset)
        .success(function(result){
          successCallback(result);
          $('.pace').addClass('pace-inactive');
        })
        .error(function(data, status){
          console.log(data);
        })
    }
    factory.show = function(id, successCallback){
      $('.pace').removeClass('pace-inactive');
      $http.get(url + 'get_course&id=' + id)
      .success(function(resopne) {
        successCallback(resopne);
        $('.pace').addClass('pace-inactive');
      })
      .error(function(resopne){
        console.log(resopne);
      })
    }
    factory.search = function(key, id, limit, offset, successCallback){
      $('.pace').removeClass('pace-inactive');
      $http.get(url + 'search&key=' + key + '&limit=' + limit + '&offset=' + offset + '&id=' + id )
      .success(function(resopne) {
        successCallback(resopne);
        $('.pace').addClass('pace-inactive');
      })
      .error(function(resopne){
        console.log(resopne);
      })
    }
    factory.getSearchLength = function(key, id, successCallback){
      $http.get(url + 'search_length&key=' + key + '&id=' + id)
      .success(function(result){
        successCallback(result);
      })
      .error(function(data, status){
        console.log(data);
      })
    }
  return factory;
}]);

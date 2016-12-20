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
    factory.getCourses = function(successCallback){
      $('.pace').removeClass('pace-inactive');
      $http.get(url + 'get_courses')
        .success(function(result){
          successCallback(result);
          $('.pace').addClass('pace-inactive');
        })
        .error(function(data, status){
          console.log(data);
        })
    }
    factory.show = function(name, successCallback){
      $('.pace').removeClass('pace-inactive');
      $http.get(url + 'get_course&name=' + name)
      .success(function(resopne) {
        successCallback(resopne);
        $('.pace').addClass('pace-inactive');
      })
      .error(function(resopne){
        console.log(resopne);
      })
    }
    factory.search = function(key, id, successCallback){
      $('.pace').removeClass('pace-inactive');
      $http.get(url + 'search&key=' + key + '&id=' + id )
      .success(function(resopne) {
        successCallback(resopne);
        $('.pace').addClass('pace-inactive');
      })
      .error(function(resopne){
        console.log(resopne);
      })
    }
  return factory;
}]);

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
    // service implementation
    factory.GetPager = function(totalItems, currentPage, pageSize) {
      // default to first page
      currentPage = currentPage || 1;
      // default page size is 10
      pageSize = pageSize || 10;
      // calculate total pages
      var totalPages = Math.ceil(totalItems / pageSize);
      var startPage, endPage;
      if (totalPages <= 10) {
        // less than 10 total pages so show all
        startPage = 1;
        endPage = totalPages;
      } else {
        // more than 10 total pages so calculate start and end pages
        if (currentPage <= 6) {
          startPage = 1;
          endPage = 10;
        } else if (currentPage + 4 >= totalPages) {
          startPage = totalPages - 9;
          endPage = totalPages;
        } else {
          startPage = currentPage - 5;
          endPage = currentPage + 4;
        }
      }
      // calculate start and end item indexes
      var startIndex = (currentPage - 1) * pageSize;
      var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
      // create an array of pages to ng-repeat in the pager control
      var pages = _.range(startPage, endPage + 1);
      // return object with all pager properties required by the view
      return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
      };
    }
  return factory;
}]);

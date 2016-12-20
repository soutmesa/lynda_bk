angular.module('lynda_bk', ['ui.router', 'angularUtils.directives.dirPagination'])
// Routes
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){

  $locationProvider.html5Mode(false);
	$urlRouterProvider.otherwise("/");
	$stateProvider
    .state('home', {
      url: "/",
      templateUrl: "views/home.html",
      controller: 'homeController'
    })
    .state('search',{
      url: '/search=:s&id=:id',
      templateUrl: 'views/results.html',
      controller: 'searchController'
    })
    .state('show',{
      url: '/c_name=:name',
      templateUrl: 'views/single.html',
      controller: 'singleController'
    })
    .state('404', {
      url: '/404',
      templateUrl: 'views/404.html'
    })
}])

// .directive("dirPaginationControls", function(){
//   return {
//     template: 'directives/dirPagination.tpl.html'
//   };
// })

// Controller
.controller('homeController',['$scope', '$http', 'bkFactory', '$stateParams', function($scope, $http, bkFactory, $stateParams){

	$scope.categories = {};
  $scope.courses = {};
	$scope.currentPage = 1;
  $scope.pageSize = 50;
  $scope.num = $stateParams.num;
  $scope.defaultSelected = 0;

  init();

  function init() {
    bkFactory.getCategories(renderCategories);
    bkFactory.getCourses(renderCourses);
  }

  function renderCategories(result) {
    $scope.categories = result;
    $scope.defaultSelected = $scope.categories[0].id;
  }

  function renderCourses(result){
    $scope.courses = result;
  }

}])

.controller('singleController',['$scope', '$http', 'bkFactory', '$stateParams', '$location', function($scope, $http, bkFactory, $stateParams, $location){

  $scope.id = $stateParams.ind;
  $scope.name = $stateParams.name;
  $scope.course = {};
  $scope.videos = {};
  $scope.ind = 0;
  init();
  function init() {
    bkFactory.show($scope.name, renderCourse);
  }
  function renderCourse(result){
    $scope.course = result;
    console.log($scope.course.length);
    if($scope.course.length===0){
      $location.path('/404');
    }
  }

  $scope.prepareTitle = function(title){
    return title.replace(/[0-9]+|\s{2}|\.mp4|\-/ig,"");
  }

}])

.controller('searchController',['$scope', '$http', 'bkFactory', '$stateParams', function($scope, $http, bkFactory, $stateParams){

  $scope.key = '';
  $scope.results = {};
  $scope.currentPage = 1;
  $scope.pageSize = 50;
  $scope.id = 0;

  if (angular.isDefined($stateParams.id)){
    $scope.id = $stateParams.id;
  }

  if (angular.isDefined($stateParams.s)){
    $scope.key = $stateParams.s;
  }

  init();

  function init() {
    bkFactory.search($scope.key, $scope.id, renderResults);
  }

  function renderResults(result){
    $scope.results = result;
    $scope.leng = $scope.results.length;
  }

}])

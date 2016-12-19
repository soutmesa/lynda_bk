angular.module('lynda_bk', ['ui.router'])
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
      url: '/search=:s&id=:ind',
      templateUrl: 'views/results.html',
      controller: 'searchController'
    })
    .state('show',{
      url: '/:name&course_id=:ind',
      templateUrl: 'views/single.html',
      controller: 'singleController'
    })
    .state('404', {
      url: '/404',
      templateUrl: 'views/404.html'
    })
}])

// Controller
.controller('homeController',['$scope', '$http', 'bkFactory', '$stateParams', function($scope, $http, bkFactory, $stateParams){

	$scope.categories = {};
  $scope.courses = {};
	$scope.offset = 0;
  $scope.limit = 5;
  $scope.num = $stateParams.num;

  init();
  function init() {
    bkFactory.getCategories(renderCategories);
    bkFactory.getCourses($scope.limit, $scope.offset, renderCourses);
  }
  function renderCategories(result) {
    $scope.categories = result;
    $scope.defaultSelected = $scope.categories[0].id;
  }
  function renderCourses(result){
    $scope.courses = result;
    // console.log($scope.courses );
    if ($scope.offset <= 0) {
      $('.pager li:first-child').addClass('disabled');
      $('.pager li:first-child a').attr('ng-click', '');
      $('.pager li:last-child').addClass('enable');
    }else {
      $('.pager li:first-child').removeClass('disabled');
      $('.pager li:first-child').addClass('enable');
    }
    if ($scope.courses.length < $scope.limit) {
      $('.pager li:last-child').addClass('disabled');
      $('.pager li:first-child').addClass('enable');
    }
  }

  $scope.nextPage = function(){
    $scope.offset += $scope.limit;
    bkFactory.getCourses($scope.limit, $scope.offset, renderCourses);
    console.log($scope.offset);
  }

  $scope.previousPage = function(){
    if($scope.offset > 0){
      $scope.offset -= $scope.limit;
      bkFactory.getCourses($scope.limit, $scope.offset, renderCourses);
      console.log($scope.offset);
    }
  }

}])

.controller('singleController',['$scope', '$http', 'bkFactory', '$stateParams', function($scope, $http, bkFactory, $stateParams){

  $scope.id = $stateParams.ind;
  $scope.course = {};
  $scope.videos = {};
  $scope.ind = 0;
  init();
  function init() {
    bkFactory.show($scope.id, renderCourse);
  }
  function renderCourse(result){
    $scope.course = result;
    // console.log($scope.course);
  }

  $scope.prepareTitle = function(title){
    return title.replace(/[0-9]+|\s{2}|\.mp4|\-/ig,"");
  }

}])

.controller('searchController',['$scope', '$http', 'bkFactory', '$stateParams', function($scope, $http, bkFactory, $stateParams){
  $scope.key = '';
  $scope.results = {};
  $scope.offset = 0;
  $scope.limit = 5;
  $scope.id = 0;
  if (angular.isDefined($stateParams.id)){
    $scope.id = $stateParams.id;
  }
  if (angular.isDefined($stateParams.s)){
    $scope.key = $stateParams.s;
  }
  init();
  function init() {
    bkFactory.getSearchLength($scope.key, $scope.id, renderLength);
    bkFactory.search($scope.key, $scope.id, $scope.limit, $scope.offset, renderResults);
  }
  function renderLength(leng){
    $scope.leng = leng[0].leng;
  }
  function renderResults(result){
    $scope.results = result;
    if ($scope.offset <= 0) {
      $('.pager li:first-child').addClass('disabled');
      $('.pager li:last-child').addClass('enable');
    }
    if ($scope.results.length < $scope.limit) {
      $('.pager li:last-child').addClass('disabled');
      $('.pager li:first-child').addClass('enable');
    }
  }

  $scope.nextPage = function(){
    $scope.offset += 10;
    bkFactory.search($scope.key, $scope.id, $scope.limit, $scope.offset, renderResults);
  }
  $scope.previousPage = function(){
    if($scope.offset > 0){
      $scope.offset -= 10;
      bkFactory.search($scope.key, $scope.id, $scope.limit, $scope.offset, renderResults);
    }
  }

}])

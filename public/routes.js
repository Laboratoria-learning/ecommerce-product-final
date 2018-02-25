angular.module('appLab', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '../app/views/home.html'
      })
      .when('/productos', {
        templateUrl: '../app/views/products.html'
      })
      .otherwise({ redirectTo: '/' })
  })
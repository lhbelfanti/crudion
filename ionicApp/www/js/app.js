// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'ionicApp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'ionicApp.services' is found in services.js
// 'ionicApp.controllers' is found in controllers.js
angular.module('ionicApp', ['ionic', 'ionicApp.services', 'ionicApp.controllers'])

    .config(function($stateProvider, $urlRouterProvider) {

      $stateProvider
          .state('menu', {
              url: "/menu",
              abstract: true,
              templateUrl: "templates/sideMenu.html"
          })
          .state('menu.home', {
              url: "/home",
              views: {
                  'menuContent': {
                      templateUrl: "templates/home.html",
                      controller: 'HomeController'
                  }
              }
          })
          .state('menu.movieDescription', {
              url: "/movieDescription",
              views: {
                  'menuContent': {
                      templateUrl: "templates/movieDescription.html",
                      controller: 'MovieDescriptionController'
                  }
              }
          })
          .state('menu.add', {
              url: "/add",
              views: {
                  'menuContent' :{
                      templateUrl: "templates/add.html",
                      controller: "AddController"
                  }
              }
          })
          .state('menu.modify', {
              url: "/modify",
              views: {
                  'menuContent' :{
                      templateUrl: "templates/modify.html",
                      controller: "ModifyController"
                  }
              }
          })
          .state('menu.delete', {
              url: "/delete",
              views: {
                  'menuContent' :{
                      templateUrl: "templates/delete.html",
                      controller: "DeleteController"
                  }
              }
          });

      $urlRouterProvider.otherwise("/menu/home");

    });


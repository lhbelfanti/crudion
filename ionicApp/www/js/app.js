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
              url: "/action",
              abstract: true,
              templateUrl: "actions/sideMenu.html"
          })
          .state('menu.home', {
              url: "/home",
              views: {
                  'menuContent': {
                      templateUrl: "actions/home.html",
                      controller: 'HomeController'
                  }
              }
          })
          .state('menu.add', {
              url: "/add",
              views: {
                  'menuContent' :{
                      templateUrl: "actions/add.html",
                      controller: "AddController"
                  }
              }
          })
          .state('menu.modify', {
              url: "/modify",
              views: {
                  'menuContent' :{
                      templateUrl: "actions/modify.html",
                      controller: "ModifyController"
                  }
              }
          })
          .state('menu.delete', {
              url: "/delete",
              views: {
                  'menuContent' :{
                      templateUrl: "actions/delete.html",
                      controller: "DeleteController"
                  }
              }
          });

      $urlRouterProvider.otherwise("/action/home");

    });


/**
 * Example application for ng-autocomplete (https://github.com/ianwalter/ng-autocomplete)
 *
 * @author Ian Kennington Walter <iankwalter@fastmail.com>
 */
requirejs.config({
  baseUrl: '.',
  paths: {
    'angular': [
      '//ajax.googleapis.com/ajax/libs/angularjs/1.4.1/angular.min',
      'public/lib/angular/angular'
    ],
    'angular-route': [
      '//ajax.googleapis.com/ajax/libs/angularjs/1.4.1/angular-route.min',
      'public/lib/angular-route/angular-route.min'
    ],
    'angular-resource': [
      '//ajax.googleapis.com/ajax/libs/angularjs/1.4.1/angular-resource.min',
      'public/lib/angular-resource/angular-resource.min'
    ],
    'ng-dropdown': [
      'public/lib/ng-dropdown/dist/js/ng-dropdown'
    ],
    'ng-suggestion': [
      'dist/js/ng-suggestion'
    ]
  },
  shim: {
    'angular' : { 'exports': 'angular' },
    'angular-route': { deps: ['angular'] },
    'angular-resource': { deps: ['angular'] },
    'ng-dropdown': { deps: ['angular'] },
    'ng-suggestion': { deps: ['angular'] }
  }
});

require(
  [
    'angular',
    'angular-route',
    'angular-resource',
    'ng-dropdown',
    'ng-suggestion'
  ],
  function(angular) {
    'use strict';

    angular
      .module('ng-suggestion-demo', ['ngRoute', 'ngResource', 'ng-suggestion'])
      .config(['$routeProvider', function($routeProvider) {
        $routeProvider
          .when('/', { controller: 'HomeController',
            templateUrl: 'public/template/home.html', label: 'Home'
          })
          .otherwise({ redirectTo: '/' });
      }])
      .controller('HomeController', [
        '$scope',
        'SuggestionService',
        function($scope, SuggestionService) {
          $scope.suggestionService = SuggestionService;
          $scope.toJson = function(obj) {
            return JSON.stringify(obj);
          };

          $scope.one = {
            url: 'http://www.omdbapi.com/'
          };
        }
      ]);

    angular.bootstrap(document , ['ng-suggestion-demo']);
  }
);

/**
 * ng-suggestion - v1.0.0 -Flexible AngularJS typeahead / autocomplete /
 * suggestion / UFO search directive
 *
 * @author Ian Kennington Walter <ianwalter@fastmail.com>
 */
(function(angular) {
  'use strict';

  angular
    .module('ng-suggestion', ['ng-dropdown'])
    .service('SuggestionService', function() {})
    .directive('suggestion', [
      '$resource',
      'SuggestionService',
      function($resource, SuggestionService) {
        return {
          restrict: 'A',
          scope: {
            suggestion: '=',
            suggestionModel: '=',
            suggestionUrl: '=',
            suggestionParams: '='
          },
          link: function($scope, $element, attrs) {
            var resource = $resource($scope.suggestionUrl);

            function responseHandler(response) {
              if (response) {
                $scope.oldParams = $scope.suggestionParams;
                SuggestionService.showOptions = true;
                if (attrs.suggestionResponseProperty) {
                  SuggestionService.options =
                    response[attrs.suggestionResponseProperty];
                } else {
                  SuggestionService.options = response;
                }
              }
            }

            $element.bind('keyup', function() {
              if (!$scope.suggestionModel) {
                SuggestionService.showOptions = false;
              } else if ($scope.oldParams !== $scope.suggestionParams) {
                if (attrs.suggestionResponseProperty) {
                  resource.get($scope.suggestionParams, responseHandler);
                } else {
                  resource.query($scope.suggestionParams, responseHandler);
                }
              }
            });
          }
        };
      }
    ]);
})(window.angular);

/**
 * ng-suggestion - v1.0.0 - Flexible AngularJS typeahead / autocomplete /
 * suggestion / UFO search directive
 *
 * @author Ian Kennington Walter <ianwalter@fastmail.com>
 */
(function(angular) {
  'use strict';

  angular
    .module('ng-suggestion', ['ng-dropdown'])
    .service('SuggestionService', [
      'DropdownService',
      function(DropdownService) {

        this.inputs = [];

        this.responseHandler = function(input) {
          return (response) => {
            input.loading = false;
            input.oldParams = input.params;
            if (response) {
              DropdownService.open(input.dropdown.id);
              if (input.responseProperty &&
                  response[input.responseProperty] &&
                  Array.isArray(response[input.responseProperty]) &&
                  response[input.responseProperty].length > 0) {
                input.options = response[input.responseProperty];
              } else if (Array.isArray(response) && response.length > 0) {
                input.options = response;
              } else {
                input.options = false;
              }
            } else {
              input.options = false;
            }
          };
        };

        this.keyUpHandler = function(input) {
          return ($event) => {
            if ($event.keyCode === 27 || $event.keyCode === 9) { // Esc or Tab
              DropdownService.close(input.dropdown.id);
            } else if (!input.model) {
              DropdownService.close(input.dropdown.id);
            } else if (input.oldParams !== input.params) {
              input.loading = true;
              if (input.responseProperty) {
                input.resource.get(input.params, this.responseHandler(input));
              } else {
                input.resource.query(input.params, this.responseHandler(input));
              }
            }
          };
        };

      }
    ])
    .directive('suggestion', [
      '$resource',
      'SuggestionService',
      function($resource, SuggestionService) {
        return {
          restrict: 'A',
          scope: {
            suggestion: '=?',
            model: '=suggestionModel',
            url: '=suggestionUrl',
            params: '=suggestionParams',
            dropdown: '=suggestionDropdown',
            responseProperty: '@?suggestionResponseProperty'
          },
          link: function($scope, $element) {
            var input = {
              id: SuggestionService.inputs.length,
              element: $element,
              resource: $resource($scope.url),
              responseProperty: $scope.responseProperty
            };

            $scope.suggestion = SuggestionService.inputs[input.id] = input;

            $scope.$watch('dropdown', function(dropdown) {
              input.dropdown = dropdown;
            });

            $scope.$watch('model', function(model) {
              input.model = model;
              delete SuggestionService.options;
            });

            $scope.$watch('params', function(params) {
              input.params = params;
            });

            $element.bind('keyup paste', SuggestionService.keyUpHandler(input));
          }
        };
      }
    ]);
})(window.angular);

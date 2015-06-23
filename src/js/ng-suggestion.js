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
            input.oldParams = input.params;
            if (response) {
              DropdownService.open(input.dropdown.id);
              if (input.responseProperty) {
                this.options = response[input.responseProperty];
              } else {
                this.options = response;
              }
            }
          };
        };

        this.keyUpHandler = function(input) {
          return () => {
            if (!input.model) {
              DropdownService.close(input.dropdown.id);
            } else if (input.oldParams !== input.params) {
              if (input.responseProperty) {
                input.resource.get(input.params, this.responseHandler(input));
              } else {
                input.resource.query(input.params, this.responseHandler(input));
              }
            }
          };
        };

        this.focusHandler = function(input) {
          return () => {
            if (input.model) {
              DropdownService.open(input.dropdown.id);
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
              resource: $resource($scope.url),
              responseProperty: $scope.responseProperty
            };

            $scope.suggestion = SuggestionService.inputs[input.id] = input;

            $scope.$watch('dropdown', function(dropdown) {
              input.dropdown = dropdown;
            });

            $scope.$watch('model', function(model) {
              input.model = model;
            });

            $scope.$watch('params', function(params) {
              input.params = params;
            });

            $element.bind('keyup', SuggestionService.keyUpHandler(input));

            $element.bind('focus', SuggestionService.focusHandler(input));
          }
        };
      }
    ]);
})(window.angular);

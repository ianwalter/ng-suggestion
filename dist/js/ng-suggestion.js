/**
 * ng-suggestion - v1.0.0 - Flexible AngularJS typeahead / autocomplete /
 * suggestion / UFO search directive
 *
 * @author Ian Kennington Walter <ianwalter@fastmail.com>
 */
'use strict';

(function (angular) {
  'use strict';

  angular.module('ng-suggestion', ['ng-dropdown']).service('SuggestionService', ['DropdownService', function (DropdownService) {

    this.inputs = [];

    this.responseHandler = function (input) {
      return function (response) {
        input.loading = false;
        input.oldParams = input.params;
        if (response) {
          DropdownService.open(input.dropdown.id);
          if (input.responseProperty && response[input.responseProperty] && Array.isArray(response[input.responseProperty]) && response[input.responseProperty].length > 0) {
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

    this.keyUpHandler = function (input) {
      var _this = this;

      return function ($event) {
        if ($event.keyCode === 8 || $event.keyCode === 46) {
          // Backspace
          if (input.deleteHandler) {
            // or Delete
            input.deleteHandler($event);
          }
        }

        if ($event.keyCode === 27) {
          // Esc or Tab
          input.element[0].blur();
        } else if (!input.model) {
          DropdownService.close(input.dropdown.id);
        } else if (input.oldParams !== input.params && [9, 27, 40, 38, 13].indexOf($event.keyCode) === -1) {
          input.loading = true;
          if (input.responseProperty) {
            input.resource.get(input.params, _this.responseHandler(input));
          } else {
            input.resource.query(input.params, _this.responseHandler(input));
          }
        }
      };
    };

    this.keydownHandler = function (input) {
      return function ($event) {
        var currentOption = input.dropdown.currentOption;
        if (currentOption && $event.keyCode === 13) {
          // Enter
          input.dropdown.disableClick = false;
        }
      };
    };

    this.focusHandler = function (input) {
      return function () {
        input.dropdown.disableClick = true;
        if (input.model) {
          DropdownService.open(input.dropdown.id);
        }
      };
    };

    this.blurHandler = function (input) {
      return function () {
        if (!input.dropdown.isInsideMenu) {
          DropdownService.close(input.dropdown.id);
        } else {
          input.dropdown.disableClick = false;
        }
      };
    };
  }]).directive('suggestion', ['$resource', 'SuggestionService', function ($resource, SuggestionService) {
    return {
      restrict: 'A',
      scope: {
        suggestion: '=?',
        model: '=suggestionModel',
        url: '=suggestionUrl',
        params: '=suggestionParams',
        dropdown: '=suggestionDropdown',
        deleteHandler: '=?suggestionDeleteHandler',
        responseProperty: '@?suggestionResponseProperty'
      },
      link: function link($scope, $element) {
        var input = {
          id: SuggestionService.inputs.length,
          element: $element,
          resource: $resource($scope.url),
          responseProperty: $scope.responseProperty,
          deleteHandler: $scope.deleteHandler
        },
            once = false;

        $scope.suggestion = SuggestionService.inputs[input.id] = input;

        $scope.$watch('dropdown', function (dropdown) {
          if (!once) {
            dropdown.disableDocumentClick = true;
            once = true;
          }
          input.dropdown = dropdown;
        });

        $scope.$watch('model', function (model) {
          input.model = model;
          delete SuggestionService.options;
        });

        $scope.$watch('params', function (params) {
          input.params = params;
        });

        $element.bind('keyup paste', SuggestionService.keyUpHandler(input));

        $element.bind('keydown', SuggestionService.keydownHandler(input));

        $element.bind('focus', SuggestionService.focusHandler(input));

        $element.bind('blur', SuggestionService.blurHandler(input));
      }
    };
  }]);
})(window.angular);
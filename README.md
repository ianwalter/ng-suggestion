# [ng-suggestion](https://github.com/flashnotes/ng-suggestion/)
*Flexible AngularJS typeahead / autocomplete / suggestion / predictive search directive*

#### Dependencies
* [ng-dropdown](https://github.com/flashnotes/ng-dropdown/)

#### Installing ng-suggestion

Install using Bower:  
```
bower install ng-suggestion --save
```

Include js/ng-suggestion.min.js in your app. You may also want to include
css/ng-suggestion.min.css, but it's not necessary, only recommended.

#### Setup for ng-suggestion

```javascript
var app = angular.module('myApp', ['ng-suggestion'])
```

#### Using ng-suggestion
```html
<input dropdown-field
       suggestion="courseService.courseLookup"
       suggestion-model="courseService.current.courseName"
       suggestion-dropdown="courseService.courseLookupDropdown"
       suggestion-url="courseService.courseLookupUrl"
       suggestion-params="{
         q: courseService.current.courseName,
         subject_id: courseService.current.subject.id
       }" />
```

```dropdown-field``` Needs Info

```suggestion``` Needs Info

```suggestion-model``` Needs Info

```suggestion-dropdown``` Needs Info

```suggestion-url``` The URL of the API that will return the list of suggestions.

```suggestion-delete-handler``` Needs Info

```suggestion-params``` The parameters to be used to query the identified API.

```suggestion-free-text``` (optional) Allows the selection of items that are not in the
populated list of options. The value is a boolean; the default behavior is not to allow.

```suggestion-enter-action``` (optional) Executes a function when the enter key is hit.
The value must be a function.

```suggestion-response-property``` Needs Info

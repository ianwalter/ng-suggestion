# [ng-suggestion](http://ianwalter.github.io/ng-suggestion/)
*Flexible AngularJS typeahead / autocomplete / suggestion / predictive search directive*

A wise man once said, *"I don't have time for docs right now just read the source."
&mdash;&nbsp; [Ian Kennington Walter](http://iankwalter.com)

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
var app = angular.module('your-wonderful-app', ['ng-suggestion'])
```

#### Using ng-suggestion
```html
<input dropdown-field
       suggestion="courseService.courseLookup"
       suggestion-model="courseService.current.courseName"
       suggestion-dropdown="courseService.courseLookupDropdown"
       suggestion-url="courseService.courseLookupUrl"
{#       suggestion-delete-handler="courseService.deleteNewSubject()"#}
       suggestion-params="{
         q: courseService.current.courseName,
         subject_id: courseService.current.subject.id
       }"/>
```

```dropdown-field```

```suggestion```

```suggestion-model```

```suggestion-dropdown```

```suggestion-url``` The URL of the API that will return the list of suggestions.

```suggestion-delete-handler```

```suggestion-params``` The parameters to be used to query the identified API.

```suggestion-free-text``` (optional) Allows the selection of items that are not in the
populated list of options. The value is a boolean; the default behavior is not to allow.

```suggestion-enter-action``` (optional) Executes a function when the enter key is hit.
The value must be a function.

```suggestion-response-property```


This README was last updated on 10/5/2015 by [Jake Lipson](jacob@luvolearn.com)
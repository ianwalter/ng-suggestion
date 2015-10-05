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
<input suggestion="courseService.courseLookup"
       suggestion-model="courseService.current.courseName"
       suggestion-dropdown="courseService.courseLookupDropdown"
       suggestion-url="courseService.courseLookupUrl"
{#       suggestion-delete-handler="courseService.deleteNewSubject()"#}
       suggestion-params="{
         q: courseService.current.courseName,
         subject_id: courseService.current.subject.id
       }"/>
```
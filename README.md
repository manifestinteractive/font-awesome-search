Font Awesome - Icon Search Tool ( for Version 4.4.0 )
---

This is a tool for making it easier to find the icons you are looking for and quickly copy the code you need.

The main Font Awesome library is accessible here: [http://fortawesome.github.io/Font-Awesome/](http://fortawesome.github.io/Font-Awesome/)


### [http://faicons.com](http://faicons.com)

Usage:
---
* __Search:__ Looks for text in any icon and possible aliases. Example: searching for "empty" ( without quotes ) will find you everything containing that word. Another Example: "yen" will return icon-jpy even through its not the icons name.

* __Auto-complete:__ As you type in the search box, an auto-complete list will drop down with possible selections matching your search.  Clicking on a selection, or using the arrows & enter key will activate that selection.

* __Version Filters:__ If you would like to limit your search results to Icons released in a certain version, change the "All Versions" drop down menu to a version you would like to filter by.  If you just want to see icons that came out in that version, make sure your search term is empty and pick a version from that list.

* __Category Filters:__ If you would like to limit your search results to Icons in a specific category, change the "All Categories" drop down menu to a category you would like to filter by.  If you just want to see icons that belong to that category, make sure your search term is empty and pick a category from that list.

* __Search & Filters Combinations:__ Any Filters you use will reduce the matches shown in the results.

* __Keyboard Navigation:__ You can use the left and right arrows keys to jump to the previous / next visible icon in the list.  If you want to move more quickly, you can also use the up and down arrows to jump three items at a time.  At any time you can hit the escape key to reset everything.


### No Results ?

Make sure you do not have any filters set as they will limit results that are listed.


How you can Contribute:
---
If you are want the latest and greatest, and are noticing this project does not have it... here is how to update the project if you would like to contribute:

1.  Copy the contents of [https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/src/icons.yml](https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/src/icons.yml) to your clipboard

2.  Paste the contents of `icons.yml` into [http://nodeca.github.io/js-yaml/](http://nodeca.github.io/js-yaml/)

3.  Save the value inside the `icons:` array in Result (JS object dump) to `./js/icons.js` for the value of `var icons = ` _( see current file if for clarification )_


### Adding Custom Aliases:

Sometimes you're looking for something and just not finding it.  For example, I always look for `email` and never find it because Font Awesome calls it `envelope`.

I have created the file `./js/aliases.js` to handle this issue.  If you would like a custom alias added to this library, just hit me up on [Twitter @mrmidi](http://twitter.com/mrmidi) with the icon id, and what you would like it to be called so its easier for others to search.

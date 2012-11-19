#Templjs - easy to use library to manage html templates with JS#
###Requirements###
* Jquery 1.8.2 [website](http://www.jquery.com) [download](http://code.jquery.com/jquery-1.8.3.min.js)
* Imagesloaded Jquery plugin [github](https://github.com/desandro/imagesloaded)

###Features###
* creating pages or items as a template type.
* history feature to go back to the previous page.
* caching html in javascript
* preloading images
* using jquery events to update the target element. 

##Usage##

###HTML template file###
To use the TEMPL library first you have to create a template file in html. 

_*Example*_

```html
<div id="templateName">
	<!-- Your html elements -->
</div>
```
> Important : always wrap your html elements with a div or an other element containing an id or a classname. The Classname or Id will be the name of the template

###Use the template with Templjs###
To use the template in your javascript project you have to define a new template.

```javascript
	var options = {
		url : 'content/yourtemplate.html',
		target : 'body'
	}

	var myPage = new TEMPL.create(options);
```
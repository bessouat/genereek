# Introduction #

The CSS module is a [piece of javascript](http://genereek.googlecode.com/svn/trunk/system/addons/modules/css.js) set to manage CSS in the page.

# Details #

This module have no default value so you need to set everything you need to set CSS on your page :

  * **env** need to be set to "current" to enable the template management.

  * **id** set an "#id" to the CSS (you dont have to put the '#')

  * **class** set an ".class" to the CSS (you dont have to put the '.')

  * **name** set an "name" to the CSS (like body, a, div, etc.)

the others attribute use to be the content of the CSS value :

```
<css name="div" margin="0" padding="0" background="#fff" />
```

generate a CSS like this ...


```
div {
	margin: 0;
	padding: 0;
	background: #fff;
}
```
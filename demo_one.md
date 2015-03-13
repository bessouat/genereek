# Introduction #

Here we'll describe the http://www.genereek.com/ homepage application.

Behind this page and his image there is 4 distinct application hidden :
  * a title modification
  * a clock application in the status bar
  * a center on window resize application
  * a click left following application

# Details #

For this example we need to enable some necessary modules :

  * "[control](module_control.md)" to manage all event (mouse, time, keyboard) ...
```
 <enable module="control"/>
```
  * "[sequence](module_sequence.md)" to generate some transitions with physical object ...
```
 <enable module="sequence"/>
```
  * "[css](module_css.md)" to manage the general CSS of the page ...
```
 <enable module="css"/>
```
  * "[data](module_data.md)" to manage all the data in the page like tags propriety ...
```
 <enable module="data"/>
```
  * "[title](module_title.md)" to modify the text in the title ...
```
 <enable module="title"/>
```
  * "[status](module_status.md)" to modify the text in the status bar ...
```
 <enable module="status"/>
```

_(here we use the module "[enable](module_enable.md)" how is set by default like the "[disable](module_disable.md)" module)_

For the data (window size, mouse position, element size) we need to use the [$G](javascript_global.md) container. You'll can see some example bellow.

After we just put hour classic HTML code :

```
<div class="bod" style="position:absolute;top:0;left:0;">
	<div id="logo" style="position:absolute; visibility:hidden;">
		<img id="logoImg" src="img/logo.jpg" alt="Logo"/>
	</div>
</div>
```

Has you can see, it's an image inside of a DIV used to be the container image and an other DIV to simulate an play area. The image forced in the corner top left and set invisible that will change nothing in your page.


Then we create the [css](module_css.md) propriety of the DIV classed "bod" :

```
<css class="bod" width="($G.window_width)+'px'" position="absolute" height="($G.window_height)+'px'" top="0" left="0" overflow="hidden" />
```

Has you can see we set in the same time the max current available area of the window and force to hide all content going outside (it's just to avoid the scroll bar when an object move out of the window).

To finish the initialization we change the data of the DIV image container identified "logo" to make it center and visible :

```
<data type="set" id="logo" variable="style.left" value="($G.window_width/2)-($G.width('logoImg')/2)" ext="px" />   
<data type="set" id="logo" variable="style.top" value="($G.window_height/2)-($G.height('logoImg')/2)" ext="px" />
<data type="set" id="logo" variable="style.visibility" value="visible" />
```


For the first "physical" move we will just change the [title](module_title.md) text of the current window :

```
<title value="Genereek" />
```

The evolution of the last move is to use a little bit of javascript to set the date time in the [status](module_status.md) bar of the browser.
The [control](module_control.md) tag is use to create an event control. All the tags inside will be execute when each "action" event happen (here each 1000 ms)

```
<control action="timer:1000">
	<status value="new Date()" />
</control>
```

Here we doing a reset of the initial variable on each window resize, but, for that we make   a [sequence](module_sequence.md).
That will make transit the image from the current point to the center ...

```
<control action="resize">
	<sequence id="seq" type="OutBounce">
		<data type="set" id="logo" variable="style.left" value="($G.window_width/2)-($G.width('logoImg')/2)" ext="px" />  
		<data type="set" id="logo" variable="style.top" value="($G.window_height/2)-($G.height('logoImg')/2)" ext="px" /> 
	</sequence> 
	<css class="bod" width="($G.window_width)+'px'" height="($G.window_height)+'px'" />
</control>
```

The last move is set on a click left of the mouse and do the same thing that before (without the "bod" [css](module_css.md) reset) but for the mouse position.

```
<control action="click:left">
	<sequence id="seq" type="OutBounce">
		<data type="set" id="logo" variable="style.left" value="$G.mouse_x-($G.width('logoImg')/2)" ext="px" />  
		<data type="set" id="logo" variable="style.top" value="$G.mouse_y-($G.height('logoImg')/2)" ext="px" />  
	</sequence>
</control>
```

VOILA ! You click left somewhere and the image follow the mouse position ...
<img id="logoImg" src="img/logo.jpg" alt="Logo"/>

*GenerEEK* is a *web framework* build to make new web technology *simple* and *funky*. 

 * *Most of* the web framework are *difficult to use *(_if you don't know very well development method's_) *or too simple* to do everything you want. 
 * So even if you are a *good developer* that take *time to develop* new application.
 * Some new move are *very interesting* (_like AIR, Silverlight or JavaFX_) but it's counting on *setup an external program/plugin*. 
 * More you have program's on your computer more you *risk to have security issues*. 

Here we propose a system to use all the good part of the *new technology*.

 * The framework load (download) only a basic system environment and load (download) step by step others modules/templates if you need it. 
 * Made in Javascript, only *running in client environment*
 * Working on *99% of browsers*
 * *Cross domain Ajax* Technology
 * Describe your application in *XML* ... nothing else
 * *Nothing to install* on the client side, open your browser and GO
 * *Ajax*, *motion* and *event* system 100% *managed from XML*
 * *Cross Language* ? Actually supporting PHP but this framework needs only 10 line of PHP, so its really simple to use it with others language
 * *So light ...*

_You can use others new technology too with external program/plugin, but *you don't need it* to make some funky application ..._

<a href="http://www.genereek.com/">... watch the demo and enjoy</a>

#Introduction

Here we'll describe the <a href="http://www.genereek.com/">genereek.com</a> homepage application.

Behind this page and his image there is 4 distinct application hidden :
  * a title modification
  * a clock application in the status bar
  * a center on window resize application
  * a click left following application

#Definition of the XML usage to create your applications.

For this example we need to enable some necessary modules : 

 * <b>control</b> to manage all event (mouse, time, keyboard) ...
```html
<enable module="control"/>
```
 * <b>sequence</b> to generate some transitions with physical object ...
```html
<enable module="sequence"/>
```
 * <b>css</b> to manage the general CSS of the page ...
```html
<enable module="css"/>
```
 * <b>data</b> to manage all the data in the page like tags propriety ...
```html
<enable module="data"/>
```
 * <b>title</b> to modify the text in the title ...
```html
<enable module="title"/>
```
 * <b>status</b> to modify the text in the status bar ...
```html
<enable module="status"/>
```

_(here we use the module <b>enable</b> how is set by default like the <b>disable</b> module)_

For the data (window size, mouse position, element size) we need to use the <b>$G</b> container. You'll can see some example bellow.

After we just put hour classic HTML code :

```html
<div class="bod" style="position:absolute;top:0;left:0;">
	<div id="logo" style="position:absolute; visibility:hidden;">
		<img id="logoImg" src="img/logo.jpg" alt="Logo"/>
	</div>
</div>
```

Has you can see, it's an image inside of a DIV used to be the container image and an other DIV to simulate an play area. The image forced in the corner top left and set invisible that will change nothing in your page.


Then we create the <b>css</b> propriety of the DIV classed "bod" :

```html
<css class="bod" width="($G.window_width)+'px'" position="absolute" height="($G.window_height)+'px'" top="0" left="0" overflow="hidden" />
```

Has you can see we set in the same time the max current available area of the window and force to hide all content going outside (it's just to avoid the scroll bar when an object move out of the window).

To finish the initialization we change the data of the DIV image container identified "logo" to make it center and visible :

```html
<data type="set" id="logo" variable="style.left" value="($G.window_width/2)-($G.width('logoImg')/2)" ext="px" />   
<data type="set" id="logo" variable="style.top" value="($G.window_height/2)-($G.height('logoImg')/2)" ext="px" />
<data type="set" id="logo" variable="style.visibility" value="visible" />
```


For the first "physical" move we will just change the <b>title</b> text of the current window :

```html
<title value="Genereek" />
```

The evolution of the last move is to use a little bit of javascript to set the date time in the <b>status</b> bar of the browser.
The <b>control</b> tag is use to create an event control. All the tags inside will be execute when each "action" event happen (here each 1000 ms)

```html
<control action="timer:1000">
	<status value="new Date()" />
</control>
```

Here we doing a reset of the initial variable on each window resize, but, for that we make   a <b>sequence</b>. 
That will make transit the image from the current point to the center ...

```html
<control action="resize">
	<sequence id="seq" type="OutBounce">
		<data type="set" id="logo" variable="style.left" value="($G.window_width/2)-($G.width('logoImg')/2)" ext="px" />  
		<data type="set" id="logo" variable="style.top" value="($G.window_height/2)-($G.height('logoImg')/2)" ext="px" /> 
	</sequence> 
	<css class="bod" width="($G.window_width)+'px'" height="($G.window_height)+'px'" />
</control>
```

The last move is set on a click left of the mouse and do the same thing that before (without the "bod" <b>css</b> reset) but for the mouse position.

```html
<control action="click:left">
	<sequence id="seq" type="OutBounce">
		<data type="set" id="logo" variable="style.left" value="$G.mouse_x-($G.width('logoImg')/2)" ext="px" />  
		<data type="set" id="logo" variable="style.top" value="$G.mouse_y-($G.height('logoImg')/2)" ext="px" />  
	</sequence>
</control>
```

VOILA ! You click left somewhere and the image follow the mouse position ... 
#The control module

The control module is a <a href="system/addons/modules/control.js">piece of javascript</a> set to listen and manage event/time on the window.

This tag listen by default all the window (called "GLOBAL") for a mouse "click" and execute all his content, So if you use it like ...

```html
<control>
	<script>alert("click on window");</script>
</control>
```

... when you click somewhere on the window that will pop up an alert window ho will say "click on window"

Of course the default option can be forced to specific view of your needs with some attribute :

 * *env* need to be set to "current" to enable the template management. So you can have the same control for different object.

 * *id* set an id to the control, useful if you need to remove the control.

 * *release* set the id of the object (and his child) you want to listen.

 * *target* set the id of the object who will be parsed when the event is detected.

 * *action* or *type* set the type of the event need to be listen. 



You can listen different kind of action ...

Basic action (_action="resize"_) :
```html
timer (like action="timer:1000" for each second)

resize
beforeunload
unload

mouseup
mousedown
mousemove
mouseout
mouseover
mousewheel

click
dblclick

keydown
keyup
keypress
```

You can add some definition for keyboard event ... 


*Alphanumerical keys* in capitalize for one or more matching characters (_action="keypress:A"_ or _action="keypress:STOP"_)

*Special keys* (_action="keydown:ctrl+H"_) :
```html
ctrl
alt
meta
shift
```

*Normal keys* (_action="keyup:alt+F1"_) :
```html
Backspace
Tab
Return
PauseAttn
SchiftLock
Echap

Space

SpeedTop
SpeedBottom

Fin
Home

ArrowLeft
ArrowTop
ArrowRight
ArrowBottom

Inser
Delete
BracketOpen
Start
Menu

F1
F2
F3
F4
F5
F6
F7
F8
F9
F10
F11
F12

NumLock
StopScroll
BracketClose
Scare
Dif
```

... or mouse event (_action="click:left"_) ...

```html
left
right
middle
```


*Example* :

```html
<control action="click:left">
	<script>alert("click left on window");</script>
</control>
```


#The sequence module

The sequence module is a <a href="system/addons/modules/sequence.js">piece of javascript</a> set to manage a natural move for the transition (position, color, focus, etc.) of an object from a value A to a value B.

This module use no effect by default and each transition take 1 second, but you can manage default value with some optional tags :


 * *id* set the sequence id, its useful to break the sequence and/or restart it from the current point.

 * *duration* set the duration between the value A to the value B of the 

 * *interval* set the step between 2 point, more the interval during 2 point are low more the sequence look natural but need more CPU on the client side (default value set to 10 ms)

 * *start* set the % (0 to 100) of the initial value you want the sequence start.

 * *end* set the % (0 to 100) of the final value you want the sequence end.

 * *type* or *type* set the type of the sequence. 

You have different kind of event content on this list :

```html
none
inquad
outquad
inoutquad
incubic
outcubic
inoutcubic
outincubic
inquart
outquart
inoutquart
outinquart
inquint
outquint
inoutquint
outinquint
insine
outsine
inoutsine
outinsine
inexpo
outexpo
inoutexpo
outinexpo
incirc
outcirc
inoutcirc
outincirc
inelastic
outelastic
inoutelastic
outinelastic
inback
outback
inoutback
outinback
inbounce
outbounce
inoutbounce
outinbounce
```

The value can be set with the <b>data</b> tag :

```html
<div id="mydiv" style="top:0px; left:0px; position:absolute;">My Text</div>

<sequence id="seq" type="OutBounce">
	<data type="set" id="mydiv" variable="style.left" value="500" ext="px" />  
	<data type="set" id="mydiv" variable="style.top" value="500" ext="px" />  
</sequence>
```

this will start from *top 0px and left 0px* and make move the div "mydiv" to *top 500px and left 500px* ...


#The css manager module

The CSS module is a <a href="system/addons/modules/css.js">piece of javascript</a> set to manage CSS in the page.

This module have no default value so you need to set everything you need to set CSS on your page :

 * *env* need to be set to "current" to enable the template management.

 * *id* set an "#id" to the CSS (you dont have to put the '#')

 * *class* set an ".class" to the CSS (you dont have to put the '.')

 * *name* set an "name" to the CSS (like body, a, div, etc.)

the others attribute use to be the content of the CSS value :

```html
<css name="div" margin="0" padding="0" background="#fff" />
```

generate a CSS like this ...


```css
div {
	margin: 0;
	padding: 0;
	background: #fff;
}
```


#The data manager module

The data module is a <a href="system/addons/modules/data.js">piece of javascript</a> set to manage data in the page.

this topic need to be complete ...


#The title manager module

The title module is a <a href="system/addons/modules/title.js">piece of javascript set to manage title in the page.

this topic need to be complete ...

#The status manager module

The status module is a <a href="system/addons/modules/status.js">piece of javascript</a> set to manage status in the page.

this page need to be complete ...

#The enable module manager

The enable module is a <a href="system/addons/modules/enable.js">piece of javascript</a> set to enable others module in the page.

this page need to be complete ...

#The disabel module manager

The disable module is a <a href="system/addons/modules/disable.js">piece of javascript</a> set to disable others module in the page.

this page need to be complete ...

#The global function container ($G)

this page need to be complete ...

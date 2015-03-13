# Introduction #

The control module is a [piece of javascript](http://genereek.googlecode.com/svn/trunk/system/addons/modules/control.js) set to listen and manage event/time on the window.

# Details #

This tag listen by default all the window (called "GLOBAL") for a mouse "click" and execute all his content, So if you use it like ...

```
<control>
	<script>alert("click on window");</script>
</control>
```

... when you click somewhere on the window that will pop up an alert window ho will say "click on window"

Of course the default option can be forced to specific view of your needs with some attribute :

  * **env** need to be set to "current" to enable the template management. So you can have the same control for different object.

  * **id** set an id to the control, useful if you need to remove the control.

  * **release** set the id of the object (and his child) you want to listen.

  * **target** set the id of the object who will be parsed when the event is detected.

  * **action** or **type** set the type of the event need to be listen.



You can listen different kind of action ...

Basic action (_action="resize"_) :
```
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


**Alphanumerical keys** in capitalize for one or more matching characters (_action="keypress:A"_ or _action="keypress:STOP"_)

**Special keys** (_action="keydown:ctrl+H"_) :
```
ctrl
alt
meta
shift
```

**Normal keys** (_action="keyup:alt+F1"_) :
```
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

```
left
right
middle
```


_**Example** :_

```
<control action="click:left">
	<script>alert("click left on window");</script>
</control>
```
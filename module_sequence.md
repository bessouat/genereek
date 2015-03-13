# Introduction #

The sequence module is a [piece of javascript](http://genereek.googlecode.com/svn/trunk/system/addons/modules/sequence.js) set to manage a natural move for the transition (position, color, focus, etc.) of an object from a value A to a value B.

# Details #

This module use no effect by default and each transition take 1 second, but you can manage default value with some optional tags :


  * **id** set the sequence id, its useful to break the sequence and/or restart it from the current point.

  * **duration** set the duration between the value A to the value B of the

  * **interval** set the step between 2 point, more the interval during 2 point are low more the sequence look natural but need more CPU on the client side (default value set to 10 ms)

  * **start** set the % (0 to 100) of the initial value you want the sequence start.

  * **end** set the % (0 to 100) of the final value you want the sequence end.

  * **type** or **type** set the type of the sequence.

You have different kind of event content on this list :

```
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

The value can be set with the [data](module_data.md) tag :

```
<div id="mydiv" style="top:0px; left:0px; position:absolute;">My Text</div>

<sequence id="seq" type="OutBounce">
	<data type="set" id="mydiv" variable="style.left" value="500" ext="px" />  
	<data type="set" id="mydiv" variable="style.top" value="500" ext="px" />  
</sequence>
```

this will start from **top 0px and left 0px** and make move the div "mydiv" to **top 500px and left 500px** ...
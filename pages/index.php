<!--
	The contents of this file are subject to the Mozilla Public License
	Version 1.1 (the "License"); you may not use this file except in
	compliance with the License. You may obtain a copy of the License at
	http://www.mozilla.org/MPL/
	
	Contributor(s): Bessouat Xavier.
	
	PLEASE READ THE RULES ON THE LICENCE.TXT FILE
-->

<enable module="info"/>
<enable module="script"/>
<enable module="label"/>
<enable module="uncontrol"/>
<enable module="control"/>
<enable module="istrue"/>
<enable module="isfalse"/>
<enable module="flash"/>
<enable module="sequence"/>
<enable module="css"/>
<enable module="data"/>
<enable module="title"/>
<enable module="status"/>
<enable module="timeout"/>
<enable module="edit"/>
<enable module="diese"/>

<div class="bod" style="position:absolute;top:0;left:0;">
	<div id="logo" style="position:absolute; visibility:hidden;">
		<img id="logoImg" src="img/logo.jpg" alt="Logo"/>
	</div>
	<div id="demo" style="position:absolute; visibility:hidden;">
		<a href="#demo_1">Demo 1</a>
		|
		<a href="#demo_2">Demo 2</a>
		|
		<a href="#demo_3">Demo 3</a>
		|
		<a href="#demo_4">Demo 4</a>
		|
		<a href="#demo_5">Demo 5</a>
	</div>
</div>

<css class="bod" width="($G.window_width)+'px'" position="absolute" height="($G.window_height)+'px'" top="0" left="0" overflow="hidden" />

<data type="set" id="logo" variable="style.left" value="($G.window_width/2)-($G.width('logoImg')/2)" ext="px" />   
<data type="set" id="logo" variable="style.top" value="($G.window_height/2)-($G.height('logoImg')/2)" ext="px" />
<data type="set" id="logo" variable="style.visibility" value="visible" />

<data type="set" id="demo" variable="style.left" value="-$G.width('demo')" ext="px" />
<data type="set" id="demo" variable="style.visibility" value="visible" />

<title value="Genereek" />

<control action="timer:1000">
	<status value="new Date()" />
</control>

<control action="click:left">
	<istrue eval="$G.mouse_y > 50">
		<sequence id="seq_move" type="outbounce">
			<data type="set" id="logo" variable="style.top" value="$G.mouse_y-($G.height('logoImg')/2)" ext="px" />  
			<data type="set" id="logo" variable="style.left" value="$G.mouse_x-($G.width('logoImg')/2)" ext="px" />
		</sequence>
	</istrue>
</control>
   
<control action="resize">
	<css class="bod" width="($G.window_width)+'px'" height="($G.window_height)+'px'" />
	<sequence id="seq_move" type="outbounce">
		<data type="set" id="logo" variable="style.left" value="($G.window_width/2)-($G.width('logoImg')/2)" ext="px" />  
		<data type="set" id="logo" variable="style.top" value="($G.window_height/2)-($G.height('logoImg')/2)" ext="px" />  
	</sequence>
</control>

<sequence id="seq_demo" type="outbounce">
	<data type="set" id="demo" variable="style.left" value="10" ext="px" /> 
</sequence>
<diese target="demo.php" />
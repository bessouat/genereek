/*
	The contents of this file are subject to the Mozilla Public License
	Version 1.1 (the "License"); you may not use this file except in
	compliance with the License. You may obtain a copy of the License at
	http://www.mozilla.org/MPL/
	
	Contributor(s): Bessouat Xavier.
	
	PLEASE READ THE RULES ON THE LICENCE.TXT FILE
*/

var undefined;

if ($G == undefined) var $G = {};

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * CONFIG  * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

$G["listModules"]	= "enable:disable";
$G["listTemplates"]	= "newfile";

$G["extGet"]		= "php";
$G["extModules"]	= "js";
$G["extTemplates"]	= "php";

$G["contenerTag"]	= "span";

$G["mainPage"]		= "pages/index.php";

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * FUNCTIONS * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

$G["width"] = function (info) {
	var elem = $G["get"](info);
	if (elem) return elem.offsetWidth;
	return 0;
}
$G["height"] = function (info) {
	var elem = $G["get"](info);
	if (elem) return elem.offsetHeight;
	return 0;
}
$G["top"] = function (info) {
	var elem = $G["get"](info);
	if (elem) return elem.offsetTop;
	return 0;
}
$G["left"] = function (info) {
	var elem = $G["get"](info);
	if (elem) return elem.offsetLeft;
	return 0;
}
$G['tolower'] = function (txt)		{ try { var str = new String(txt); return str.toLowerCase(); } catch (e) { return ""; } }
$G['toupper'] = function (txt)		{ try { var str = new String(txt); return str.toUpperCase(); } catch (e) { return ""; } }
$G['isAlien'] = function (a)   		{ return $G['isObject'](a) && typeof a.constructor != 'function' }
$G['isArray'] = function (a)   		{ return $G['isObject'](a) && a.constructor == Array }
$G['isBoolean'] = function (a) 		{ return typeof a == 'boolean' }
$G['isFunction'] = function (a)		{ return typeof a == 'function' }
$G['isNull'] = function (a)    		{ return typeof a == 'object' && !a }
$G['isNumber'] = function (a)  		{ return typeof a == 'number' && isFinite(a) }
$G['isObject'] = function (a)  		{ return (a && typeof a == 'object') || $G['isFunction'](a) }
$G['isRegexp'] = function (a)  		{ return a && a.constructor == RegExp }
$G['isString'] = function (a)   	{ return typeof a == 'string' }
$G['isUndefined'] = function (a)	{ return typeof a == 'undefined' }
$G['isEmpty'] = function (o)    	{ var i, v; if ($G['isObject'](o)) { for (i in o) { v = o[i]; if ($G['isUndefined'](v) && $G['isFunction'](v)) { return false; } } } return true; }
$G['undef'] = function (v) 			{ return  $G['isUndefined'](v) }
$G['isdef'] = function (v) 			{ return !$G['isUndefined'](v) }
$G['isParent'] = function (s, a)	{ var h = false; while (a && a.id) { if (a.id) { if (a.id == s.id) h = true; } if (h == false && a.parentNode) a = a.parentNode; else a = null; } return (h); }
$G['random'] = function() {
	var t = new Date();
	var rnd_t = t.getTime();
	var rnd_full = Math.random() * rnd_t;
	var rnd_float = rnd_full % 1;
	var rnd_int = rnd_full - rnd_float;
	var float_to_int = Number(String(rnd_float).substr(2));
	var rnd = rnd_int + float_to_int;

	return (rnd);
}
$G['convertXMLtoDOM'] = function(xml) {
	var obj = null;
	var xmlDom = null;
	try {
		obj = function(xmlval) {
			return window.parseXML(String(xmlval), null);
		}
		var xmlDom = obj(xml);
		$G["convertXMLtoDOM"] = obj;
		return xmlDom;
	} catch (e) {
		try {
			obj = function(xmlval) {
				return (new DOMParser()).parseFromString(String(xmlval),
						"text/xml");
			}
			var xmlDom = obj(xml);
			$G["convertXMLtoDOM"] = obj;
			return xmlDom;
		} catch (e) {
			try {
				var prefixes = ["Microsoft", "MSXML3", "Msxml2", "MSXML"];
				var sufixes = ["XmlHttp", "XMLDOM", "DomDocument.4.0",
						"DomDocument"];
				for (var i = 0; i < sufixes.length; i++) {
					for (var j = 0; j < prefixes.length; j++) {
						try {
							obj = eval("var eval_obj = function (xmlval) { var objX = new ActiveXObject('"
									+ prefixes[j]
									+ "."
									+ sufixes[i]
									+ "'); objX.loadXML(String(xmlval)); return (objX); }");
							obj = eval_obj;
							var xmlDom = obj(xml);
							$G["convertXMLtoDOM"] = obj;
							return xmlDom;
						} catch (ex) {
						};
					}
				}
			} catch (e) {
				return null;
			}
		}
	}
	return xmlDom;
}
$G['get'] = function (info) {
	var elem = null;
	if (info) {
		var elem = document.getElementById(info);
		if (!elem) try { var elem = document.getElementsByName(info); } catch(e) { }
		try { 
			if (!elem[0]) 
			{
				if (info.indexOf("_") != -1)
				{
					var infoSplit = info.split("_");
					var fctGetTag = function(parent, inc, list)
					{
						var telem = parent.getElementsByTagName((list[inc]))[Number(list[inc+1])];
						if ($G['isdef'](list[inc+2]) && $G['isdef'](list[inc+3])) return fctGetTag(telem, inc+2, list);
						else return telem;
					}
					elem = fctGetTag(document, 0, infoSplit);
				}
			} 
		} catch(e) { }
	}
	return elem;
}
$G['init'] = function ()
{
	$G["pathLocation"] = window.location.href;
	$G["pathstart"] = (("https:" == document.location.protocol) ? "https://" : "http://");
	$G["path"] = document.getElementById("jsnetwork").src.replace("index.js", "");
	if ($G["path"] == "") {
		var splP = window.location.href.split("?");
		var uri = splP[0];
		var i = uri.length - 1;
		for (i = i; i > 0 && uri.substr(i, 1) != "/"; i--);
		$G["path"] = uri.substr(0, i + 1);
	}
	//$G["path"] = $G["path"].replace("http://", $G["pathstart"]);
	
    var nav=$G['tolower'](navigator.userAgent);
	var idx = null;	
	$G["navigator"] = "ie";
	if ((idx = nav.indexOf("firefox")) >= 0){$G["navigator"] = "ff";}
	else if ((idx = nav.indexOf("gecko")) >= 0){$G["navigator"] = "ff";}
	else if ((idx = nav.indexOf("msie")) >= 0){$G["navigator"] = "ie";}
	else if ((idx = nav.indexOf("opera")) >= 0){$G["navigator"] = "op";}
	else if ((idx = nav.indexOf("netscape")) >= 0){$G["navigator"] = "ns";}
	else if ((idx = nav.indexOf("safari")) >= 0){$G["navigator"] = "sa";}

	$G["head"] = document.getElementsByTagName("head")[0];
	$G["body"] = document.getElementsByTagName("body")[0];
	$G["garbage"] = document.createElement($G["contenerTag"]);
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * INIT VARIABLE * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

$G["init"]();

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * EVENT * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

$G['event'] = function() 
{
	
	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * * * * * * * * * * * * * * INIT  * * * * * * * * * * * * * * *
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	
	$G['mouse_x'] = 0;
	$G['mouse_y'] = 0;

	$G['listenMatch'] = new Array();

	if ($G["navigator"] == "ff" || $G["navigator"] == "ns") { var mousewheel = "DOMMouseScroll"; }
	else { var mousewheel = "mousewheel"; }
		 
	if (window.innerHeight && window.scrollMaxY) {	 
		$G['scrollWidth'] = function() { return (document.body.scrollWidth); }
		$G['scrollHeight'] = function() { return (window.innerHeight + window.scrollMaxY); } 
	} else if (document.body.scrollHeight > document.body.offsetHeight){
		$G['scrollWidth'] = function() { return (document.body.scrollWidth); }
		$G['scrollHeight'] = function() { return (document.body.scrollHeight); }
	} else {
		$G['scrollWidth'] = function() { return (document.body.offsetWidth); }
		$G['scrollHeight'] = function() { return (document.body.offsetHeight); }
	} 
	 
	if (self.innerHeight) {
		$G['navWidth'] = function() { return (self.innerWidth); }
		$G['navHeight'] = function() { return (self.innerHeight); }
	} else if (document.documentElement && document.documentElement.clientHeight) {
		$G['navWidth'] = function() { return (document.documentElement.clientWidth); }
		$G['navHeight'] = function() { return (document.documentElement.clientHeight); }
	} else if (document.body) {
		$G['navWidth'] = function() { return (document.body.clientWidth); }
		$G['navHeight'] = function() { return (document.body.clientHeight); }
	}

	$G['listenMatch']['mouseup'] 	= 'mouseup';
	$G['listenMatch']['mousedown'] 	= 'mousedown';
	$G['listenMatch']['mousemove'] 	= 'mousemove';
	$G['listenMatch']['mouseout'] 	= 'mouseout';
	$G['listenMatch']['mouseover'] 	= 'mouseover';
	$G['listenMatch'][mousewheel] 	= 'mousewheel';
	$G['listenMatch']['click'] 		= 'click';
	$G['listenMatch']['dblclick'] 	= 'dblclick';
	$G['listenMatch']['keydown'] 	= 'keydown';
	$G['listenMatch']['keyup'] 		= 'keyup';
	$G['listenMatch']['keypress'] 	= 'keypress';

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * * * * * * * * * * * * * * PARSE * * * * * * * * * * * * * * *
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
	 
	var eventList = {};
	var ev = null;
	var ev_type = null;
	var ev_target = null;
	var ev_button = null;
	var ev_active_target = null;
	var ev_key_info = null;
	var ev_key_history = "";
	var ev_key_timeout = null;
	var ev_key_list = {};
	var mouse_x_dir = null;
	var mouse_y_dir = null;
	var mouse_x = null;
	var mouse_y = null;
	var timer_id = {};
	var start_time = new Date();
	var abort = false;
	
	this.clearKeyHistory = function() {
		try {
			ev_key_history = "";
		} catch (e) {}
	}
	this.initEventType = function(event_name) {
		if ($G["undef"](eventList[event_name]))
			eventList[event_name] = {};
	}
	this.initTimer = function(durring) {
		try { window.clearInterval(timer_id[durring]); } catch (e) { }
		timer_id[durring] = window.setInterval("$G['listen'].timer("+durring+");", durring);
	}
	this.deleteEventType = function(event_name) {
		eventList[event_name] = {};
		delete(eventList[event_name]);
	}
	this.addListenOut = function(target, event_Name, function_Name) {
		if ($G["navigator"] == "ie") eval('target.on'+event_Name+'=function_Name');
		else target.addEventListener(event_Name, function_Name, true);
	}    
	this.delListenOut = function(target, event_Name, function_Name) {
		if ($G["navigator"] == "ie") eval('target.on'+event_Name+'=function () {}');
		else target.delEventListener(event_Name, function_Name, true);
	}
	this.add = function(event_name, id, exec) {
		if (event_name.indexOf("timer") != -1)
		{
			var time_long = event_name.split(":");
			var durring = time_long[1];
				
			if (durring && !timer_id[durring]) {
				this.initTimer(durring);
			}
		}
		if (exec.substr(exec.length-1) != ";")
		{
			exec = exec+";";	
		}
		if (!eventList[event_name]) this.initEventType(event_name);
		if ($G["undef"](eventList[event_name][id]))
			eventList[event_name][id] = {};
		eventList[event_name][id][exec] = true;
		return (eventList[event_name][id][exec]);
	}
	this.del = function(event_name, id, exec) {
		if (event_name)
		{
			if (id)
			{
				if (exec) 
				{
					eventList[event_name][id][exec] = null;
					delete(eventList[event_name][id][exec]);
				}
				else 
				{
					eventList[event_name][id] = {};
					delete(eventList[event_name][id]);
				}
			}
			else 
			{
				this.deleteEventType(event_name);
			}
		}
	}
	function getTarget(evt) {
		if (!evt) var evt = ev;
		return (evt.target||evt.srcElement);
	}
	function getTargetLog() {
		return (ev_active_target);
	}
	function getMouseX(e) {
		return (e.pageX||e.x);
	} this.getMouseX = function () { return (getMouseX(ev)); };
	function getMouseY(e) {
		return (e.pageY||e.y);
	} this.getMouseY = function () { return (getMouseY(ev)); };
	function getActiveTarget() {
		return (ev_active_target);
	} this.getActiveTarget = function () { return (getActiveTarget()); };
	function getEvent(e) {
		return (e||window.event); 
	}
	function getType(e) { 
		return ($G['listenMatch'][e.type]); 
	}
	function getMouseIncludeX(e) { 
		return (e.layerX); 
	} this.getMouseIncludeX = function () { return (getMouseIncludeX(ev)); };
	function getMouseIncludeY(e) { 
		return (e.layerY); 
	} this.getMouseIncludeY = function () { return (getMouseIncludeY(ev)); };
	this.getMouseY = function () { return (getMouseY(ev)); };
	this.getMouseX = function () { return (getMouseX(ev)); };
	this.getActiveTarget = function () { return (getActiveTarget()); };
	this.getMouseIncludeX = function () { return (getMouseIncludeX(ev)); };
	this.getMouseIncludeY = function () { return (getMouseIncludeY(ev)); };
	function getMouseButtom(e) {
		var b = e.which;
		if ($G["navigator"] == "ie") 
		{
			var b = e.button;
			var button = ((b == 2) ? "right":((b == 4) ? "middle":((b == 1) ? "left":"")));
		}
		else 
		{
			var b = e.which;
			var button = ((b == 3) ? "right":((b == 2) ? "middle":((b == 1) ? "left":"")));
		}
		return (button);
	}
	function getKey(e) {
		var ch = "";
		var ach = "";
		
		var info = new Array();
		
		info['ctrl'] = false;
		info['alt'] = false;
		info['meta'] = false;
		info['shift'] = false;
		info['charSet'] = "";
		
		if (e.ctrlKey) 
		{
			if (ch.length) ch += "+";
			ch += "Ctrl";
			info['ctrl'] = true;
		}
		if (e.altKey) 
		{
			if (ch.length) ch += "+";
			ch += "Alt";
			info['alt'] = true;
		}
		if (e.shiftKey) 
		{
			if (ch.length) ch += "+";
			ch += "Shift";
			info['shift'] = true;
		}
		if (e.metaKey) 
		{
			if (ch.length) ch += "+";
			ch += "Meta";
			info['meta'] = true;
		}
		
		info['special'] = ch;
		if (ch.length) ach = "+";
		
		switch(e.keyCode) {
			case   8: ch += ach+"Backspace" ; break
			case   9: ch += ach+"Tab" ; break
			case  13: ch += ach+"Return" ; break
			case  16: ch += "" ; break // shift
			case  17: ch += "" ; break // ctrl
			case  18: ch += "" ; break // alt
			case  19: ch += ach+"PauseAttn" ; break
			case  20: ch += ach+"SchiftLock" ; break
			case  27: ch += ach+"Echap" ; break
			case  32: ch += ach+"Space" ; break
			case  33: ch += ach+"SpeedTop" ; break
			case  34: ch += ach+"SpeedBottom" ; break
			case  35: ch += ach+"Fin" ; break
			case  36: ch += ach+"Home" ; break
			case  37: ch += ach+"ArrowLeft" ; break
			case  38: ch += ach+"ArrowTop" ; break
			case  39: ch += ach+"ArrowRight" ; break
			case  40: ch += ach+"ArrowBottom" ; break
			case  45: ch += ach+"Inser" ; break
			case  46: ch += ach+"Delete" ; break
			case  53: ch += ach+"BracketOpen" ; break
			case  91: ch += ach+"Start" ; break
			case  93: ch += ach+"Menu" ; break
			case 112: ch += ach+"F1" ; break
			case 113: ch += ach+"F2" ; break
			case 114: ch += ach+"F3" ; break
			case 115: ch += ach+"F4" ; break
			case 116: ch += ach+"F5" ; break
			case 117: ch += ach+"F6" ; break
			case 118: ch += ach+"F7" ; break
			case 119: ch += ach+"F8" ; break
			case 120: ch += ach+"F9" ; break
			case 121: ch += ach+"F10" ; break
			case 122: ch += ach+"F11" ; break
			case 123: ch += ach+"F12" ; break
			case 145: ch += ach+"NumLock" ; break
			case 145: ch += ach+"StopScroll" ; break
			case 219: ch += ach+"BracketClose" ; break
			case 222: ch += ach+"Scare" ; break
			case 226: ch += ach+"Dif" ; break
			default: 
				if (e.keyCode != 0)
				{
					info['charSet'] = String.fromCharCode(e.keyCode);
					ch += ach+info['charSet'];
				}
		}
		info['key'] = e.keyCode;
		info['chr'] = String.fromCharCode(e.charCode);
		info['Accesskey'] = ch;
		return (info);
	}
	function execMatch(arrayElem)
	{
		var doneExec = false;
		for (ElemExec in arrayElem)
		{
			var ElemExecBoolean = arrayElem[ElemExec];
			if ($G["isBoolean"](ElemExecBoolean))
			{
				if (ElemExecBoolean) 
				{
					doneExec = true;
					var test = eval(ElemExec);
					if (test && test == false)
					{
						abort = true;
					}
					delete(test);
				}
			}
		}
		return (doneExec);
	}
	function matchEvent(ev_ext_type)
	{
		if ($G["undef"](ev_ext_type)) var ev_ext_type = ev_type;
		var arrayEventListStep = eventList[ev_ext_type];
		
		if (arrayEventListStep)
		{
			var arrayElem = arrayEventListStep['GLOBAL'];
			execMatch(arrayElem);
				
			var actu = ev_active_target;
			try {
				while (actu)
				{
					if (actu.id && actu.parentNode)
					{
						if (execMatch(arrayEventListStep[actu.id]) === false) actu = actu.parentNode;
						else actu = null;
					}
					else if (actu.parentNode) {
						actu = actu.parentNode;
					}
					else
						actu = null;
				}
			}
			catch (e) { }
		}
	}
	this.key = function(e)
	{
		abort = false;
		ev = getEvent(e);

		ev_target = getTarget(ev);
		ev_type = getType(ev);
		
		
		var tmpK = getKey(ev);
		
		if (ev_type=='keydown') 
		{
			try {
				if (tmpK['charSet'] != "")
				{
					try { window.clearTimeout(ev_key_timeout); } catch (e) { }
					ev_key_timeout = window.setTimeout("$G['listen'].clearKeyHistory();", 1500);
					
					if (ev_key_history == "") { ev_key_history = ""+tmpK['Accesskey']+""; }
					else { ev_key_history += ""+tmpK['charSet']+""; }
				}
			} catch (e) {}
			ev_key_info = tmpK;
		}
				
		matchEvent();
		
		if (ev_key_info) 
		{
			matchEvent(ev_type+":"+ev_key_info['Accesskey']);
			if (ev_key_history != "") { matchEvent(ev_type+":"+ev_key_history); }
		}
		if (ev_type=='keyup') ev_key_info = null;
		
		if (abort == true)
		{
			return (this.stop(ev));
		}
	}
	this.system = function(e)
	{
		abort = false;
		ev = getEvent(e);
		
		ev_target = getTarget(ev);
		ev_type = getType(ev);
		
		matchEvent();
		
		if (abort == true)
		{
			return (this.stop(ev));
		}
	}
	this.mouse = function(e)
	{
		abort = false;
		ev = getEvent(e);
		ev_target = getTarget(ev);
		ev_type = getType(ev);
		var tmpBut = getMouseButtom(ev);
		if (tmpBut) ev_button = tmpBut;
		
		matchEvent();
		matchEvent(ev_type+":"+ev_button);
		
		if (abort == true)
		{
			return (this.stop(ev));
		}
	}
	this.resize = function(e) {
		if ($G['window_width'] != $G['navWidth']() || $G['window_height'] != $G['navHeight']())
		{
			$G['window_width'] = $G['navWidth']();
			$G['window_height'] = $G['navHeight']();
			
			ev_type = "resize";
			
			matchEvent();
		}
	}
	this.resizeVerif = function(e) {
		this.resize();
	}
	this.sequence = function(name) {
		ev_type = "sequence:"+name;
		matchEvent();
	}
	this.timer = function(t)
	{		
		ev_type = "timer:"+t;		
		matchEvent();
		return true;
	}
	this.regMousePos = function() {
		var x = getMouseX(ev);
		var y = getMouseY(ev);
		
		mouse_x_dir = x-mouse_x;
		mouse_y_dir = y-mouse_y;
		
		mouse_x = x;
		mouse_y = y;

		$G['mouse_x'] = x;
		$G['mouse_y'] = y;
	}
	this.regMouseTarget = function() {
		ev_active_target = getTarget();
	}
	this.stop = function (e) {
		ev = this.getEvent(e);
		ev.preventDefault(); 
		return false;
	}

	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * * * * * * * * * * * * * * RUN * * * * * * * * * * * * * * * *
	 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */ 
	
	this.addListenOut(window,'resize', this.resize);
	this.addListenOut(window,'beforeunload', this.system);
	this.addListenOut(window,'unload', this.system);
	this.addListenOut(document,'mouseup', this.mouse);
	this.addListenOut(document,'mousedown', this.mouse);
	this.addListenOut(document,'mousemove', this.mouse);
	this.addListenOut(document,'mouseout', this.mouse);
	this.addListenOut(document,'mouseover', this.mouse);
	this.addListenOut(document,mousewheel,	this.mouse);
	this.addListenOut(document,'click', this.mouse);
	this.addListenOut(document,'dblclick', this.mouse);
	this.addListenOut(document,'keydown', this.key);
	this.addListenOut(document,'keyup', this.key);
	this.addListenOut(document,'keypress', this.key);
	
	this.resize();

	this.add("timer:100", "GLOBAL", "$G['listen'].resizeVerif();");
	this.add("mousemove", 'GLOBAL', "$G['listen'].regMousePos();");
	this.add("mousemove", 'GLOBAL', "$G['listen'].regMouseTarget();");
	this.add("click", 'GLOBAL', "$G['listen'].regMouseTarget();");
}
$G['listen'] = new $G['event']();

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * CALLERS * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

$G["callback"] = {};
$G["call"] = function(url, cb) {
	var rand_init = $G["random"]();
	$G["callback"][rand_init] = cb;
	
	if (url.indexOf('?') == -1) var url = url+"?location="+escape($G["pathLocation"]);
	else var url = url+"&location="+escape($G["pathLocation"]);
	if (url.indexOf(".js") == -1) { var toget = "page"; } else { var toget = "script"; }
	if (url.indexOf('://') == -1) var url = $G["path"]+url;
	var toget = $G["path"] + "system/get_" + toget + "." + $G["extGet"] + "?rand=" + rand_init + "&data=" + escape(url);
	
	$G["include"](toget, "data_network_"+rand_init);
}
$G["include"] = function(url, id) {
	var nbr_att = arguments.length;
	var js_elem = document.createElement("script");
	js_elem.setAttribute("type", "text/javascript");
	js_elem.setAttribute("src", url);
	js_elem.setAttribute("id", id);
	$G["head"].appendChild(js_elem);
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * PARSING * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

$G['parseTEMPLATE'] = function (elem, father, templateId, attributes, place, source)
{
	var newElem = document.createElement($G["contenerTag"]);
	var tag = $G['tolower'](elem.nodeName);
	
	var newTemplateId = tag;
	if (attributes && attributes["id"]) newTemplateId = attributes["id"];
	if (templateId) newTemplateId = templateId + ":" + newTemplateId;
	newElem.id = newTemplateId;
	
	$G["parseDOMTREE"]($G['templatesDom'][tag], newElem, newTemplateId);
	return (newElem);
}
$G["parseTAG"] = function(elem, father, templateId, attributes, place, source) {
	var tag = $G['tolower'](elem.nodeName);	
	var newElem = new Object();	
	if ($G["modules"][tag])
	{
		var newElemMod = $G["modules"][tag](elem, father, templateId, attributes, place, source);
		newElem.dom = newElemMod;
		newElem.gtype = "module";
		if (newElemMod === false)  
		{
			newElem.loaded = false;
		}
		else
		{
			newElem.loaded = true;
		}
		return newElem;
	}
	else if ($G["templates"][tag])
	{
		var newElemMod = $G["templates"][tag](elem, father, templateId, attributes, place, source);
		newElem.dom = newElemMod;
		newElem.gtype = "template";
		if (newElemMod === false)  
		{
			newElem.loaded = false;
		}
		else
		{
			newElem.loaded = true;
		}
		return newElem;
	} 
	else newElem = false;
	
	return newElem;
}
$G["newHTML"] = function (elem, attributes, templateId)
{
	var newElem = new Object();
	
	newElem.dom = document.createElement($G['tolower'](elem.nodeName));
	newElem.attributeslist = attributes;
	newElem.loaded = true;
	newElem.gtype = "html";
	$G["setATTR"](newElem, templateId);
	$G["parseDOMTREE"](elem, newElem.dom, templateId);
	return newElem;
}
$G["setATTR"] = function (newDom, templateId)
{
	var attributes = newDom.attributeslist;
	var newElem = newDom.dom;
	if (attributes)
	{
		try {
			for (key in attributes) { 
				try {
					newElem.setAttribute(key, attributes[key]); 
				} catch (e) { }
			}
		} catch (e) { }
		if (templateId && templateId.length && attributes["id"] && newElem.id.indexOf(":") == -1) { newElem.setAttribute("id", templateId+":"+attributes["id"]); }
		try {
			if ($G["navigator"] == "ie")
			{
				var attributes = newDom.attributeslist;
				if (attributes["style"]) 
				{
					newElem.style.setAttribute("cssText", $G['tolower'](attributes["style"]));
				}
			}
		} catch (e) { }
	}

}
$G["parseATTR"] = function(elem) {
	var hash = new Array();
	try {
		var attr = elem.attributes;
		if (attr && attr.length) {
			var count = attr.length;
			for (var j = 0; j < count; j++) {
				try {
					if (attr[j].nodeValue) {
						var attrName = $G['tolower'](attr[j].nodeName);
						var attrValue = attr[j].nodeValue;
						hash[attrName] = attrValue;
					}
				} catch (e) { }
			}
		}
	} catch (e) { }
	return (hash);
}
$G["parseELEM"] = function(elem, father, templateId, place, source) {
	switch (elem.nodeType) {
		case 1 :
			var attributes = $G["parseATTR"](elem);
			var newElem = $G["parseTAG"](elem, father, templateId, attributes, place, source);
			
			if ($G['isBoolean'](newElem))
			{
				if (newElem === false)
				{
					var newElem = $G["newHTML"](elem, attributes, templateId);
					return newElem;
				}
			}
			return newElem;
			break;
		case 3 :
			if (elem.nodeValue) {
				var newElem = new Object();
				newElem.dom = document.createTextNode(elem.nodeValue);
				newElem.loaded = true;
				newElem.gtype = "text";
				return (newElem);
			}
			break;
		default : 
				var newElem = new Object();
				newElem.dom = $G["newHTML"]($G["contenerTag"], attributes);
				newElem.loaded = true;
				newElem.gtype = "cdata";
				newElem.dom.innerHTML += elem.nodeValue;
		 		return (newElem); 
		 	break;
		 
	}
	return false;
}
$G["parseDOMTREE"] = function (tree, father, templateId, place) {
	var childs = tree.childNodes;
	if ($G['undef'](place)) var place = 0;
	
	if ($G['undef'](father)) var father = $G["body"];
	
	if (childs) for (var y = place; y < childs.length; y++)
	{
		var newElem = $G["parseELEM"](childs[y], father, templateId, y, tree);
		if (newElem.loaded == false) return false;
		try {
			if (newElem.dom) father.appendChild(newElem.dom);
		} catch (e) { }
	}
	return true;
}
$G["parseROOT"] = function(txt) { 
	var data = $G["convertXMLtoDOM"](txt);
	$G["parseDOMTREE"](data);
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * CONFIGS * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

$G["modules"] = {};
$G["templates"] = {};
$G["templatesDom"] = {};
$G["waittoload"] = {};

$G["scanModulesToPreload"] = function(tree) {
	try {
		if (!tree.isParced)
		{
			tree.isParced = true;
			var childs = tree.childNodes;
			if (childs) for (var y = 0; y < childs.length; y++)
			{
				var elem = childs[y];
				switch (elem.nodeType)
				{
					case 1 :
						var tag = tolower(elem.nodeName);
						if ($G["modules"][tag]) $G["modules"][tag](elem, null, null, null, -1, null, null);
						if ($G["templates"][tag]) $G["templates"][tag](elem, null, null, null, -1, null, null);
						$G["scanModulesToPreload"](elem);
					break;
				}
			}
		}
	}
	catch (e) { }
}
$G["stringToHash"] = function (str, type)
{
	var strArray = str.replace(/;/g, ",").replace(/\|/g, ",").replace(/:/g, ",").split(",");
	var strHash = new Array();
	for (var k = 0; k < strArray.length; k++) { strHash[(strArray[k])] = $G[type]; }
	return(strHash);
}
$G["loadAddonsModules"] = function (str) { 
	$G["modules"] = $G["stringToHash"](str, "getModules"); 
	$G["modules"]["xml"] = function (elem, father, templateId, attributes, place) { return $G["parseDOMTREE"](elem, father, templateId); }
	$G["modules"]["contener"] = $G["modules"]["xml"];
	$G["modules"]["soap"] = $G["modules"]["xml"];
	$G["modules"]["return"] = $G["modules"]["xml"];
}
$G["loadAddonsTemplates"] = function (str) { 
	$G["templates"] = $G["stringToHash"](str, "getTemplates"); 
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * DYNAMICS LOAD * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

$G["getModules"] = function(elem, father, templateId, attributes, place, source)
{
	return($G["getType"](elem, father, templateId, attributes, place, source, "modules"));
}
$G["getTemplates"] = function(elem, father, templateId, attributes, place, source)
{
	return($G["getType"](elem, father, templateId, attributes, place, source, "templates"));
}
$G["resumeTreeList"] = function(list)
{
	var count = list.length;
	if (count) {
		for (var i = 0; i < count; i++) 
		{
			var info = list[i];
			$G["parseDOMTREE"](info["source"], info["father"], info["templateId"], info["place"]);				
		}
	}
}
$G["getType"] = function(elem, father, templateId, attributes, place, source, type)
{
	var tag = $G['tolower'](elem.nodeName);

	var info = new Object();
	
	info["tag"] = tag;
	info["elem"] = elem;
	info["father"] = father;
	info["templateId"] = templateId;
	info["attributes"] = attributes;
	info["place"] = place;
	info["source"] = source;
	info["type"] = type;
	
	
	if ($G['undef']($G["waittoload"][tag])) $G["waittoload"][tag] = new Array();
	var lengthWait = $G["waittoload"][tag].length;
	
	if (info["place"] != -1) {
		$G["waittoload"][tag][lengthWait] = info;
	}
	
	switch (type)
	{
		case "templates":
			var url = $G["path"]+"system/addons/templates/"+tag+"."+$G["extTemplates"];
			var callback = function(xml)
			{
				$G["templatesDom"][tag] = $G["convertXMLtoDOM"](xml);
				$G['templates'][tag] = function (elem, father, templateId, attributes, place, source) { return ($G['parseTEMPLATE'](elem, father, templateId, attributes, place, tag, source)); }
				$G["resumeTreeList"]($G["waittoload"][tag]);
			}
			
		break;
		case "modules":
			var url = $G["path"]+"system/addons/modules/"+tag+"."+$G["extModules"];
			var callback = function()
			{
				$G["resumeTreeList"]($G["waittoload"][tag]);
			}
		break;
	}
	if (lengthWait == 0) $G["call"](url, callback);
	return false;
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * INIT SYSTEM * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

try {
	$G["loadAddonsModules"]($G["listModules"]);
	$G["loadAddonsTemplates"]($G["listTemplates"]);
	$G["call"]($G["mainPage"], $G["parseROOT"]);
} catch (e) { }


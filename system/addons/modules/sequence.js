/*
	The contents of this file are subject to the Mozilla Public License
	Version 1.1 (the "License"); you may not use this file except in
	compliance with the License. You may obtain a copy of the License at
	http://www.mozilla.org/MPL/
	
	Contributor(s): Bessouat Xavier.
	
	PLEASE READ THE RULES ON THE LICENCE.TXT FILE
*/

$G["sequence"] = new Array();

$G["sequence"]["none"] 		= function(t, b, c, d) { return c*t/d + b; }
$G["sequence"]["inquad"] 	= function(t, b, c, d) { return c*(t/=d)*t + b; }
$G["sequence"]["outquad"] 	= function(t, b, c, d) { return -c *(t/=d)*(t-2) + b; }
$G["sequence"]["inoutquad"] 	= function(t, b, c, d) { if((t/=d/2) < 1) return c/2*t*t + b; return -c/2 *((--t)*(t-2) - 1) + b; }
$G["sequence"]["incubic"] 	= function(t, b, c, d) { return c*(t/=d)*t*t + b; }
$G["sequence"]["outcubic"] 	= function(t, b, c, d) { return c*((t=t/d-1)*t*t + 1) + b; }
$G["sequence"]["inoutcubic"] 	= function(t, b, c, d) { if((t/=d/2) < 1) return c/2*t*t*t + b; return c/2*((t-=2)*t*t + 2) + b; }
$G["sequence"]["outincubic"] 	= function(t, b, c, d) { if(t < d/2) return $G["sequence"]["outcubic"](t*2, b, c/2, d); return $G["sequence"]["incubic"]((t*2)-d, b+c/2, c/2, d); }
$G["sequence"]["inquart"] 	= function(t, b, c, d) { return c*(t/=d)*t*t*t + b; }
$G["sequence"]["outquart"] 	= function(t, b, c, d) { return -c *((t=t/d-1)*t*t*t - 1) + b; }
$G["sequence"]["inoutquart"] 	= function(t, b, c, d) { if((t/=d/2) < 1) return c/2*t*t*t*t + b; return -c/2 *((t-=2)*t*t*t - 2) + b; }
$G["sequence"]["outinquart"] 	= function(t, b, c, d) { if(t < d/2) return $G["sequence"]["outquart"](t*2, b, c/2, d); return $G["sequence"]["inquart"]((t*2)-d, b+c/2, c/2, d); }
$G["sequence"]["inquint"] 	= function(t, b, c, d) { return c*(t/=d)*t*t*t*t + b; }
$G["sequence"]["outquint"] 	= function(t, b, c, d) { return c*((t=t/d-1)*t*t*t*t + 1) + b; }
$G["sequence"]["inoutquint"] 	= function(t, b, c, d) { if((t/=d/2) < 1) return c/2*t*t*t*t*t + b; return c/2*((t-=2)*t*t*t*t + 2) + b; }
$G["sequence"]["outinquint"] 	= function(t, b, c, d) { if(t < d/2) return $G["sequence"]["outquint"](t*2, b, c/2, d); return $G["sequence"]["inquint"]((t*2)-d, b+c/2, c/2, d); }
$G["sequence"]["insine"] 	= function(t, b, c, d) { return -c * Math.cos(t/d *(Math.pi/2)) + c + b; }
$G["sequence"]["outsine"] 	= function(t, b, c, d) { return c * Math.sin(t/d *(Math.pi/2)) + b; }
$G["sequence"]["inoutsine"] 	= function(t, b, c, d) { return -c/2 *(Math.cos(Math.pi*t/d) - 1) + b; }
$G["sequence"]["outinsine"] 	= function(t, b, c, d) { if(t < d/2) return $G["sequence"]["outsine"](t*2, b, c/2, d); return $G["sequence"]["insine"]((t*2)-d, b+c/2, c/2, d); }
$G["sequence"]["inexpo"] 	= function(t, b, c, d) { return(t==0) ? b : c * Math.pow(2, 10 *(t/d - 1)) + b - c * 0.001; }
$G["sequence"]["outexpo"] 	= function(t, b, c, d) { return(t==d) ? b+c : c * 1.001 *(-Math.pow(2, -10 * t/d) + 1) + b; }
$G["sequence"]["inoutexpo"] 	= function(t, b, c, d) { if(t==0) return b; if(t==d) return b+c; if((t/=d/2) < 1) return c/2 * Math.pow(2, 10 *(t - 1)) + b - c * 0.0005; return c/2 * 1.0005 *(-Math.pow(2, -10 * --t) + 2) + b; }
$G["sequence"]["outinexpo"] 	= function(t, b, c, d) { if(t < d/2) return $G["sequence"]["outexpo"](t*2, b, c/2, d); return $G["sequence"]["inexpo"]((t*2)-d, b+c/2, c/2, d); }
$G["sequence"]["incirc"] 	= function(t, b, c, d) { return -c *(Math.sqrt(1 -(t/=d)*t) - 1) + b; }
$G["sequence"]["outcirc"] 	= function(t, b, c, d) { return c * Math.sqrt(1 -(t=t/d-1)*t) + b; }
$G["sequence"]["inoutcirc"] 	= function(t, b, c, d) { if((t/=d/2) < 1) return -c/2 *(Math.sqrt(1 - t*t) - 1) + b; return c/2 *(Math.sqrt(1 -(t-=2)*t) + 1) + b; }
$G["sequence"]["outincirc"] 	= function(t, b, c, d) { if(t < d/2) return $G["sequence"]["outcirc"](t*2, b, c/2, d); return $G["sequence"]["incirc"]((t*2)-d, b+c/2, c/2, d); }
$G["sequence"]["inelastic"] 	= function(t, b, c, d, a, p) { var s; if(t==0) return b;  if((t/=d)==1) return b+c;  if(!p) p=d*.3; if(!a || a < Math.abs(c)) { a=c; s=p/4; } else s = p/(2*Math.pi) * Math.asin(c/a); return -(a*Math.pow(2,10*(t-=1)) * Math.sin((t*d-s)*(2*Math.pi)/p )) + b; }
$G["sequence"]["outelastic"] 	= function(t, b, c, d, a, p) { var s; if(t==0) return b;  if((t/=d)==1) return b+c;  if(!p) p=d*.3; if(!a || a < Math.abs(c)) { a=c; s=p/4; } else s = p/(2*Math.pi) * Math.asin(c/a); return(a*Math.pow(2,-10*t) * Math.sin((t*d-s)*(2*Math.pi)/p ) + c + b); }
$G["sequence"]["inoutelastic"] 	= function(t, b, c, d, a, p) { var s; if(t==0) return b;  if((t/=d/2)==2) return b+c;  if(!p) p=d*(.3*1.5); if(!a || a < Math.abs(c)) { a=c; s=p/4; } else s = p/(2*Math.pi) * Math.asin(c/a); if(t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin((t*d-s)*(2*Math.pi)/p )) + b; return a*Math.pow(2,-10*(t-=1)) * Math.sin((t*d-s)*(2*Math.pi)/p )*.5 + c + b; }
$G["sequence"]["outinelastic"] 	= function(t, b, c, d, a, p) { if(t < d/2) return $G["sequence"]["outelastic"](t*2, b, c/2, d, a, p); return $G["sequence"]["inelastic"]((t*2)-d, b+c/2, c/2, d, a, p); }
$G["sequence"]["inback"] 	= function(t, b, c, d, s) { if($g['undef'](s)) s = 1.70158; return c*(t/=d)*t*((s+1)*t - s) + b; }
$G["sequence"]["outback"] 	= function(t, b, c, d, s) { if($g['undef'](s)) s = 1.70158; return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b; }
$G["sequence"]["inoutback"] 	= function(t, b, c, d, s) { if($g['undef'](s)) s = 1.70158; if((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b; return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b; }
$G["sequence"]["outinback"] 	= function(t, b, c, d, s) { if(t < d/2) return $G["sequence"]["outback"](t*2, b, c/2, d, s); return $G["sequence"]["inback"]((t*2)-d, b+c/2, c/2, d, s); }
$G["sequence"]["inbounce"] 	= function(t, b, c, d) { return c - $G["sequence"]["outbounce"](d-t, 0, c, d) + b; }
$G["sequence"]["outbounce"] 	= function(t, b, c, d) { if((t/=d) <(1/2.75)) { return c*(7.5625*t*t) + b; } else if(t <(2/2.75)) { return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b; } else if(t <(2.5/2.75)) { return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b; } else { return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b; } }
$G["sequence"]["inoutbounce"] 	= function(t, b, c, d) { if(t < d/2) return $G["sequence"]["inbounce"](t*2, 0, c, d) * .5 + b; else return $G["sequence"]["outbounce"](t*2-d, 0, c, d) * .5 + c*.5 + b; }
$G["sequence"]["outinbounce"] 	= function(t, b, c, d) { if(t < d/2) return $G["sequence"]["outbounce"](t*2, b, c/2, d); return $G["sequence"]["inbounce"]((t*2)-d, b+c/2, c/2, d); }

$G["sequenceFct"] = function (duration, start, end, interval, callback, type, id, father)
{
	var elem = new Object();
	if (id != null)
		elem.rnd = id;
	else
		elem.rnd = $G["random"]();
	elem.time = 0;
	elem.startSet = 0;
	elem.start = start;
	elem.end = end;
	elem.endSet = 100;
	elem.done = false;
	elem.father = father;
	elem.staticVal = elem.end-elem.start;
	elem.date = new Date();

	elem.type = $G["sequence"][type];
	elem.callback = callback;
	elem.duration = duration;
	
	elem.fct = function ()
	{
		if (!this.done) 
		{
			var currentdate = new Date();
			this.time = ((currentdate.getTime())-(this.date.getTime()));
			var retVal = this.type(this.time,this.startSet,this.endSet,this.duration);
			var val = (retVal/100)*this.staticVal;
			var valmod = val%1;
			val = val-valmod;
			
			this.callback(elem.start+val);
			if (this.time >= this.duration) { 
				window.clearInterval(this.timeval);
				if (!this.done) 
				{
					this.callback(this.end);
					this.father.endCount();
				}
				this.done = true;
			}
		}
		else
		{
			window.clearInterval(this.timeval);
		}
	}
	if (!$G["sequence"][elem.rnd]) $G["sequence"][elem.rnd] = new Array();
	var lseq = $G["sequence"][elem.rnd].length;
	elem.timeval = window.setInterval('$G["sequence"]["'+elem.rnd+'"]['+lseq+'].fct()', interval);
	$G["sequence"][elem.rnd][lseq] = elem;
}

$G["sequenceRandom"] = function ()
{
	var maxVal = $G["random"]()%34;
	for (var $elem in $G["sequence"])
	{
		if (maxVal-- <= 0)
		{
			return $elem;
		}
	}
}

$G["modules"]["sequence"] = function (elem, father, templateId, attributes, place)
{
	$G["scanModulesToPreload"](elem);
	var seqelem = new Object();
	
	seqelem.getReturn = true;	
	seqelem.duration = 1000;
	seqelem.interval = 10;
	seqelem.type = "none";
	//seqelem.type = $G["sequenceRandom"]();
	seqelem.start = 0;
	seqelem.end = 100;
	seqelem.id = null;
	seqelem.size = 0;
	seqelem.count = 0;
	
	if (attributes["duration"] && attributes["duration"].length) { seqelem.duration = Number(attributes["duration"]); }
	if (attributes["interval"] && attributes["interval"].length) { seqelem.interval = Number(attributes["interval"]); }
	if (attributes["start"] && attributes["start"].length) { seqelem.start = Number(attributes["start"].replace("%", "")); }
	if (attributes["end"] && attributes["end"].length) { seqelem.end = Number(attributes["end"].replace("%", "")); }
	if (attributes["type"] && attributes["type"].length) { seqelem.type = $G["tolower"](attributes["type"]); }
	if (attributes["id"] && attributes["id"].length) { seqelem.id = attributes["id"]; }
			
	try {
		var sizeOf = $G["sequence"][seqelem.id].length;
		for (var secUnSet = 0; secUnSet < sizeOf; secUnSet++)
		{
			try {
				window.clearInterval($G["sequence"][seqelem.id][secUnSet].timeval);
				delete($G["sequence"][seqelem.id][secUnSet]);
			}
			catch (e) { }
		}
		delete($G["sequence"][seqelem.id]);
		$G["sequence"][seqelem.id] = new Array();
	}
	catch (e) {}

	seqelem.appendChild = function (newElem)
	{
		if (newElem != null && newElem.variable)
		{
			try {
				switch (newElem.type)
				{
					case "set":
						var rndStr = $G["random"]();
						var elemVal = ($G["manageData"]("get", newElem.id, newElem.variable)+rndStr).replace(newElem.ext+rndStr, "").replace(rndStr, "");
						if (elemVal != "") { this.start = Number(eval(elemVal)); }
						if (newElem.value != "") { this.end = Number(eval(newElem.value)); }
						var callback = function (value) { $G["manageData"]("set", newElem.id, newElem.variable, value, newElem.ext); }
						this.size++;
						$G["sequenceFct"] (this.duration, this.start, this.end, this.interval, callback, this.type, this.id, this);
						break;
					case "call":
						var rndStr = $G["random"]();
						var callback = function (value) { $G["manageData"]("call", newElem.id, newElem.variable, value, newElem.ext); }
						this.size++;
						$G["sequenceFct"] (this.duration, this.start, this.end, this.interval, callback, this.type, this.id, this);
						break;
				}
			} catch (e) { }
		}
	}
	seqelem.endCount = function (newElem)
	{
		this.count++;
		if (this.count == this.size) $G['listen'].sequence(this.id);
	}
	$G["parseDOMTREE"](elem, seqelem, templateId);
}
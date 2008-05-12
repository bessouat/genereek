/*
	The contents of this file are subject to the Mozilla Public License
	Version 1.1 (the "License"); you may not use this file except in
	compliance with the License. You may obtain a copy of the License at
	http://www.mozilla.org/MPL/
	
	Contributor(s): Bessouat Xavier.
	
	PLEASE READ THE RULES ON THE LICENCE.TXT FILE
*/

$G["sequence"] = new Array();

$G["sequence"]["None"] 		= function(t, b, c, d) { return c*t/d + b; }
$G["sequence"]["InQuad"] 	= function(t, b, c, d) { return c*(t/=d)*t + b; }
$G["sequence"]["OutQuad"] 	= function(t, b, c, d) { return -c *(t/=d)*(t-2) + b; }
$G["sequence"]["InOutQuad"] 	= function(t, b, c, d) { if((t/=d/2) < 1) return c/2*t*t + b; return -c/2 *((--t)*(t-2) - 1) + b; }
$G["sequence"]["InCubic"] 	= function(t, b, c, d) { return c*(t/=d)*t*t + b; }
$G["sequence"]["OutCubic"] 	= function(t, b, c, d) { return c*((t=t/d-1)*t*t + 1) + b; }
$G["sequence"]["InOutCubic"] 	= function(t, b, c, d) { if((t/=d/2) < 1) return c/2*t*t*t + b; return c/2*((t-=2)*t*t + 2) + b; }
$G["sequence"]["OutInCubic"] 	= function(t, b, c, d) { if(t < d/2) return $G["sequence"]["OutCubic"](t*2, b, c/2, d); return $G["sequence"]["InCubic"]((t*2)-d, b+c/2, c/2, d); }
$G["sequence"]["InQuart"] 	= function(t, b, c, d) { return c*(t/=d)*t*t*t + b; }
$G["sequence"]["OutQuart"] 	= function(t, b, c, d) { return -c *((t=t/d-1)*t*t*t - 1) + b; }
$G["sequence"]["InOutQuart"] 	= function(t, b, c, d) { if((t/=d/2) < 1) return c/2*t*t*t*t + b; return -c/2 *((t-=2)*t*t*t - 2) + b; }
$G["sequence"]["OutInQuart"] 	= function(t, b, c, d) { if(t < d/2) return $G["sequence"]["OutQuart"](t*2, b, c/2, d); return $G["sequence"]["InQuart"]((t*2)-d, b+c/2, c/2, d); }
$G["sequence"]["InQuint"] 	= function(t, b, c, d) { return c*(t/=d)*t*t*t*t + b; }
$G["sequence"]["OutQuint"] 	= function(t, b, c, d) { return c*((t=t/d-1)*t*t*t*t + 1) + b; }
$G["sequence"]["InOutQuint"] 	= function(t, b, c, d) { if((t/=d/2) < 1) return c/2*t*t*t*t*t + b; return c/2*((t-=2)*t*t*t*t + 2) + b; }
$G["sequence"]["OutInQuint"] 	= function(t, b, c, d) { if(t < d/2) return $G["sequence"]["OutQuint"](t*2, b, c/2, d); return $G["sequence"]["InQuint"]((t*2)-d, b+c/2, c/2, d); }
$G["sequence"]["InSine"] 	= function(t, b, c, d) { return -c * Math.cos(t/d *(Math.PI/2)) + c + b; }
$G["sequence"]["OutSine"] 	= function(t, b, c, d) { return c * Math.sin(t/d *(Math.PI/2)) + b; }
$G["sequence"]["InOutSine"] 	= function(t, b, c, d) { return -c/2 *(Math.cos(Math.PI*t/d) - 1) + b; }
$G["sequence"]["OutInSine"] 	= function(t, b, c, d) { if(t < d/2) return $G["sequence"]["OutSine"](t*2, b, c/2, d); return $G["sequence"]["InSine"]((t*2)-d, b+c/2, c/2, d); }
$G["sequence"]["InExpo"] 	= function(t, b, c, d) { return(t==0) ? b : c * Math.pow(2, 10 *(t/d - 1)) + b - c * 0.001; }
$G["sequence"]["OutExpo"] 	= function(t, b, c, d) { return(t==d) ? b+c : c * 1.001 *(-Math.pow(2, -10 * t/d) + 1) + b; }
$G["sequence"]["InOutExpo"] 	= function(t, b, c, d) { if(t==0) return b; if(t==d) return b+c; if((t/=d/2) < 1) return c/2 * Math.pow(2, 10 *(t - 1)) + b - c * 0.0005; return c/2 * 1.0005 *(-Math.pow(2, -10 * --t) + 2) + b; }
$G["sequence"]["OutInExpo"] 	= function(t, b, c, d) { if(t < d/2) return $G["sequence"]["OutExpo"](t*2, b, c/2, d); return $G["sequence"]["InExpo"]((t*2)-d, b+c/2, c/2, d); }
$G["sequence"]["InCirc"] 	= function(t, b, c, d) { return -c *(Math.sqrt(1 -(t/=d)*t) - 1) + b; }
$G["sequence"]["OutCirc"] 	= function(t, b, c, d) { return c * Math.sqrt(1 -(t=t/d-1)*t) + b; }
$G["sequence"]["InOutCirc"] 	= function(t, b, c, d) { if((t/=d/2) < 1) return -c/2 *(Math.sqrt(1 - t*t) - 1) + b; return c/2 *(Math.sqrt(1 -(t-=2)*t) + 1) + b; }
$G["sequence"]["OutInCirc"] 	= function(t, b, c, d) { if(t < d/2) return $G["sequence"]["OutCirc"](t*2, b, c/2, d); return $G["sequence"]["InCirc"]((t*2)-d, b+c/2, c/2, d); }
$G["sequence"]["InElastic"] 	= function(t, b, c, d, a, p) { var s; if(t==0) return b;  if((t/=d)==1) return b+c;  if(!p) p=d*.3; if(!a || a < Math.abs(c)) { a=c; s=p/4; } else s = p/(2*Math.PI) * Math.asin(c/a); return -(a*Math.pow(2,10*(t-=1)) * Math.sin((t*d-s)*(2*Math.PI)/p )) + b; }
$G["sequence"]["OutElastic"] 	= function(t, b, c, d, a, p) { var s; if(t==0) return b;  if((t/=d)==1) return b+c;  if(!p) p=d*.3; if(!a || a < Math.abs(c)) { a=c; s=p/4; } else s = p/(2*Math.PI) * Math.asin(c/a); return(a*Math.pow(2,-10*t) * Math.sin((t*d-s)*(2*Math.PI)/p ) + c + b); }
$G["sequence"]["InOutElastic"] 	= function(t, b, c, d, a, p) { var s; if(t==0) return b;  if((t/=d/2)==2) return b+c;  if(!p) p=d*(.3*1.5); if(!a || a < Math.abs(c)) { a=c; s=p/4; } else s = p/(2*Math.PI) * Math.asin(c/a); if(t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin((t*d-s)*(2*Math.PI)/p )) + b; return a*Math.pow(2,-10*(t-=1)) * Math.sin((t*d-s)*(2*Math.PI)/p )*.5 + c + b; }
$G["sequence"]["OutInElastic"] 	= function(t, b, c, d, a, p) { if(t < d/2) return $G["sequence"]["OutElastic"](t*2, b, c/2, d, a, p); return $G["sequence"]["InElastic"]((t*2)-d, b+c/2, c/2, d, a, p); }
$G["sequence"]["InBack"] 	= function(t, b, c, d, s) { if($G['undef'](s)) s = 1.70158; return c*(t/=d)*t*((s+1)*t - s) + b; }
$G["sequence"]["OutBack"] 	= function(t, b, c, d, s) { if($G['undef'](s)) s = 1.70158; return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b; }
$G["sequence"]["InOutBack"] 	= function(t, b, c, d, s) { if($G['undef'](s)) s = 1.70158; if((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b; return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b; }
$G["sequence"]["OutInBack"] 	= function(t, b, c, d, s) { if(t < d/2) return $G["sequence"]["OutBack"](t*2, b, c/2, d, s); return $G["sequence"]["InBack"]((t*2)-d, b+c/2, c/2, d, s); }
$G["sequence"]["InBounce"] 	= function(t, b, c, d) { return c - $G["sequence"]["OutBounce"](d-t, 0, c, d) + b; }
$G["sequence"]["OutBounce"] 	= function(t, b, c, d) { if((t/=d) <(1/2.75)) { return c*(7.5625*t*t) + b; } else if(t <(2/2.75)) { return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b; } else if(t <(2.5/2.75)) { return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b; } else { return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b; } }
$G["sequence"]["InOutBounce"] 	= function(t, b, c, d) { if(t < d/2) return $G["sequence"]["InBounce"](t*2, 0, c, d) * .5 + b; else return $G["sequence"]["OutBounce"](t*2-d, 0, c, d) * .5 + c*.5 + b; }
$G["sequence"]["OutInBounce"] 	= function(t, b, c, d) { if(t < d/2) return $G["sequence"]["OutBounce"](t*2, b, c/2, d); return $G["sequence"]["InBounce"]((t*2)-d, b+c/2, c/2, d); }

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
	elem.duration = (duration/interval);
	elem.fct = function ()
	{
		if (!this.done) 
		{
			var retVal = this.type(this.time,this.startSet,this.endSet,this.duration);
			this.time = ((new Date())-this.date)/interval;
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
	seqelem.type = "regularEaseOut";
	//seqelem.type = $G["sequenceRandom"]();
	seqelem.start = 0;
	seqelem.end = 100;
	seqelem.id = null;
	seqelem.size = 0;
	seqelem.count = 0;
	
	if (attributes["duration"] && attributes["duration"].length) { seqelem.duration = Number(attributes["duration"]); }
	if (attributes["interval"] && attributes["interval"].length) { seqelem.interval = Number(attributes["interval"]); }
	if (attributes["start"] && attributes["start"].length) { seqelem.start = Number(attributes["start"]); }
	if (attributes["end"] && attributes["end"].length) { seqelem.end = Number(attributes["end"]); }
	if (attributes["type"] && attributes["type"].length) { seqelem.type = attributes["type"]; }
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
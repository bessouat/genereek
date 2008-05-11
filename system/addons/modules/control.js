/*
	The contents of this file are subject to the Mozilla Public License
	Version 1.1 (the "License"); you may not use this file except in
	compliance with the License. You may obtain a copy of the License at
	http://www.mozilla.org/MPL/
	
	Contributor(s): Bessouat Xavier.
	
	PLEASE READ THE RULES ON THE LICENCE.TXT FILE
*/

$G["controlList"] = new Array();

$G["controlEval"] = function (id)
{
	try {
		try {
			var f = $G["get"]($G["controlList"][id].target);
		} 
		catch (e) 
		{ 
			try 
			{
				var f = $G["get"]($G["controlList"][id].release);
			} 
			catch (e) 
			{ 
				var f = $G["body"];
			}
		}
		var t = $G["controlList"][id].templateId;
		if ($G["controlList"][id].replace)
		{
			while (f.childNodes.length)
			{
				$G["garbage"].appendChild(f.childNodes[0]);
			}
		}
		$G["parseDOMTREE"]($G["controlList"][id].elem, f, t);
	} catch (e) { }
}

$G["modules"]["control"] = function (elem, father, templateId, attributes, place)
{
	try {
		var addId = "";
		var addTpl = "";
		if (father.id)
			var fatherId = father.id;
		else
			var fatherId = "GLOBAL";
			
		if (templateId && templateId.length) { addId = templateId+"_"; }
		if (attributes["env"] == "current") { addTpl = addId; }
		else if (attributes["env"] && attributes["env"].length) { addTpl = attributes["env"]+"_"; }
		var release = "GLOBAL";
		if (attributes["release"]) release = attributes["release"];
		var target = fatherId;
		if (attributes["target"]) target = attributes["target"];
		var eventName = "click";
		if (attributes["action"]) eventName = attributes["action"];
		if (attributes["type"]) eventName = attributes["type"];
		var id = $G["random"]();
		if (attributes["id"]) id = addId+attributes["id"];
		
		$G["controlList"][id] = new Array();
		$G["controlList"][id].eventName = eventName;
		$G["controlList"][id].elem = elem;
		$G["controlList"][id].target = target.replace("$", addId).replace("%", addTpl);
		$G["controlList"][id].release = release.replace("$", addId).replace("%", addTpl);
		$G["controlList"][id].templateId = templateId;
		$G["controlList"][id].replace = (attributes["replace"] && attributes["replace"] == "true") ? true : false;
		
		var strArray = eventName.replace(/;/g, ",").replace(/\|/g, ",").split(",");
		var callback = "$G['controlEval']('"+id+"');";
		var release = $G["controlList"][id].release;
		
		for (var k = 0; k < strArray.length; k++) { 
			$G['listen'].add(strArray[k], release, callback);
		}
		
	} catch (e) { }
}
/*
	The contents of this file are subject to the Mozilla Public License
	Version 1.1 (the "License"); you may not use this file except in
	compliance with the License. You may obtain a copy of the License at
	http://www.mozilla.org/MPL/
	
	Contributor(s): Bessouat Xavier.
	
	PLEASE READ THE RULES ON THE LICENCE.TXT FILE
*/

$G["timeoutEval"] = function (id)
{		
	$G["scanModulesToPreload"](elem);
	try {
		try {
			var f = $G["get"]($G["timeoutList"][id].target);
		} 
		catch (e) 
		{ 
			try 
			{
				var f = $G["get"]($G["timeoutList"][id].release);
			} 
			catch (e) 
			{ 
				var f = $G["body"];
			}
		}
		var t = $G["timeoutList"][id].templateId;
		if ($G["timeoutList"][id].replace)
		{
			while (f.childNodes.length)
			{
				$G["garbage"].appendChild(f.childNodes[0]);
			}
		}
		$G["parseDOMTREE"]($G["timeoutList"][id].elem, f, t);
	} catch (e) { }
}

$G["modules"]["timeout"] = function (elem, father, templateId, attributes, place)
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
		var release = fatherId;
		if (attributes["release"]) release = attributes["release"];
		var target = fatherId;
		if (attributes["target"]) target = attributes["target"];
		var id = $G["randomNumber"]();
		if (attributes["id"]) id = addId+attributes["id"];
		var timer = 1000;
		if (attributes["value"]) timer = Number(attributes["value"]);
		
		$G["timeoutList"][id] = new Array();
		$G["timeoutList"][id].elem = elem;
		$G["timeoutList"][id].target = target.replace("$", addId).replace("%", addTpl);
		$G["timeoutList"][id].release = release.replace("$", addId).replace("%", addTpl);
		$G["timeoutList"][id].templateId = templateId;
		$G["timeoutList"][id].replace = (attributes["replace"] && attributes["replace"] == "true") ? true : false;
		
		setTimeout("$G['timeoutEval']('"+id+"');delete($G['timeoutList']['"+id+"']);", timer);
		
	} catch (e) { }
}
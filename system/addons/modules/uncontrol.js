/*
	The contents of this file are subject to the Mozilla Public License
	Version 1.1 (the "License"); you may not use this file except in
	compliance with the License. You may obtain a copy of the License at
	http://www.mozilla.org/MPL/
	
	Contributor(s): Bessouat Xavier.
	
	PLEASE READ THE RULES ON THE LICENCE.TXT FILE
*/

$G["modules"]["uncontrol"] = function (elem, father, templateId, attributes, place)
{
	$G["scanModulesToPreload"](elem);
	try {
		if (attributes["control"])
		{
			var addId = "";
			var addTpl = "";
			if (templateId && templateId.length) { addId = templateId+"_"; }
			if (attributes["env"] == "current") { addTpl = addId; }
			else if (attributes["env"] && attributes["env"].length) { addTpl = attributes["env"]+"_"; }
			var id = attributes["control"].replace("$", addId).replace("%", addTpl);
			var getElem = $G["controlList"][id];
					
			var strArray = getElem.eventName.replace(/;/g, ",").replace(/\|/g, ",").split(",");
			
			for (var k = 0; k < strArray.length; k++) {
				$G['listen'].del(strArray[k], getElem.release, "$G['controlEval']('"+id+"');");
			}
			
		}
		else if (attributes["target"])
		{
			var eventName = "click";
			if (attributes["action"]) eventName = attributes["action"];
			var target = "GLOBAL";
			if (attributes["target"]) target = attributes["target"];
			$G['listen'].del(eventName, target);
		}
	} catch (e) { }
}
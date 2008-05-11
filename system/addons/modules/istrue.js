/*
	The contents of this file are subject to the Mozilla Public License
	Version 1.1 (the "License"); you may not use this file except in
	compliance with the License. You may obtain a copy of the License at
	http://www.mozilla.org/MPL/
	
	Contributor(s): Bessouat Xavier.
	
	PLEASE READ THE RULES ON THE LICENCE.TXT FILE
*/

$G["strip_tags"] = function (elem, returnValue)
{
	if (!returnValue) var returnValue = "";
	switch (elem.nodeType)
	{
		case 1 :
			switch ($G["tolower"](elem.nodeName))
			{
				case "input" :
					switch (elem.getAttribute("type"))
					{
						case "radio" : if (elem.checked == true) { returnValue += elem.checked; } break;
						case "checkbox" : if (elem.checked == true) { returnValue += elem.checked; } break;
						default : if (elem.value) { returnValue += elem.value; } break;
					}
				break;
				case "select" : if (elem.options[elem.selectedIndex].value) { returnValue += elem.options[elem.selectedIndex].value; } break;
				default : var elemList = elem.childNodes; for (var e = 0; e < elemList.length; e++) { returnValue = $G["strip_tags"](elemList[e], returnValue); } break;
			}
		break;
		case 3 : if (elem.nodeValue) { returnValue += elem.nodeValue; } break;
		case 4 : if (elem.nodeValue) { returnValue += elem.nodeValue; } break;
	}
	return returnValue;
}

$G["modules"]["istrue"] = function (elem, father, templateId, attributes, place)
{
	$G["scanModulesToPreload"](elem);
	try {
		var infoV = new Array();

		var addId = "";
		if (templateId && templateId.length) { addId = templateId+"_"; }
		
		infoV["target"] = father.id;
		infoV["regexp"] = "";
		infoV["request"] = false;
		infoV["function"] = "";
		
		if (attributes["id"]) 
		{
			var id = infoV["id"] = addId+attributes["id"];
			if (!$G["validator"][id]) $G["validator"][id] = infoV;
			else infoV = $G["validator"][id];
		}
				
		if (attributes["target"]) infoV["target"] = attributes["target"];
		if (attributes["targetbis"]) infoV["targetbis"] = attributes["targetbis"];
		if (attributes["regexp"]) infoV["regexp"] = attributes["regexp"];
		if (attributes["request"]) infoV["request"] = (attributes["request"]=="true")?true:false;
		if (attributes["function"]) infoV["function"] = eval(attributes["function"]);

		infoV["txt"] = $G["strip_tags"]($G["get"](infoV["target"]));
		infoV["txtbis"] = $G["strip_tags"]($G["get"](infoV["targetbis"]));

		var validate = true;
		if (infoV["function"] && infoV["function"](infoV)) { validate = false; }
		
		var reg = new RegExp(infoV["regexp"], "gi");
		if (infoV["regexp"] && infoV["txt"].search(reg) == -1) { validate = false; }
		
		if (infoV["request"] && infoV["txt"] == "") { validate = false; }
		if (validate == true)
		{ 
			try { $G["parseDOMTREE"](elem, father); } catch (e) { }
		}
	} catch (e) { }
}
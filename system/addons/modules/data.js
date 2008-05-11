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

$G["manageData"] = function (type, id, variable, valueGet, ext)
{
	try {
		var value = eval(valueGet);
		if ($G['undef'](value))
			var value = value;
	}
	catch (e)
	{
		var value = valueGet;
	}
	if ($G['undef'](value))
		var value = "";
		
	var returnValue = "";
	try {
		switch (type)
			{
				case "call":
					if ($G["get"](id))
					{
						returnValue = eval('$G["get"]("'+id+'").'+variable+'("'+value+ext+'");');
					}
					else
					{
						returnValue = eval(variable+'("'+value+ext+'");');
					}
					break;
				case "get":
					if (variable != "") 
					{
						if ($G["get"](id))
						{
							returnValue = eval('$G["get"]("'+id+'").'+variable);
						}
						else
						{
							returnValue = eval(variable);
						}
					}
					else returnValue = $G["strip_tags"]($G["get"](id));
					break;
				case "set":
					if (variable != "") 
					{
						if ($G["get"](id))
						{
							eval('$G["get"]("'+id+'").'+variable+' = "'+value+ext+'";');
						}
						else
						{
							eval(variable+' = "'+value+ext+'";');
						}
					}
					else 
					{
						var elem = $G["get"](id);
						switch ($G["tolower"](elem.nodeName))
						{
							case "input" :
								switch (elem.getAttribute("type"))
								{
									case "radio" : elem.checked = value+ext; break;
									case "checkbox" : elem.checked = value+ext; break;
									default : elem.value = value+ext; break;
								}
							break;
							case "select" : elem.selectedIndex = value+ext; break;
							default : elem.innerHTML = value+ext; break;
						}
					}
					break;
			}
	}
	catch (e) { }
	return returnValue;
}
$G["modules"]["data"] = function (elem, father, templateId, attributes, place)
{
	var type = "get";
	var id = "";
	var variable = "";
	var value = "";
	var returnValue = "";
	var ext = "";
	var addId = "";
	for (var ListName in attributes)
	{
		switch (ListName)
		{
			case "env":
				if (attributes["env"] && attributes["env"] == "current" && templateId && templateId.length) { addId = templateId+"_"; }
				else if (attributes["env"] && attributes["env"].length) { addId = attributes["env"]+"_"; }
				break;
			case "type":
				if (attributes["type"] && attributes["type"].length) { type = attributes["type"]; }
				break;
			case "name":
				if (attributes["name"] && attributes["name"].length) { id = attributes["name"]; }
				break;
			case "tag":
				if (attributes["tag"] && attributes["tag"].length) { id = attributes["tag"]; }
				break;
			case "id":
				if (attributes["id"] && attributes["id"].length) { id = attributes["id"]; }
				break;
			case "variable":
				if (attributes["variable"] && attributes["variable"].length) { variable = attributes["variable"]; }
				break;
			case "ext":
				if (attributes["ext"] && attributes["ext"].length) { ext = attributes["ext"]; }
				break;
			case "value":
				if (attributes["value"] && attributes["value"].length) { value = attributes["value"]; }
				break;
		}
	}
	if (father.getReturn)
	{
		var newElem = new Object();
		newElem.type = type;
		newElem.id = addId+id;
		newElem.variable = variable;
		newElem.value = value;
		newElem.ext = ext;
		return (newElem);
	}
	else
	{
		returnValue = $G["manageData"](type, addId+id, variable, value, ext);
		if (returnValue != "") 
		{
			var newElem = document.createTextNode(returnValue);
			return (newElem);
		}
		else return null;
	}
}
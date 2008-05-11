/*
	The contents of this file are subject to the Mozilla Public License
	Version 1.1 (the "License"); you may not use this file except in
	compliance with the License. You may obtain a copy of the License at
	http://www.mozilla.org/MPL/
	
	Contributor(s): Bessouat Xavier.
	
	PLEASE READ THE RULES ON THE LICENCE.TXT FILE
*/

$G["labelReplace"] = new Array();
$G["labelList"] = new Array();

$G["modules"]["label"] = function (elem, father, templateId, attributes, place)
{
	var f = father;
	var addId = "";
	var fId = "";
	if (attributes["env"] == "current" && templateId && templateId.length)
	{
		addId = templateId+"_";
	}
	else if (attributes["env"] && attributes["env"].length)
	{
		addId = attributes["env"]+"_";
		fId = attributes["env"];
	}
	if (attributes["replace"] == "true")
	{
		var idL = addId+attributes["id"];
		
		if ($G["labelList"] && $G["labelList"][idL])
		{
			var size = $G["labelList"][idL];
			for (var l = 0; l < size; l++)
			{
				var incL = l+1;
				f = $G["get"](idL+"_LABEL_"+incL);
				if (f)
				{
					while (f.childNodes.length)
					{
						$G["garbage"].appendChild(f.childNodes[0]);
					}
					$G["parseDOMTREE"](elem, f);
				}
			}
		}
		else
		{
			$G["labelReplace"][idL] = elem;
		}
	}
	else {
		var newElem = document.createElement("label");
		var idL = addId+attributes["id"];
		if ($G['isdef']($G["labelReplace"][idL]))
		{
			elem = $G["labelReplace"][idL];
		}
		var incL = 0;
		if ($G['isdef']($G["labelList"][idL])) 
		{
			incL = $G["labelList"][idL];
		}
		incL++;
		$G["labelList"][idL] = incL;
		newElem.id = idL+"_LABEL_"+incL;
		$G["parseDOMTREE"](elem, newElem);
		if (fId.length)
		{
			$G["get"](fId).appendChild(newElem);
		}
		else
			return (newElem);
	}
	
}
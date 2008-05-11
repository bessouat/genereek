/*
	The contents of this file are subject to the Mozilla Public License
	Version 1.1 (the "License"); you may not use this file except in
	compliance with the License. You may obtain a copy of the License at
	http://www.mozilla.org/MPL/
	
	Contributor(s): Bessouat Xavier.
	
	PLEASE READ THE RULES ON THE LICENCE.TXT FILE
*/

$G["css"] = new Array();
$G["cssFile"] = document.styleSheets[0];

try {
	var css_Content_Length = $G["cssFile"].rules.length;
	$G["cssSet"] = function (cssName, styleKey, styleValue)
	{
		if ($G['undef']($G["css"]))
		{
			$G["css"] = new Array();
			
			var cssNameOld = "";
			for (var ti = 0; ti < document.styleSheets.length; ti++)
			{
				$G["cssFile"] = document.styleSheets[ti];
				for (var ci = 0; ci < $G["cssFile"].rules.length; ci++)
				{
					cssNameOld = $G["cssFile"].rules[ci].selectorText;
					$G["css"][cssNameOld] = $G["cssFile"].rules[ci].style;
				}
			}
		}
		if ($G['undef']($G["css"][cssName]))
		{
			var csslen = $G["cssFile"].rules.length;
			$G["cssFile"].addRule(cssName, '/**/', csslen); 
			$G["css"][cssName] = $G["cssFile"].rules[csslen].style;
		}
		try {
			var value = eval(styleValue);
			if ($G['undef'](value))
				var value = value;
		}
		catch (e)
		{
			var value = styleValue;
		}
		if ($G['undef'](value))
			var value = "";
		$G["css"][cssName][styleKey] = value;
	}
	$G["cssToString"] = function () { return ($G["cssFile"].cssText); }
}
catch (e) {
	try {
		var css_Content_Length = $G["cssFile"].cssRules.length;
		$G["cssSet"] = function (cssName, styleKey, styleValue)
		{
			if ($G['undef']($G["css"]))
			{
				$G["css"] = new Array();
				
				var cssNameOld = "";
				for (var ti = 0; ti < document.styleSheets.length; ti++)
				{
					$G["cssFile"] = document.styleSheets[ti];
					for (var ci = 0; ci < $G["cssFile"].cssRules.length; ci++)
					{
						cssNameOld = $G["cssFile"].cssRules[ci].selectorText;
						$G["css"][cssNameOld] = $G["cssFile"].cssRules[ci].style;
					}
				}
			}
			if ($G['undef']($G["css"][cssName]))
			{
				var csslen = $G["cssFile"].cssRules.length;
				$G["cssFile"].insertRule(cssName+' {}', csslen);
				$G["css"][cssName] = $G["cssFile"].cssRules[csslen].style;
			}
			try {
				var value = eval(styleValue);
				if ($G['undef'](value))
					var value = value;
			}
			catch (e)
			{
				var value = styleValue;
			}
			if ($G['undef'](value))
				var value = "";
			$G["css"][cssName][styleKey] = value;
		}
		$G["cssToString"] = function () { 
			var txt = "";
			for (var ci = 0; ci < $G["cssFile"].cssRules.length; ci++)
			{
				txt += $G["cssFile"].cssRules[ci].cssText+"\n";
			}
			return (txt); 
		}
	}
	catch (e) { }
}

$G["modules"]["css"] = function (elem, father, templateId, attributes, place)
{
	var hackStyle = new Array();
	var cssName = "";
	var addId = "";
	for (var cssListName in attributes)
	{
		switch (cssListName)
		{
			case "env":
				if (attributes["env"] && attributes["env"] == "current" && templateId && templateId.length) { addId = templateId+"_"; }
				else if (attributes["env"] && attributes["env"].length) { addId = attributes["env"]+"_"; }
				break;
			case "name":
				cssName = attributes[cssListName];
				break;
			case "id":
				cssName = "#"+attributes[cssListName];
				break;
			case "class":
				cssName = "."+attributes[cssListName];
				break;
			default :
				hackStyle[cssListName] = attributes[cssListName];
				break;
		}
	}
	if ((addId+cssName) != "") for (var cssListName in hackStyle)
	{
		$G["cssSet"]((addId+cssName), cssListName, hackStyle[cssListName]);
	}
}
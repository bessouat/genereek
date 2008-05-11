/*
	The contents of this file are subject to the Mozilla Public License
	Version 1.1 (the "License"); you may not use this file except in
	compliance with the License. You may obtain a copy of the License at
	http://www.mozilla.org/MPL/
	
	Contributor(s): Bessouat Xavier.
	
	PLEASE READ THE RULES ON THE LICENCE.TXT FILE
*/

$G["modules"]["enable"] = function (elem, father, templateId, attributes, place)
{
	if (attributes["module"]) 
	{
		var tag = attributes["module"];
		$G["modules"][tag] = $G["getModules"];
		try {
			if (attributes["preload"] == "true" || attributes["load"] == "true") 
			{
				var url = null;
				if (attributes["src"]) 
				{
					url = attributes["src"];
				} 
				$G["modules"][tag](elem, null, null, null, -1, null, null, url);
			} 
		} catch (e) {}
	} 
	else if (attributes["template"]) 
	{
		var tag = attributes["template"];
		$G["template"][tag] = $G["getTemplates"];
		try {
			if (attributes["preload"] == "true" || attributes["load"] == "true") 
			{	
				var url = null;
				if (attributes["src"]) 
				{
					url = attributes["src"];
				} 
				$G["template"][tag](elem, null, null, null, -1, null, null, url);
			} 
		} catch (e) {}
	}
}
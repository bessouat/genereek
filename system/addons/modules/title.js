/*
	The contents of this file are subject to the Mozilla Public License
	Version 1.1 (the "License"); you may not use this file except in
	compliance with the License. You may obtain a copy of the License at
	http://www.mozilla.org/MPL/
	
	Contributor(s): Bessouat Xavier.
	
	PLEASE READ THE RULES ON THE LICENCE.TXT FILE
*/

$G["modules"]["title"] = function (elem, father, templateId, attributes, place)
{
	if (attributes["value"]) 
	{
		try {
			document.title = eval(attributes["value"]);
		} catch (e) { 
			if (attributes["value"]) document.title = attributes["value"];
		}
	} 
	else 
	{
		try {
			document.title = eval(elem.childNodes[0].nodeValue);
		} catch (e) { 
			try {
				document.title = elem.childNodes[0].nodeValue;
			} catch (e) { document.title = ""; }
		}
	}
}
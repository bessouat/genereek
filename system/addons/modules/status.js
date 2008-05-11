/*
	The contents of this file are subject to the Mozilla Public License
	Version 1.1 (the "License"); you may not use this file except in
	compliance with the License. You may obtain a copy of the License at
	http://www.mozilla.org/MPL/
	
	Contributor(s): Bessouat Xavier.
	
	PLEASE READ THE RULES ON THE LICENCE.TXT FILE
*/

$G["modules"]["status"] = function (elem, father, templateId, attributes, place)
{
	if (attributes["value"]) 
	{
		try {
			window.status = eval(attributes["value"]);
		} catch (e) { 
			if (attributes["value"]) window.status = attributes["value"];
		}
	} 
	else 
	{
		try {
			window.status = eval(elem.childNodes[0].nodeValue);
		} catch (e) { 
			try {
				window.status = elem.childNodes[0].nodeValue;
			} catch (e) { window.status = ""; }
		}
	}
}
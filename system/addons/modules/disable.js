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
		delete($G["modules"][tag]);
	} 
	else if (attributes["template"]) 
	{
		var tag = attributes["template"];
		delete($G["template"][tag]);
	}
}
/*
	The contents of this file are subject to the Mozilla Public License
	Version 1.1 (the "License"); you may not use this file except in
	compliance with the License. You may obtain a copy of the License at
	http://www.mozilla.org/MPL/
	
	Contributor(s): Bessouat Xavier.
	
	PLEASE READ THE RULES ON THE LICENCE.TXT FILE
*/

$G["modules"]["info"] = function (elem, father, templateId, attributes, place)
{
	var info = new Object();
	info["father"] = father;
	info["templateId"] = templateId;

	var url = attributes["src"];
	var callback = function(xml)
	{
		var domDATA = $G["convertXMLtoDOM"](xml);
		$G["parseDOMTREE"](domDATA, info["father"], info["templateId"]);	
	}
	$G["call"](url, callback);
	return false;
}

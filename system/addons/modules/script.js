/*
	The contents of this file are subject to the Mozilla Public License
	Version 1.1 (the "License"); you may not use this file except in
	compliance with the License. You may obtain a copy of the License at
	http://www.mozilla.org/MPL/
	
	Contributor(s): Bessouat Xavier.
	
	PLEASE READ THE RULES ON THE LICENCE.TXT FILE
*/

$G["modules"]["script"] = function (elem, father, templateId, attributes, place)
{
	try {
		var rand_init = $G["random"]();
		if ($G['isdef'](attributes["src"])) $G["include"](attributes["src"], "script_"+rand_init);
	} catch (e) { }
	try {
		eval(elem.childNodes[0].nodeValue);
	} catch (e) { }
}
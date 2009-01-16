/*
	The contents of this file are subject to the Mozilla Public License
	Version 1.1 (the "License"); you may not use this file except in
	compliance with the License. You may obtain a copy of the License at
	http://www.mozilla.org/MPL/
	
	Contributor(s): Bessouat Xavier.
	
	PLEASE READ THE RULES ON THE LICENCE.TXT FILE
*/

<?
function PageEncode($content)
{
	return  ereg_replace("< ", htmlspecialchars("< "), ereg_replace("&", htmlentities("&"),ereg_replace(">[ |\t]*<", ">\\n<", ereg_replace("\n", "\\n", ereg_replace("\r", "\\r", ereg_replace("'", "\'", $content))))));
}

$page = join('', @file($_REQUEST['data']));

$xml = PageEncode($page);
?>

try {
	$G["callback"]['<?=$_REQUEST['rand']?>']('<xml><?=$xml?></xml>');
	document.deleteElement($G["get"]("data_network_<?=$_REQUEST['rand']?>"));
} catch (e) { }
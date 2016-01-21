function whatYear () { //get the current year and return it as a string!
	y = new Date();
	n = y.getFullYear();
	value = n.toString();
	return value;
}

function commaToBullets(treatments, bullColor){
	var bullColor = (bullColor) ? bullColor : "gpa-orangejuice"; // check bullColor for input - default to defined color if blank, but color will default to black if there is no match.
	var treatmentsArray = treatments.split(/\s*;\s*/g); // find semicolons and spaces around semicolons and make an array of strings
	var treatmentsLen = treatmentsArray.length;
	
	var xfp_data = '<?Pageflex pf_xfp_ver="1"?>';
	var treatmentsFormatted = [];
	
	var i = 0;
	for (i; i < treatmentsLen; i++){
		// push formatted xml to array for each bullet point
		treatmentsFormatted.push('<list><_char text_color="' + bullColor + '">&bull;&NDtab;</_char>' + '<_char>' + treatmentsArray[i] + '</_char>' + '</list>');
	}
	
	return xfp_data + treatmentsFormatted.join('');// put it all together for PF to read in as formatted paragraph
}
function chartBGVisible(plan1, plan2) {
	plan1 = (plan1 != '') ? 1 : 0;
	plan2 = (plan2 != '') ? 1 : 0;
	
	var total = plan1 + plan2;
	
	if (total == 2) {
		return "two";
	} else if (total == 1) {
		return "one";
	}
}

function orthoDisplay (plan1, plan2, classD1, classD2) {

		if (plan1 == ""){
			classD1 = "";
		} else {
			classD1 = classD1;
		}
		
		if (plan2 == "") {
			classD2 = "";
		} else {
			classD2 = classD2;
		}
	
	if ((classD1 != "") || (classD2 != "")) {
		
		return "classD-ortho-rowGroup.xat";

	} else {
		return "";
	}

}



function footnoteDisplay (plan1, plan2) {

	reg = "fn-fam-deductible.xft"; // plans 1-4 only
	fiver = "fn-NA.xft"; // plan 5 only 
	both = "fn-both.xft"; // all plans (1-4 + 5)

	if ((plan1 != "") && (plan2 == "")) { // test if plan1 has a value and if plan2 is blank
		
			if (plan1 == "plan5") {
				return fiver; // if plan1 is set to "plan5" return the footnote for "plan5" only
			} else {
				return reg; // if its anything else, display the deductible(reg) footnote
			}
	
	} else if ((plan1 == "") && (plan2 != "")) {
		
			if (plan2 == "plan5") { // same as above, but checking plan2 this time
				return fiver;
			} else {
				return reg;
			}
		
	} else if ((plan1 == "plan5") && (plan2 == "plan5"))  {
		
			return fiver; // if some genius picks plan 5 for both, God Bless 'em
			
	} else if ((plan1 != "") && (plan2 != ""))  { // they must have 2 selections to adventure this far
		
			if ((plan1 != "plan5") && (plan2 != "plan5")) { // if either plan is NOT "plan5";
				return reg; // dump in the regular commentary, but;
			} else {
				return both; // if we have a winner, we want to display both... obviously
			}
			
	} else {
	
		return "";

	}

}


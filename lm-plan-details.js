function detailDisplay (plan1, plan2, plan3, select1, select2, select3, name1, name2, name3) {
	
	var details = [];
	
	if ((plan1 != "") && (select1 !="")) {
		details.push(name1);
	} else {
		// do nothing
	}
	
	if ((plan2 != "") && (select2 != "")) {
		details.push(name2);
	} else {
		// do nothing
	}
	
	if ((plan3 != "") && (select3 != "")) {
		details.push(name3);
	}	else {
		//do nothing;
	}	
	
	if (details.length == 3) {
		return "—included in the " + details[0] + ", " + details[1] + " and " + details[2];
	} else if (details.length == 2) {
		return "—included in the " + details[0] + " and " + details[1];
	} else if (details.length == 1) {
		return "—included in the " + details[0];
	} else {
		return "";
	}

}

function ppoNetwork (ppo1, ppo2, ppo3) {
	
	if (ppo1 || ppo2 || ppo3 != "") {
		return "ppo-network.xfp";
	} else {
		return "";// do nothing
	}
}

function kcdpLang (plan1, plan2, plan3) {
	
	if (plan1 || plan2 || plan3 != "") {
		return "kcdp-language.xfp";
	} else {
		return "";
	}
}

function visionDisplay (plan1, plan2, plan3, choice1, choice2, choice3, name1, name2, name3, option) {

	var choices = [];
	
	if ((plan1 != "") && (choice1 == option)) {
		choices.push(name1);
	} else {
		// do nothing
	}
	
	if ((plan2 != "") && (choice2 == option)) {
		choices.push(name2);
	} else {
		// do nothing
	}
	
	if ((plan3 != "") && (choice3 == option)) {
		choices.push(name3);
	}	else {
		//do nothing;
	}	
	
	if (choices.length == 3) {
		return "included in the " + choices[0] + ", " + choices[1] + " and " + choices[2];
	} else if (choices.length == 2) {
		return "included in the " + choices[0] + " and " + choices[1];
	} else if (choices.length == 1) {
		return "included in the " + choices[0];
	} else {
		return "";
	}

}

function oipdShowInfo (itemSelect, type1, type2, type3, plan1, plan2, plan3) {
	
	if (itemSelect != "") { // check if Outpatient Drug is selected first
	
		if ((plan1 != "") && (plan2 != "") && (plan3 != "")) {
		
			if ((type1 == type2) && (type1 == type3)) {
			
				switch (type1){
					case "generic only":
					return "oipd-gen-only.xfp";
					break;
				
					case "generic and brand name":
					return "oipd-gen-brand.xfp";
					break;
			
				}
			} else {
				return "oipd-both.xfp";
			}
			
		} else if ((plan1 != "") && (plan2 != "")){
		
			if (type1 == type2) {
			
				switch (type1){
					case "generic only":
					return "oipd-gen-only.xfp";
					break;
				
					case "generic and brand name":
					return "oipd-gen-brand.xfp";
					break;
			
				}
			} else {
				return "oipd-both.xfp";
			}
			
		} else if ((plan1 != "") && (plan3 != "")){
		
			if (type1 == type3) {
			
				switch (type1){
					case "generic only":
					return "oipd-gen-only.xfp";
					break;
				
					case "generic and brand name":
					return "oipd-gen-brand.xfp";
					break;
			
				}
			} else {
				return "oipd-both.xfp";
			}
			
		} else if ((plan1 != "") && (plan2 == "") && (plan3 == "")){
			
				switch (type1){
					case "generic only":
					return "oipd-gen-only.xfp";
					break;
				
					case "generic and brand name":
					return "oipd-gen-brand.xfp";
					break;
				}
		}
				
	} else { // if Outpatient Drug is blank, bow out - no drugs here 
		return "";
	}
}
	



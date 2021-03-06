function addBenefitDetailsTable (option1, option2, option3) {
	
	option1 = (option1 == '') ? Number(0) : 1;
	option2 = (option2 == '') ? Number(0) : 1;
	option3 = (option3 == '') ? Number(0) : 1;
		
	var total = option1 + option2 + option3;
	
        if(total != 0 | "0" | ""){
         return "options-"+total+".xat";
        } else {
         return"";
        }
};

function returnSelectedOptions (current, option1, option2, option3, plans) {
	
	current = parseInt(current); // 'current' is the actual index of the current row being passed in with the script variable
	
	var selectedOptions = [];
	
	if (option1 != ''){ // row index 0
		if (plans == "2") {
			selectedOptions.push("hospital-admission_2"); // if not blank, push this text into the array
		} else {
			selectedOptions.push("hospital-admission"); // if not blank, push this text into the array
		}
	} else { 
		// DO NOTHING
	}
	if (option2 != ''){ // row index 1
		if (plans == "2"){
			selectedOptions.push("intensive-care-unit_2"); // if not blank, push this text into the array 
		} else {
			selectedOptions.push("intensive-care-unit"); // if not blank, push this text into the array 
		}
	} else {
		//do nothing
	}
	if (option3 != ''){ // row index 2
		if (plans == "2") {
			selectedOptions.push("emergency-room-injuries_2"); // if not blank, push this text into the array
		} else {
			selectedOptions.push("emergency-room-injuries"); // if not blank, push this text into the array
		}
	} else {
		//do nothing
	}	
	
	var endResult = selectedOptions[current] +".xat";
	
	if (endResult == "undefined.xat") {
	// the script variable requires a file, so we pull in a blank text file here to eliminate errors
		return "blank.xat"; 
	} else {
		return endResult; // returns a filename for the script variables to pull
	}
};
// return the containers needed for the amount of plans picked for the brochure
function returnRow (rowNumber, option1, option2, option3, option4, option5, option6, option7, option8, option9, option10, option11, option12, option13, option14, option15){

	rowNumberInt = parseInt(rowNumber);
	
	option1 = (option1 == '') ? Number(0) : 1;
	option2 = (option2 == '') ? Number(0) : 1;
	option3 = (option3 == '') ? Number(0) : 1;
  option4 = (option4 == '') ? Number(0) : 1;
  option5 = (option5 == '') ? Number(0) : 1;
	option6 = (option6 == '') ? Number(0) : 1;
	option7 = (option7 == '') ? Number(0) : 1;
	option8 = (option8 == '') ? Number(0) : 1;
	option9 = (option9 == '') ? Number(0) : 1;
	option10 = (option10 == '') ? Number(0) : 1;
	option11 = (option11 == '') ? Number(0) : 1;
	option12 = (option12 == '') ? Number(0) : 1;
	option13 = (option13 == '') ? Number(0) : 1;
	option14 = (option14 == '') ? Number(0) : 1;
	option15 = (option15 == '') ? Number(0) : 1;
	
	var x = option1+option2+option3+option4+option5+option6+option7+option8+option9+option10+option11+option12+option13+option14+option15;
	
	if (rowNumberInt<= x){
		var currentRow =  "row"+rowNumberInt+".xat" ;
		return currentRow;
	}else{
		return "";
	}
	
}

// return the right content to place in the current container row
function returnSelected (current, option1, option2, option3, option4, option5, option6, option7, option8, option9, option10, option11, option12, option13, option14, option15, groupsize) {
	
	current = parseInt(current);
	
	var selectedOptions = [];
	
	if ((option1 != '') && (groupsize == '2')){ 
		selectedOptions.push("hospital-admission-L"); 
	} else if (option1 != '') { 
		selectedOptions.push("hospital-admission");
	} else {
		//do nothing  
	}
	if ((option2 != '') && (groupsize == '2')) { 
		selectedOptions.push("icu-confinement-L"); 
	} else if (option2 != '') { 
		selectedOptions.push("icu-confinement");  
	} else {
		//do nothing  
	}
	if ((option3 != '') && (groupsize == '2')) {
                selectedOptions.push("skilled-nursing-L");
     } else if (option3 != ''){
                selectedOptions.push("skilled-nursing");
     } else {
         //do nothing  
	}
    if (option4 != ''){
        selectedOptions.push("inpatient-surgery");
    } else {
       //do nothing  
	}	
    if (option5 != ''){
        selectedOptions.push("outpatient-surgery");
    } else {
        //do nothing  
	}
	if (option6 != ''){
        selectedOptions.push("outpatient-diagnostic");
    } else {
        //do nothing  
	}
	if (option7 != ''){
        selectedOptions.push("ambulance");
    } else {
        //do nothing  
	}
	if (option8 != ''){
        selectedOptions.push("er-injuries");
    } else {
        //do nothing  
	}
	if (option9 != ''){
        selectedOptions.push("er-sickness");
    } else {
        //do nothing  
	}
	if (option10 != ''){
        selectedOptions.push("outpatient-accident");
    } else {
        //do nothing  
	}
	if (option11 != ''){
        selectedOptions.push("wellness");
    } else {
        //do nothing  
	}
	if (option12 != ''){
        selectedOptions.push("outpatient-prescription-drug");
    } else {
        //do nothing  
	}
	if (option13 != ''){
        selectedOptions.push("term-life");
    } else {
        //do nothing  
	}
	if (option14 != ''){
        selectedOptions.push("supplemental-term-life");
    } else {
        //do nothing  
	}
	if (option15 != ''){
        selectedOptions.push("dental");
    } else {
        //do nothing  
	}
	
	var endResult = "chart-"+selectedOptions[current]+"-8189.xat";
	
	if (endResult == "chart-undefined-8189.xat") {
		return ""; 
	} else {
		return endResult;
	}
};
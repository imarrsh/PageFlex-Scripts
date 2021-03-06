function scheduleMECLM (bs2, lm1, lm2, lm3, lm4, lm5, lm6) {
	//checks value of 'BenefitSchedule2' and then all LM fields to produce area template
	if ((bs2 != "") && (lm1 || lm2 || lm3 || lm4 || lm5 || lm6 != "")){
		return "schedule-MEC-LM.xat"
	} else {
		return "";
	}
// old code - before configuring for all versions to pull the same table. 
//	if ((bs2 == "TA-MEC-LM") && (lm1 || lm2 || lm3 || lm4 || lm5 || lm6 != "")){
//		return "schedule-TA-MEC-LM.xat";
//	} else if ((bs2 == "CPL-MEC-LM") && (lm1 || lm2 || lm3 || lm4 || lm5 || lm6 != "")) { 
//		return "schedule-MEC-LM.xat" ;
//	} else {
//		return "";
//	}
};

function scheduleLM (bs3, lm1, lm2, lm3, lm4, lm5, lm6) {
	//checks value of 'BenefitSchedule2' and then all LM fields to produce area template
	if ((bs3 != "") && (lm1 || lm2 || lm3 || lm4 || lm5 || lm6 != "")){
		return "schedule-LM.xat" ;
	} else {
		return "";
	}
// old code - before configuring for all versions to pull the same table. 
//	if ((bs3 == "TA-LM") && (lm1 || lm2 || lm3 || lm4 || lm5 || lm6 != "")){
//		return "schedule-TA-LM.xat";
//	} else if ((bs3 == "CPL-LM") && (lm1 || lm2 || lm3 || lm4 || lm5 || lm6 != "")) { 
//		return "schedule-LM.xat" ;
//	} else {
//		return "";
//	}
};

function scheduleMVP (bs1, mvp2, mvp3) {
	//checks value of 'BenefitSchedule' and then MVP2 + MVP3 fields to produce area template
	if ((bs1 != "") && (mvp2 || mvp3 != "")){
		return "schedule-MVP.xat" ;
	} else {
		return "";
	}
// old code - before configuring for all versions to pull the same table. 
//	if ((bs1 == "TA-MVP") && (mvp2 || mvp3 != "")){
//		return "schedule-TA-MVP.xat";
//	} else if ((bs1 == "CPL-MVP") && (mvp2 || mvp3 != "")) { 
//		return "schedule-MVP.xat" ;
//	} else {
//		return "";
//	}
};

function MECLMPages (bs2, mec1, lm1, lm2, lm3, lm4, lm5, lm6) {
	// shorthand if/else statement, returns a 1 or 0 for addition
	mec1 = (mec1 == '') ? Number(0) : 1;
	lm1 = (lm1 == '') ? Number(0) : 1;
	lm2 = (lm2 == '') ? Number(0) : 1;
	lm3 = (lm3 == '') ? Number(0) : 1;
	lm4 = (lm4 == '') ? Number(0) : 1;
	lm5 = (lm5 == '') ? Number(0) : 1;
	lm6 = (lm6 == '') ? Number(0) : 1;
		
	var total = mec1 + lm1 + lm2 + lm3 + lm4 + lm5 + lm6;
	
	if ((total == 0) || (bs2 == '')) {
		return "";
		} else if ((total <= 3) && (bs2 != "")) {
			return "9811_chartpages_MEC-LM1.xdt";
		} else {
			return "9811_chartpages_MEC-LM2.xdt";
	}
	
//	var totalstr =  total.toString();
//	
//	if (totalstr != "") {
//		return totalstr; 
//		}
};

function MVPpages (pages, mvp1, mvp2, mvp3) {
	// checks to see if user input says "yes, i need 2 pages for this championship-length chart"
	if ((pages != '') && (mvp1 || mvp2 || mvp3 != '')) {
			return "9811_chartpages_MVP2.xdt";
		} else if (mvp1 || mvp2 || mvp3 != '') { // if not, checking to see if any mvp is selected
			return "9811_chartpages_MVP.xdt";
		} else {
			return ""; // if all blank, then pull no doc
	}
	
};
	
function LMPages (bs3, lm1, lm2, lm3, lm4, lm5, lm6) {
	// shorthand if/else statement, returns a 1 or 0 for addition
	lm1 = (lm1 == '') ? Number(0) : 1;
	lm2 = (lm2 == '') ? Number(0) : 1;
	lm3 = (lm3 == '') ? Number(0) : 1;
	lm4 = (lm4 == '') ? Number(0) : 1;
	lm5 = (lm5 == '') ? Number(0) : 1;
	lm6 = (lm6 == '') ? Number(0) : 1;
		
	var total = lm1 + lm2 + lm3 + lm4 + lm5 + lm6;
	
	if ((total == 0) || (bs3 == "")) {
		return ""; 
	} else if ((total <= 3) && (bs3 != "")) {
		return "9811_chartpages_LM1.xdt";
	} else {
		return "9811_chartpages_LM2.xdt";
	}
};

	function pricingChart (mec1, lm1, lm2, lm3, lm4, lm5, lm6, mvp1, mvp2, mvp3, salm1, salm2, salm3, salm4, salm5, salm6, alt) {
	// shorthand if/else statement, returns a 1 or 0 for addition
	mec1 = (mec1 == '') ? Number(0) : 1;
	lm1 = (lm1 == '') ? Number(0) : 1;
	lm2 = (lm2 == '') ? Number(0) : 1;
	lm3 = (lm3 == '') ? Number(0) : 1;
	lm4 = (lm4 == '') ? Number(0) : 1;
	lm5 = (lm5 == '') ? Number(0) : 1;
	lm6 = (lm6 == '') ? Number(0) : 1;
	mvp1 = (mvp1 == '') ? Number(0) : 1;
	mvp2 = (mvp2 == '') ? Number(0) : 1;
	mvp3 = (mvp3 == '') ? Number(0) : 1;
	salm1 = (salm1 == '') ? Number(0) : 1;
	salm2 = (salm2 == '') ? Number(0) : 1;
	salm3 = (salm3 == '') ? Number(0) : 1;
	salm4 = (salm4 == '') ? Number(0) : 1;
	salm5 = (salm5 == '') ? Number(0) : 1;
	salm6 = (salm6 == '') ? Number(0) : 1;
		
	var total = mec1 + lm1 + lm2 + lm3 + lm4 + lm5 + lm6 + mvp1 + mvp2 + mvp3 + salm1 + salm2 + salm3 + salm4 + salm5 + salm6;
	
	if  (alt != "") {
		return "volRates-alt-text.xat";
		} else if (total >= 6) {
		return "volRates6-10.xat";
		} else if (total >= 3) {
		return "volRates3-5.xat";
		} else {
		return "volRates1-2.xat";
		}
	};
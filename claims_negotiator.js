function makeDollars(value){
	// for display values that don't get math'd
	// changes value from string to a number, with decimal 
	// places and stips out everything but numbers
	var num = parseFloat(value.replace(/[^\d.-]/g, "")); 
	
	if (isNaN(num)) {	// tests to see if input is not a number(NaN)
		return "$00.00"; // if input is in fact NaN, do this
	} else { // if it is a number, do this
		var totalStr = num.toLocaleString(); // stop at 2 decimal places, convert back to string
		return "$" + totalStr; // dumps out the result with a dollar sign;
	}
}

function discount(provider, ppoDis) {
	var pro = parseFloat(provider.replace(/[^\d.-]/g, ""));
	var ppo = parseFloat(ppoDis.replace(/[^\d.-]/g, ""));

	if (isNaN(pro)) {
		pro = 0;
	} else {
		// do nothing
	}

	if (isNaN(ppo)) {
		ppo = 0;
	} else {
		// do nothing
	}

	var difference = pro - ppo;

	// return number; want to use this value again for another function
	return difference;
}

function display_difference(provider, ppoDis) {
	// display result of the above function
	var result = discount(provider, ppoDis);
	return "$" + result.toLocaleString();
}

function extraDiscount(provider, ppoDis, savings) {
	var poopy = discount(provider, ppoDis);
	var save = parseFloat(savings.replace(/[^\d.-]/g, ""));

	if (isNaN(save)) {
		save = 0;
	} else {
		// do nothing;
	}

	var newDifference = poopy - save;

	return newDifference;
}

function display_newDiff(provider, ppoDis, savings) {
	var extra = extraDiscount(provider, ppoDis, savings);
	return "$" + extra.toLocaleString();
}

function grabSetUp (patient, network) {
	if (patient == "inpatient") {
		if (network == "in-network") { // in network is assumed on original
			return "inpatient-numbers.xat"; 
		} else if(network == "out-of-network"){ // network == "out-of-network"
			return "inpatient-oon-numbers.xat"; // doesn't exist yet - 5.6.2015
		} else {
			return "";
		}
	} else if(patient == "outpatient") { // patient == "outpatient"
		if (network == "in-network") {
			return "outpatient-numbers.xat";
		} else if(network=="out-of-network"){
			return "outpatient-oon-numbers.xat";
		} else {
			return "";
		}
	}
}

function grabSummary (patient, network, ipIn, opIn, ipOoN, opOoN) {
	// ipIn = inpatient, in-network
	// opIn = outpatient, in-network
	// ipOoN = inpatient, out-of-network
	// opOoN = outpatient, out-of-network	
	if (patient == "inpatient") {
		if (network == "in-network") { // in network is assumed on original
			return ipIn; 
		} else { // network == "out-of-network"
			return ipOoN;
		}
	} else { // patient == "outpatient"
		if (network == "in-network") {
			return opIn;
		} else {
			return opOoN;
		}
	}
}
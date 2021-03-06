function makeDollars (value) {
		// changes value from string to a number, with decimal 
		// places and stips out everything but numbers
	var num = parseFloat(value.replace(/[^\d.-]/g, "")); 
	
	if (isNaN(num)) {	// tests to see if input is not a number(NaN)
		return "$00.00"; // if input is in fact NaN, do this
	} else { // if it is a number, do this
		var totalStr = num.toLocaleString(); // stop at 2 decimal places, convert back to string
		return "$" + totalStr; // dumps out the result with a dollar sign;
	}
};


function makeWholeDollars (value) {
		// changes value from string to a number
		// places and stips out everything but numbers
	var num = parseFloat(value.replace(/[^\d.-]/g, ""));
	
	if (isNaN(num)){ // tests to see if input is not a number(NaN)
		return "$0"; // if input is in fact NaN, do this
	} else { // if it is a number, do this
		var numrd = Math.round(num); // rounds the numner to nearst integer
		var numStr = numrd.toString(); // convert back to string
		return "$" + numStr; // dumps out the result with a dollar sign
	}
};

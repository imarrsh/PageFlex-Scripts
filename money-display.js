////////// clean up inputs, convert to usable numbers /////////

function intConvert (value) {
	
	var errValues = ["", "0", "$0", 0, NaN]; // array of unacceptable values

	for (var i = 0; i < errValues.length; i++) {
		if (value == errValues[i]) {
			var num = 0; 
			// matched values get changed to 0, this waterfalls through the program
		} else {
			var num = parseFloat(value.replace(/[^\d.-]/g, ""));
			// unmatched values get changed to floating point number values
		}
	}
	
	return num;
}

function dollarAmounts (value) { // display as dollar amounts

	var errValues = ["", "0", "$0", 0, NaN]; // create array of unnacceptable values

	for (var i = 0; i < errValues.length; i++) {
		if (value == errValues[i]) { // matched values get changed to "N/A"
			value = "N/A";
		} else {
			if (typeof value === 'number') {
				value = value.toString();
			} else {
				// leave the string as is
			}
			value = "$" + Math.round(intConvert(value)).toLocaleString('en').split(".")[0];

			if (value == "$NaN") {
				value = "N/A";
			} else {
				// dont change value
			}
		}
	}

	return value;
}

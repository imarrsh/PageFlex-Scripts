function eliminationPeriod(duration, ep13, ep26, ep52) {
		
	switch (duration) {
		case "13":
			return ep13;
			break;
		case "26":
			return ep26;
			break;
		case "52":
			return ep52;
			break;
		default:
			return "0/0";
	}; 
};

function stdBenefitsChart(bClass, bCoverage, bDuration, bCycle, ep13, ep26, ep52) {
	ePeriod = eliminationPeriod(bDuration, ep13, ep26, ep52);
	var splitPeriod = ePeriod.replace("/" , "-"); // removes the "/" in the value and replaces with a "-"
	var pdfName = bClass + '-' + bCoverage + '-' +  splitPeriod + '-' +  bDuration + '-' + bCycle + '.pdf';
	// puts it all together and returns the file name needed.
	return pdfName;
};

function displayAccidentDays() {
	var accident = ePeriod.replace(/\/(.*)/,""); // regex to replace the "/" and anything after
	return accident; // return remaining string
};

function displaySicknessDays() {
	var sickness = ePeriod.replace(/^(.*?)\//,""); // regex to replace the "/" and anything before
	return sickness; // return remaining string
};


function testRegex() {
	accident = ePeriod.replace(/\/(.*)/,"");
	sickness = ePeriod.replace(/^(.*?)\//,"");
	return accident +" + "+sickness ;
}; 

// Avidia - job 10920 Yankee Dental
// Marshall Thompson 3/17/2015

var verbiage = { // store strings and varibles here
	"employer" : {
		"page2-1" : "an employer", // 2 - difference
		"page2-2" : "your employees",
		"page3-1" : "your office", // 3 - why
		"page3-2" : "needs", 
		"page3-3" : "you and your employees", 
		"page3-4" : "an employer, you", 
		"page3-5" : "your employees" // 3 - bottom
	},
	"broker" : {
		"page2-1" : "a broker", // 2 - differncee
		"page2-2" : "your clients", // 2 - differncee
		"page3-1" : "your clients", // 3 - why
		"page3-2" : "need", 
		"page3-3" : "your clients", 
		"page3-4" : "a broker, your clients", 
		"page3-5" : "your customers" // 3 - bottom
	},
	"none" : {
		"blank" : "blank"
	}
};


var theme_options = {
	"broker" : {
		"page1" : {
			"general" : "10920-broker1-Gen.pdf",
			"cpa" : "10920-broker1-CPA.pdf",
			"financial" : "10920-broker1-financial.pdf"
		}
	},
	"employer" : {
		"page1" : {
			"general" : "10920-employer1-gen.pdf",
			"dentist" : "10920-employer1-dentist.pdf",
			"doctor" : "10920-employer1-doctor.pdf"
		}
	},
	"none" : {
		"page1" : {
			"default" : "broker1-financial.pdf"
		},
		"page4" : {
			"default" : "default-4.pdf"
		}
	}
}

function grabCopy(audience, pageLocation){
	// grab the copy from selection;
	var copy;
	var termsNotRecognized = ["individual", "personalized", "", null, undefined];
	var termsLen = termsNotRecognized.length;
	for(var i = 0; i < termsLen; i++) {
		if (audience == termsNotRecognized[i]){
			audience = "none";
			pageLocation = "blank";
		} else {
			// proceed as normal;
		}
	}
	copy = verbiage[audience][pageLocation];
	
	return copy;
}

function theme(audience, page, thBroker, thEmployer){
	// grabs theme of brochure based on selections
	var getTheme;
	
	switch (audience) {
		case "broker":
			getTheme = theme_options[audience][page][thBroker];
			break;
		case "employer":
			getTheme = theme_options[audience][page][thEmployer];
			break;
		default:
			getTheme = theme_options["none"][page]["default"]; 
	} 
	return getTheme;
}
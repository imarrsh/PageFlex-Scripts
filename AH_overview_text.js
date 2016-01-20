// canned responses for Avidia Capabilities Overview:


function customEEName(){
	var name = PFGetValue('ProspectEmployee');
	return name.toString();
}

 function customCompanyName(){
	var coName = PFGetValue('ProspectCompanyName');
	return coName.toString();
}

var verbiage = { // store strings and varibles here
	"employer" : {
		"page2-1" : "your employees'", // 2- about
		"page2-2" : "your employees", // 2- about
		"page5-1" : "Your employees", // 5- difference
		"page5-2" : "they", 
		"page6-1" : "your employees", // 6- solution overview
		"page6-2" : "your employees.", 
		"page6-3" : "employers", 
		"page6-4" : "their", 
		"page6-5" : "employees'", 
		"page6-6" : "your employees", 
		"page7-1" : "Your contributions", // 7- contribution options
		"page7-2" : "your employees'", 
		"page7-3" : "employees", 
		"page7-4" : "you", 
		"page7-5" : "Your employees", // 7- direct deposit
		"page7-6" : "their", 
		"page7-7" : "their", 
		"page7-8" : "Your employee", // 7- online banking
		"page7-9" : "has", 
		"page7-10" : "Your employee", // 7- check
		"page7-11" : "your employees" // 7- easy enrollment
	},
	"broker" : {
		"page2-1" : "your clients'",
		"page2-2" : "your clients",
		"page5-1" : "Your clients",
		"page5-2" : "they",
		"page6-1" : "your clients", // 6- solution overview
		"page6-2" : "employers and their employees", 
		"page6-3" : "employers", 
		"page6-4" : "their", 
		"page6-5" : "clients'", 
		"page6-6" : "your clients", 
		"page7-1" : "Your clients' contributions", // 7- contribution options
		"page7-2" : "their employees'", 
		"page7-3" : "employees", 
		"page7-4" : "employees", 
		"page7-5" : "Employees", // 7- direct deposit
		"page7-6" : " ", 
		"page7-7" : "their", 
		"page7-8" : "Employees", // 7- online banking
		"page7-9" : "have", 
		"page7-10" : "Employees", // 7- check
		"page7-11" : "your clients' employees" // 7- easy enrollment
	},
	"individual" : {
		"page2-1" : "your",
		"page2-2" : "your",
		"page5-1" : "You",
		"page5-2" : "you",
		"page6-1" : "you", // 6- solution overview
		"page6-2" : "you", 
		"page6-3" : "you", 
		"page6-4" : "your", 
		"page6-5" : "", 
		"page6-6" : "you", 
		"page7-1" : "Your employers' contribution", // 7- contribution options
		"page7-2" : "your", 
		"page7-3" : "employees", 
		"page7-4" : "your employer", 
		"page7-5" : "Your employer", // 7- direct deposit
		"page7-6" : "your", 
		"page7-7" : "their", 
		"page7-8" : "Your employer", // 7- online banking
		"page7-9" : "has", 
		"page7-10" : "Your employer", // 7- check
		"page7-11" : "you" // 7- easy enrollment
	},
	"personalized" : {
		"page2-1" : customCompanyName() + " " + customEEName(),
		"page2-2" : customCompanyName() + " " + customEEName(),
		"page5-1" : customEEName(),
		"page5-2" : customCompanyName(),
		"page6-1" : customCompanyName(), // 6- solution overview
		"page6-2" : customEEName(), 
		"page6-3" : customCompanyName(), 
		"page6-4" : "their", 
		"page6-5" : customEEName(), 
		"page6-6" : customEEName(), 
		"page7-1" : customCompanyName() + " contributions", // 7- contribution options
		"page7-2" : customEEName(), 
		"page7-3" : customEEName(), 
		"page7-4" : customCompanyName(), 
		"page7-5" : customCompanyName(), // 7- direct deposit
		"page7-6" : customEEName(), 
		"page7-7" : "their", 
		"page7-8" : customCompanyName(), // 7- online banking
		"page7-9" : "has", 
		"page7-10" : customCompanyName(), // 7- check
		"page7-11" : customEEName() // 7- easy enrollment
	}
};

var theme_options = {
	"broker" : {
		"page1" : {
			"general" : "broker1-gen.pdf",
			"cpa" : "broker1-cpa.pdf",
			"financial" : "broker1-financial.pdf"
		},
		"page4" : {
			"general" : "broker4-gen.pdf",
			"cpa" : "broker4-cpa.pdf",
			"financial" : "broker4-financial.pdf"
		}
	},
	"employer" : {
		"page1" : {
			"general" : "employer1-gen.pdf",
			"dentist" : "employer1-dentist.pdf",
			"doctor" : "employer1-doctor.pdf"
		},
		"page4" : {
			"general" : "employer4-gen.pdf",
			"dentist" : "employer4-dentist.pdf",
			"doctor" : "employer4-doctor.pdf"
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
	// grab the copy from selection
	var copy = verbiage[audience][pageLocation];
	return copy;
}

function aposCompany(){
	// handles apostrophe placement on company name
	var name = PFGetValue('ProspectCompanyName').split('');
	var nameLen = name.length;
	var lastLetter = nameLen - 1;
	var last = name[lastLetter];

	if (last == "s") {
		return "\'";
	} else {
		return "'s";
	}
}

function aposEE(audience){
	// handles apostrophe placement on company name
	var name = PFGetValue('ProspectEmployee').split('');
	var nameLen = name.length;
	var lastLetter = nameLen - 1;
	var last = name[lastLetter];

	if (audience != "personalized"){ 
		return "";
	} else {
		if (last == "s") {
			return "\'";
		} else {
			return "'s";
		}
	}
}

function makePlural(audience){
	// handles apostrophe placement on company name
	var name = PFGetValue('ProspectEmployee').split('');
	var nameLen = name.length - 1;
	var last = name[nameLen];

	if (audience != "personalized"){ 
		return "";
	} else {
		if (last != "s"){
			return "s";
		} else {
			return "";
		}
	}
}

function theme(audience, page, thBroker, thEmployer){
	// grabs theme of brochure based on selections
	if (audience == "broker") {
		var getTheme = theme_options[audience][page][thBroker];
	} else if (audience == "employer") {
		var getTheme = theme_options[audience][page][thEmployer];
	} else {
		var getTheme = theme_options["none"][page]["default"];
	}
	globalThemeValue = getTheme;
	return getTheme;
}

function advantageLayout(audience, thBroker) { // layout and specific content for page 3
	if (audience == "broker") {
		if ((thBroker == "financial") || (thBroker == "cpa")){
			return "p3-content-adv-gen.xat";
		} else{
			return "p3-content-adv-emp.xat"
		}
	} else {
		return "p3-content-adv-emp.xat";
	}
}





// end script
function getYear() {
	var today = new Date();
	var year = today.getFullYear();
	return year.toString();
}

var textOptions = {
	"broker" : {
		// control costs without comprimising quality
		"p2-1" : "you and your clients",
		"p2-2" : "a client's",
		"p2-3" : "clients and their",
		"p2-4" : "clients",
		"p2-5" : "your clients",
		// why coresource
		"p3-1" : "clients'",
		"p3-2" : "clients",
		// about coursource
		"p4-1" : "your clients",
		"p4-2" : "their",
		"p4-3" : "clients"
	},
	"employer" : {
		// control costs without comprimising quality
		"p2-1" : "you and your advisors",
		"p2-2" : "your company's'",
		"p2-3" : "you and your",
		"p2-4" : "employers",
		"p2-5" : "you",
		// why coresource
		"p3-1" : "employers'",
		"p3-2" : "you",
		// about coursource
		"p4-1" : "employers",
		"p4-2" : "you"
	}
}

var imageOptions = {
	"hospitals" : "var_img-hospitals.pdf",
	"construction" : "var_img-construction.pdf",
	"schools" : "var_img-schools.pdf",
	"government" : "var_img-government.pdf",
	"utilities" : "var_img-utilities.pdf",
	"financial" : "var_img-financial.pdf",
	"colleges" : "var_img-colleges.pdf",
	"retail" : "var_img-retail.pdf"
}

function grabCopy (whom, copyID) {

	var defaultCopy = textOptions["broker"][copyID];
	
	if (whom == "") {
		return defaultCopy;
	} else {
		var selector = textOptions[whom];
		
		if (selector != undefined) {
			return selector[copyID]; 
		}	else {
			// default to 'broker' verbiage
			return defaultCopy;
		}
	}
}

function grabImg (imgChoice) {

	var defaultImg = imageOptions["hospitals"];
	
	if (imgChoice == "") {
		return defaultImg;
	}	else {
		var image = imageOptions[imgChoice];
		
		if (image != undefined) {
			return image;
		} else {
			// default to 'hospitals' image
			return defaultImg;
		}
	}
}

function contactUs (name) {

	if (name == "") {
		return "us";
	} else {
		return name;
	}
	
}
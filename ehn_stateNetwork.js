var client = PFGetValue('GroupName');

var stateInfo = { // set up object literal for state selection
	"Florida" : {
		name : 'Florida',
		img : 'graphic_FL.pdf'
	},
	"South Carolina" : {
		name : 'South Carolina',
		img: 'graphic_SC.pdf'
	}
};

var customization = { // use default copy or personalized copy
	generic : 'Our Plans are designed specifically for you and your family.',
	custom: 'Our plans are designed specifically for ' + client + ' employees and their families.'
};

function getCustomizationVerbiage(addGroup){
	if(addGroup != ''){ 
		return customization.custom; // copy with personalization
	} else {
		return customization.generic; // default copy
	}
}

function getNetworkStateGraphic(state){
	// grab img associated with state audience
	return stateInfo[state].img;
}

function stateFullName(state){
	// grab full name so abbreviation doesnt show up in copy
	return stateInfo[state].name;
}
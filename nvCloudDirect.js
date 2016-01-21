// faq slick version
var pf = { // store profile variable values in object
	product: PFGetValue('ProductRef'),
	name: PFGetValue('ContactName'),
	email: PFGetValue('ContactEmail'),
	phone: PFGetValue('ContactPhone'),
	tollFree: PFGetValue('ContactTollFree'),
	web: PFGetValue('ContactWebsite'),
	presetContent: {
		"cloud" : { // copy varaiations for cloud
			"name" : "",
			"email" : "",
			"phone" : "(716)505-8566",
			"tollFree" : "1-877-286-3799",
			"web" : "www.myflexspend.com",
			"cardGraphic" : "graphic-Visa-PowerPlay.pdf",
			"cardType" : "Visa ",
			"cardNamePre" : "",
			"cardNameSuf" : "Prepaid Card"
		},
		"direct" : { // copy variations for direct
			"name" : "",
			"email" : "",
			"phone" : "(716)505-8509",
			"tollFree" : "1-800-264-9115",
			"web" : "www.hrbenefitsdirect.com/IHNova",
			"cardGraphic" : "graphic-MasterCard-PowerPlay.pdf",
			"cardType" : "MasterCard",
			"cardNamePre" : "Power Play ",
			"cardNameSuf" : " Debit Card"
		}
	},
	content: function(key){ // set up method to grab values from presetContent based on selection 
				var versions = ["cloud", "direct"];
				for(var i = 0; i < versions.length; i++) {
					if(this.product == versions[i]){
						this[key] = this.presetContent[versions[i]][key];
					}
				}
				return this[key];
	}
}

// used by many script variables in document that pass in a "key" string to grab info from presetContent 
function getContent(key){
	var pulledContent = pf.content(key);
	return pulledContent;
}

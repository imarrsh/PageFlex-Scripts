var pf = {
	optionSelectedMobile: PFGetValue('opt_Mobile'),
	optionSelectedChecks: PFGetValue('opt_Checks'),
	constantSupportPhone: PFGetValue('support_Phone'),
	constantTPAName: PFGetValue('TPA_Name'),
	constantColorSelect: PFGetValue('color_control'),
	constantWebsite: PFGetValue('support_web')
}

var contentRef = { // if mobile offering is there or not
	"page3-1" : pf.optionSelectedMobile == "1" ? "and mobile" : " ",
	"page4-1" : pf.optionSelectedMobile == "1" ? " or on the go" : "",
	"page4-2" : pf.optionSelectedMobile == "1" ? "mobile-graphic-callout.xat" : "mobile-graphic-notmobile.xat"
}

var HSAValues = {
	// values based on the year
	"2015" : {
		"MinDed-IC" : "$1,300",
		"MinDed-FC" : "$2,600",
		"Max-OOP-IC" : "$6,450",
		"Max-OOP-FC" : "$12,900",
		"ContLimit-Single" : "$3,350",
		"ContLimit-Family" : "$6,650",
		"ContCatchUp-Single" : "$1,000",
		"ContCatchUp-Family" : "$1,000"
	},
	"2016" : {
		"MinDed-IC" : "$1,300",
		"MinDed-FC" : "$2,600",
		"Max-OOP-IC" : "$6,550",
		"Max-OOP-FC" : "$13,100",
		"ContLimit-Single" : "$3,350",
		"ContLimit-Family" : "$6,750",
		"ContCatchUp-Single" : "$1,000",
		"ContCatchUp-Family" : "$1,000"
	}
}

var headings = { // text content of variable color headings
	"TOC" : "Table of Contents",
	"p3" : "Congratulations!",
	"p4" : "Managing your account is simple",
	"p4-2" : "On The Go",
	"p5" : "Contributing is a snap!",
	"p5-2" : "Does this sound complicated? Don't worry, there are tools within the " + pf.constantTPAName + " Portal that will help you monitor your contributions and help prevent over contributing. Additionally, contact us if you have questions, " + pf.constantSupportPhone + ". We are here to help.",
	"p6-1" : "Paying for healhcare",
	"p6-2" : "with ease",
	"p7" : "HSA investment options &amp; tax advantages",
	"p8" : "Top Ten Reasons to Have an Avidia Health HSA",
	"p8-1" : "1",
	"p8-2" : "2",
	"p8-3" : "3",
	"p8-4" : "4",
	"p8-5" : "5",
	"p8-6" : "6",
	"p8-7" : "7",
	"p8-8" : "8",
	"p8-9" : "9",
	"p8-10" : "10",
	"p9" : "Managing your account and other helpful suggestions"
}

var lightDarkText = { // if the backgrounf color of the callout boxes is too light, we need to make the text darker
	color: 	function(){
				var textColor = 'White';
				var currentColor = pf.constantColorSelect;
				var lightBackgrounds = ['YellowGold', 'Tan'];

					for (var i = 0; i < lightBackgrounds.length; i++) {
						if(currentColor == lightBackgrounds[i]){
							textColor = "75k";
						}
					}
				return textColor;
	},
	webGraphic: function(){
		var img = "icon-web.pdf";
			if (this.color() === "75k"){
				img = "icon-web-dark.pdf";
			}
		return img;
	},
	onlineServices: function(){
		return '<?Pageflex pf_xfp_ver="1"?> \
					<heading-small-white> \
					<_char text_color="' + this.color() + '">Online Services available to you</_char> \
					</heading-small-white> \
					<callout-list1> \
					<_char text_color="' + this.color() + '">&raquo;&NDtab;View online account balance and transaction information.</_char> \
					</callout-list1> \
					<callout-list1> \
					<_char text_color="' + this.color() + '">&raquo;&NDtab;Track expenses for tax reporting purposes.</_char> \
					</callout-list1> \
					<callout-list1> \
					<_char text_color="' + this.color() + '">&raquo;&NDtab;Print forms and documents relating to your accounts.</_char> \
					</callout-list1> \
					<callout-list1> \
					<_char text_color="' + this.color() + '">&raquo;&NDtab;Find educational materials to help you understand your HSA.</_char> \
					</callout-list1> \
					<callout-list1> \
					<_char text_color="' + this.color() + '">&raquo;&NDtab;Call our customer support any time with questions and issues.</_char> \
					</callout-list1>';
	},
	onlineSeparator: function(){
		return '<!--ATModel:PF_Area_Template_Box--> \
				<!--size:880534,3784--> \
				<?Pageflex pf_xat_ver="1"?> \
				<PF_Box_Base x_position="0" y_position="0" display_order="0" width="880534" height="3784" border_name="_none" border_simple_thickness="0" fill_name="_solid_fill" fill_color="' + this.color() + '" top_bumper="41910" bottom_bumper="41910"></PF_Box_Base>';
	},
	onlineServices2: function(){
		var text = '<?Pageflex pf_xft_ver="1"?>'
			text += '<_char text_color="' + this.color() + '">For more detailed information, visit ' + pf.constantWebsite + ' or contact us at ' + pf.constantSupportPhone + '</_char>';
		return text;
	},
	billPayHeader: function(){
		return '<?Pageflex pf_xft_ver="1"?> \
				<_char text_color="' + this.color() + '">Bill Pay Features</_char>';
	},
	billPayList: function(){
		return '<?Pageflex pf_xfp_ver="1"?> \
				<body1-list1-white> \
				<_char text_color="' + this.color() + '">&raquo;&NDtab;One-time or recurring payments </_char> \
				</body1-list1-white> \
				<body1-list1-white> \
				<_char text_color="' + this.color() + '">&raquo;&NDtab;Categorize payments </_char> \
				</body1-list1-white> \
				<body1-list1-white> \
				<_char text_color="' + this.color() + '">&raquo;&NDtab;Schedule future payments </_char> \
				</body1-list1-white> \
				<body1-list1-white> \
				<_char text_color="' + this.color() + '">&raquo;&NDtab;Make expedited payments </_char> \
				</body1-list1-white> \
				<body1-list1-white> \
				<_char text_color="' + this.color() + '">&raquo;&NDtab;Create reports </_char> \
				</body1-list1-white> \
				<body1-list1-white> \
				<_char text_color="' + this.color() + '">&raquo;&NDtab;Establish alerts </_char> \
				</body1-list1-white> \
				<body1-list1-white> \
				<_char text_color="' + this.color() + '">&raquo;&NDtab;Receive e-bills </_char> \
				</body1-list1-white> \
				<body1-list1-white> \
				<_char text_color="' + this.color() + '">&raquo;&NDtab;Set up reminders</_char> \
				</body1-list1-white>';
	},
	hsaContribution: function(){
		return '<?Pageflex pf_xfp_ver="1"?> \
				<heading-small-callout> \
				<_char data_tag="opt_Year" text_color="' + this.color() + '">2015</_char> \
				<_char text_color="' + this.color() + '"> HSA</_char> \
				</heading-small-callout> \
				<heading-small-callout> \
				<_char text_color="' + this.color() + '">Contribution Limits</_char> \
				</heading-small-callout> \
				<callout> \
				<_char text_color="' + this.color() + '"></_char> \
				</callout> \
				<callout> \
				<_char font_name="/Avenir 65" text_color="' + this.color() + '">Single:</_char> \
				<_char text_color="' + this.color() + '"> </_char> \
				<_char data_tag="hsa_value_ContLimitS" text_color="' + this.color() + '">$3,350</_char> \
				<_char text_color="' + this.color() + '"> </_char> \
				<_char font_name="/Avenir 65" text_color="' + this.color() + '">&NDtab;&NDtab;&NDtab;Family:</_char> \
				<_char text_color="' + this.color() + '"> </_char> \
				<_char data_tag="hsa_value_ContLimitF" text_color="' + this.color() + '">$6,650</_char> \
				</callout> \
				<callout> \
				<_char text_color="' + this.color() + '"></_char> \
				</callout> \
				<heading-small-callout> \
				<_char data_tag="opt_Year" text_color="' + this.color() + '">2015</_char> \
				<_char text_color="' + this.color() + '"> Catch up Contributions</_char> \
				</heading-small-callout> \
				<callout> \
				<_char text_color="' + this.color() + '">Participants age 55 or older may make additional contributions above the set HSA maximum.</_char> \
				</callout> \
				<callout> \
				<_char text_color="' + this.color() + '"></_char> \
				</callout> \
				<callout> \
				<_char font_name="/Avenir 65" text_color="' + this.color() + '">Single:</_char> \
				<_char text_color="' + this.color() + '"> </_char> \
				<_char data_tag="hsa_value_CatchupS" text_color="' + this.color() + '">$1,000</_char> \
				<_char text_color="' + this.color() + '"> </_char> \
				<_char font_name="/Avenir 65" text_color="' + this.color() + '">&NDtab;&NDtab;&NDtab;Family:</_char> \
				<_char text_color="' + this.color() + '"> </_char> \
				<_char data_tag="hsa_value_CatchupF" text_color="' + this.color() + '">$1,000</_char> \
				</callout>';
	},
	learnMore: function(){
		return '<?Pageflex pf_xfp_ver="1"?> \
				<heading-small-lc-white> \
				<_char text_color="' + this.color() + '">Learn More</_char> \
				</heading-small-lc-white> \
				<callout> \
				<_char text_color="' + this.color() + '"></_char> \
				</callout> \
				<callout-2> \
				<_char text_color="' + this.color() + '">For more information on how to use your funds, manage your expenditures, using Bill Pay, re-ordering </_char> \
				<_char data_tag="TPA_Name_an" text_color="' + this.color() + '">an</_char> \
				<_char text_color="' + this.color() + '"> </_char> \
				<_char data_tag="TPA_Name" text_color="' + this.color() + '">&lt;name of card&gt;</_char> \
				<_char text_color="' + this.color() + '"> debit card or help in determining if an expense is qualified, please visit </_char> \
				<_char data_tag="support_Web" text_color="' + this.color() + '">&lt;TPA website&gt;</_char> \
				<_char text_color="' + this.color() + '"> or call us at </_char> \
				<_char data_tag="support_Phone" text_color="' + this.color() + '">&lt;TPA phone number&gt;</_char> \
				</callout-2>';
	},
	checksGraphic: function(){
		var img = "graphic-balance";
		var checks = pf.optionSelectedChecks === "1" ? "-checks" : "-nochecks";
		var tint = this.color() === "75k" ? "-lightbg" : "";
		var file = img + checks + tint + ".pdf";

		return file;
	},
	thankYou : function(){
		return '<?Pageflex pf_xft_ver="1"?> \
				<_char text_color="' + this.color() + '">Thank You!</_char>';
	},
	closing: function(){
		return '<?Pageflex pf_xft_ver="1"?> \
				<_char text_color="' + this.color() + '">We are proud to serve as your HSA administrator. We appreciate your business and look forward to providing you the highest level of service and support. Our goal is to ensure that you maximize the benefits of participating in a Health Savings Account. To that end, we are constantly seeking ways to provide a better customer experience. Please let us know if there is anything we can do to improve the level of service.</_char>';
	}
}

function isSelected(page){ // mostly just applies to if mobile is selected or not
	var content = contentRef[page];
	return content;
}

function HSAValueGetter(year, item){ // what year is it? grab values based on that selection
	var value = year == "" ? HSAValues["2015"][item] : HSAValues[year][item];

	return value;
}

function logoUploadDefault(file){
	if(file == ""){
		return "AvidiaBank.pdf";
	} else {
		return file;
	}
}

function buildColorAreaTemplate(color){
	/* this function eschews the typical area template creation from within PF and takes business into its own hands. a few lines of xml markup redcuces the need for multiple files and makes the color a variable option at the same time. Pass in a defined color and you're done. :) */
	var boxMarkup = '<!--ATModel:PF_Area_Template_Box-->';
		boxMarkup += '<!--size:2222500,2857500-->';
		boxMarkup += '<?Pageflex pf_xat_ver="1"?>';
		boxMarkup += '<PF_Box_Base fill_color="' + color + '" fill_name="_solid_fill" border_simple_thickness="0" border_name="_none" height="2857500" width="2222500" display_order="0" y_position="0" x_position="0"></PF_Box_Base>';

	return boxMarkup;
}

function buildColorContactSeparators(color){
	var separator = '<!--ATModel:PF_Area_Template_Box--> \
					<!--size:843280,3784--> \
					<?Pageflex pf_xat_ver="1"?> \
					<PF_Box_Base bottom_bumper="0" top_bumper="0" border_simple_thickness="0" border_name="_none" fill_color="' + color + '" fill_name="_solid_fill" height="3784" width="843280" display_order="0" y_position="0" x_position="0"></PF_Box_Base>';
	return separator;
}

function setHeadingColor(color, heading){
// here we build a synthesized xft file with varible color and heading
// script variables pass in a color that is defined in the template and tells which heading to grab
	var text = 	'<?Pageflex pf_xft_ver="1"?>';
		text +=	'<_char text_color="' + color + '">' + headings[heading] + '</_char>';

	return text;
}

function foreGroundTextValue(text){
	var meth = lightDarkText.color();

	return meth;
}

function foregroundText(text){
	//var bits = lightDarkText['onlineServices']();
	var bits = lightDarkText[text]();
	return bits;
}






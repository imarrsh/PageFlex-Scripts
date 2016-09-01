// ********************
// TABLE OF CONTENTS
// ********************

// PF VARS
// DATA
// DATA FUNCTIONS
// VISUAL STRUCTURE

// ********************
// PF VARS
// ********************

var pf = {
	//HIPlan : PFGetValue(''),
	stateRates : PFGetValue('HIStateRates'),
	rateTier : PFGetValue('HIRateTier'),
	payroll : PFGetValue('HIPayRollFrequency'),
	// plan selections and names
	plan1 : PFGetValue('HIPlan1'),
	plan2 : PFGetValue('HIPlan2'),
	plan3 : PFGetValue('HIPlan3'),
	// get plan names
	plan1Name: PFGetValue('HIPlan1Name'),
	plan2Name: PFGetValue('HIPlan2Name'),
	plan3Name: PFGetValue('HIPlan3Name'),
	// gather which plans have been selected
	plan1opt : PFGetValue('HIPlan1_list'),
	plan2opt : PFGetValue('HIPlan2_list'),
	plan3opt : PFGetValue('HIPlan3_list'),

	//plansSelected : PFGetValue(''), // hard number

   listPlansSelected : function(){ // return array of selected values
        // pick up if plans are selected
        var plan1 = this.plan1,
        plan2 = this.plan2,
        plan3 = this.plan3,
        // pick up selections
        plan1opt = this.plan1opt,
        plan2opt = this.plan2opt,
        plan3opt = this.plan3opt;
        // store those selections here
        
        var planList = [];

        // (expression) ? ((expression) ? true : false) : false
        // push to planList array
        var a = (plan1 !== '') ? planList.push(plan1opt) : false;
        var b = (plan2 !== '') ? planList.push(plan2opt) : false;
        var c = (plan3 !== '') ? planList.push(plan3opt) : false;

        
        return planList;

    },
    listPlanNames : function(){
    		var plan1 = this.plan1,
	      plan2 = this.plan2,
	      plan3 = this.plan3,
    		plan1Name = this.plan1Name,
    		plan2Name = this.plan2Name,
    		plan3Name = this.plan3Name;

    		var names = [];

    		var a = (plan1 !== '') ? names.push(plan1Name) : false;
        	var b = (plan2 !== '') ? names.push(plan2Name) : false;
        	var c = (plan3 !== '') ? names.push(plan3Name) : false;

        	return names;
    },
    planFeatures : function() {
        // get plan features benefit values
        var scope = hiPlanData.benefitFeatures;

        return scope;
    },
    planRates : function() {
        var scope = this.stateRates + '-' + this.rateTier;
        return hiPlanData.rates[scope];
    }
};


// ********************
// DATA
// ********************

var hiPlanData = {};

// Final HI Rates BC Kemper-GIS

// all plan Features

hiPlanData.benefitFeatures = { // all benefit options are the same values, so separate from rate data
	"pd1" : {
		"confinement-day1" : 500,
		"confinement-day2-last": 100,
		"max-confinements-yr" : 2,
		"max-days-payable" : 10,
		"icu-confinement" : 100,
		"icu-max-days" : 10,
		"er-injury" : 100,
		"er-days" : 2
	},
	"pd2" : {
		"confinement-day1" : 750,
		"confinement-day2-last": 100,
		"max-confinements-yr" : 3,
		"max-days-payable" : 10,
		"icu-confinement" : 100,
		"icu-max-days" : 10,
		"er-injury" : 150,
		"er-days" : 2
	},
	"pd3" : {
		"confinement-day1" : 1000,
		"confinement-day2-last": 100,
		"max-confinements-yr" : 'Unlimited',
		"max-days-payable" : 10,
		"icu-confinement" : 100,
		"icu-max-days" : 10,
		"er-injury" : 200,
		"er-days" : 2
	},
	"pd4" : {
		"confinement-day1" : 1500,
		"confinement-day2-last": 100,
		"max-confinements-yr" : 'Unlimited',
		"max-days-payable" : 10,
		"icu-confinement" : 100,
		"icu-max-days" : 10,
		"er-injury" : 250,
		"er-days" : 2
	},
	"pd5" : {
		"confinement-day1" : 1000, 
		"confinement-day2-last" : 1000, 
		"max-confinements-yr" : 2,
		"max-days-payable" : 5,
		"icu-confinement" :500,
		"icu-max-days" : 5,
		"er-injury" : 300,
		"er-days" : 2
	},
	"pd6" : {
		"confinement-day1" : 1500, 
		"confinement-day2-last" : 1500, 
		"max-confinements-yr" : 2,
		"max-days-payable" : 5,
		"icu-confinement" :250,
		"icu-max-days" : 5,
		"er-injury" : 350,
		"er-days" : 2
	},
	"pd7" : {
		"confinement-day1" : 750,
		"confinement-day2-last": 250,
		"max-confinements-yr" : 3,
		"max-days-payable" : 10,
		"icu-confinement" : 250,
		"icu-max-days" : 10,
		"er-injury" : 150,
		"er-days" : 3
	},
	"pd8" : {
		"confinement-day1" : 1000,
		"confinement-day2-last": 250,
		"max-confinements-yr" : 3,
		"max-days-payable" : 10,
		"icu-confinement" : 250,
		"icu-max-days" : 10,
		"er-injury" : 150,
		"er-days" : 3
	},
	"pd9" : {
		"confinement-day1" : 1500,
		"confinement-day2-last": 250,
		"max-confinements-yr" : 2,
		"max-days-payable" : 10,
		"icu-confinement" : 250,
		"icu-max-days" : 10,
		"er-injury" : 300,
		"er-days" : 2
	},
	"pd10" : {
		"confinement-day1" : 1500,
		"confinement-day2-last": 1000, 
		"max-confinements-yr" : 3,
		"max-days-payable" : 5,
		"icu-confinement" : 500,
		"icu-max-days" : 5,
		"er-injury" : 500,
		"er-days" : 3
	},
	"no-plan" : {
		"confinement-day1" : 0,
		"confinement-day2-last": 0, 
		"max-confinements-yr" : 0,
		"max-days-payable" : 0,
		"icu-confinement" : 0,
		"icu-max-days" : 0,
		"er-injury" : 0,
		"er-days" : 0
	}
};


// Standard States (50% LR) 4-tier

hiPlanData.rates = {}; //set up rates object

hiPlanData.rates['stdSt-4T'] = {
	"pd1" : { // ee only, ee + spouse, ee + child, family
		"monthly": [9.06, 18.12, 17.03, 26.09],
		"semiMonthly": [4.53, 9.06, 8.52, 13.05], 
		"biWeekly": [4.18, 8.36, 7.86, 12.04],
		"weekly": [2.09, 4.18, 3.93, 6.02]
	},
	"pd2" : { // ee only, ee + spouse, ee + child, family
		"monthly": [12.30, 24.60, 23.12, 35.42],
		"semiMonthly": [6.15, 12.30, 11.56, 17.71], 
		"biWeekly": [5.68, 11.35, 10.67, 16.35],
		"weekly": [2.84, 5.68, 5.34, 8.17]
	},
	"pd3" : { // ee only, ee + spouse, ee + child, family
		"monthly": [15.41, 30.82, 28.97, 44.38],
		"semiMonthly": [7.71, 15.41, 14.49, 22.19],
		"biWeekly": [7.11, 14.22, 13.37, 22.19],
		"weekly": [3.56, 7.11, 6.69, 10.24]
	},
	"pd4" : { // ee only, ee + spouse, ee + child, family
		"monthly": [20.83, 41.66, 39.16, 59.99],
		"semiMonthly": [10.42, 20.83, 19.58, 30.00],
		"biWeekly": [9.61, 19.23, 18.07, 27.69],
		"weekly": [4.81, 9.61, 9.04, 13.84]
	},
	"pd5" : { // ee only, ee + spouse, ee + child, family
		"monthly": [35.66, 71.32, 67.04, 102.70],
		"semiMonthly": [17.83, 35.66, 33.52, 51.35],
		"biWeekly": [16.46, 32.92, 30.94, 51.35],
		"weekly": [8.23, 16.46, 15.47, 23.70]
	},
	"pd6" : { // ee only, ee + spouse, ee + child, family
		"monthly": [50.43, 100.86, 94.81, 145.24],
		"semiMonthly": [25.22, 50.43, 47.41, 72.62],
		"biWeekly": [23.28, 46.55, 43.76, 72.62],
		"weekly": [11.64, 23.28, 21.88, 33.52]
	},
	"pd7" : { // ee only, ee + spouse, ee + child, family
		"monthly": [17.19, 34.38, 32.32, 49.51],
		"semiMonthly": [8.60, 17.19, 16.16, 24.76],
		"biWeekly": [7.93, 15.87, 14.92, 24.76],
		"weekly": [3.97, 7.93, 7.46, 11.43] 
	},
	"pd8" :  { // ee only, ee + spouse, ee + child, family
		"monthly": [19.55, 39.10, 36.75, 56.30],
		"semiMonthly": [9.78, 19.55, 18.38, 28.15],
		"biWeekly": [9.02, 18.05, 16.96, 28.15],
		"weekly": [4.51, 9.02, 8.48, 12.99] 
	},
	"pd9" :  { // ee only, ee + spouse, ee + child, family
		"monthly": [25.59, 51.18, 48.11, 73.70],
		"semiMonthly": [12.80, 25.59, 24.06, 36.85],
		"biWeekly": [11.81, 23.62, 22.20, 36.85],
		"weekly": [5.91, 11.81, 11.10, 17.01] 
	},
	"pd10" : { // ee only, ee + spouse, ee + child, family
		"monthly": [44.08, 88.16, 82.87, 126.95],
		"semiMonthly": [22.04, 44.08, 41.44, 63.48],
		"biWeekly": [20.34, 40.69, 38.25, 63.48],
		"weekly": [10.17, 20.34, 19.12, 29.30]
	}
};


// Alternate States - FL IN ND OH RI - (60% LR) 4-tier

hiPlanData.rates['alt-4T'] = {
	"pd1" : { // ee only, ee + spouse, ee + child, family
		"monthly": [7.54, 15.08, 14.18, 21.72],
		"semiMonthly": [3.77, 7.54, 7.09, 10.86], 
		"biWeekly": [3.48, 6.96, 6.54, 10.86],
		"weekly": [1.74, 3.48, 3.27, 5.01]
	},
	"pd2" : { // ee only, ee + spouse, ee + child, family
		"monthly": [10.25, 20.50, 19.27, 29.52],
		"semiMonthly": [5.13, 10.25, 9.64, 14.76], 
		"biWeekly": [4.73, 9.46, 8.89, 14.76],
		"weekly": [2.37, 4.73, 4.45, 6.81]
	},
	"pd3" : { // ee only, ee + spouse, ee + child, family
		"monthly": [12.84, 25.68, 24.14, 36.98],
		"semiMonthly": [6.42, 12.84, 12.07, 18.49],
		"biWeekly": [5.93, 11.85, 11.14, 18.49],
		"weekly": [2.96, 5.93, 5.57, 8.53]
	},
	"pd4" : { // ee only, ee + spouse, ee + child, family
		"monthly": [17.35, 34.70, 32.62, 49.97],
		"semiMonthly": [8.68, 17.35, 16.31, 24.99],
		"biWeekly": [8.01, 16.02, 15.06, 24.99],
		"weekly": [4.00, 8.01, 7.53, 11.53]
	},
	"pd5" : { // ee only, ee + spouse, ee + child, family
		"monthly": [29.72, 59.44, 55.87, 85.59],
		"semiMonthly": [14.86, 29.72, 27.94, 42.80],
		"biWeekly": [13.72, 27.43, 25.79, 42.80],
		"weekly": [6.86, 13.72, 12.89, 19.75]
	},
	"pd6" : { // ee only, ee + spouse, ee + child, family
		"monthly": [42.03, 84.06, 79.02, 121.05],
		"semiMonthly": [21.02, 42.03, 39.51, 60.53],
		"biWeekly": [19.40, 38.80, 36.47, 60.53],
		"weekly": [9.70, 19.40, 18.24, 27.93]
	},
	"pd7" : { // ee only, ee + spouse, ee + child, family
		"monthly": [14.32, 28.64, 26.92, 41.24],
		"semiMonthly": [7.16, 14.32, 13.46, 20.62],
		"biWeekly": [6.61, 13.22, 12.42, 20.62],
		"weekly": [3.30, 6.61, 6.21, 9.52] 
	},
	"pd8" : { // ee only, ee + spouse, ee + child, family
		"monthly": [16.29, 32.58, 30.63, 46.92],
		"semiMonthly": [8.15, 16.29, 15.32, 23.46],
		"biWeekly": [7.52, 15.04, 14.14, 23.46],
		"weekly": [3.76, 7.52, 7.07, 10.83] 
	},
	"pd9" : { // ee only, ee + spouse, ee + child, family
		"monthly": [21.32, 42.64, 40.08, 61.40],
		"semiMonthly": [10.66, 21.32, 20.04, 30.70],
		"biWeekly": [9.84, 19.68, 18.50, 30.70],
		"weekly": [4.92, 9.84, 9.25, 14.17] 
	},
	"pd10" : { // ee only, ee + spouse, ee + child, family
		"monthly": [36.74, 73.48, 69.07, 105.81],
		"semiMonthly": [18.37, 36.74, 34.54, 52.91],
		"biWeekly": [16.96, 33.91, 31.88, 52.91],
		"weekly": [8.48, 16.96, 15.94, 24.42]
	}
};


// Standard States (50% LR) 3-tier

hiPlanData.rates['stdSt-3T'] = {
	"pd1" : { // ee only, ee + spouse, ee + child, family
		"monthly": [9.06, 17.79, 24.79],
		"semiMonthly": [4.53, 8.90, 12.40], 
		"biWeekly": [4.18, 8.21, 11.44],
		"weekly": [2.09, 4.11, 5.72]
	},
	"pd2" : { // ee only, ee + spouse, ee + child, family
		"monthly": [12.30, 24.16, 33.65],
		"semiMonthly": [6.15, 12.08, 16.83], 
		"biWeekly": [5.68, 11.15, 15.53],
		"weekly": [2.84, 5.58, 7.77]
	},
	"pd3" : { // ee only, ee + spouse, ee + child, family
		"monthly": [15.41, 30.27, 42.16],
		"semiMonthly": [7.71, 15.14, 21.08],
		"biWeekly": [7.11, 13.97, 19.46],
		"weekly": [3.56, 6.99, 9.73]
	},
	"pd4" : { // ee only, ee + spouse, ee + child, family
		"monthly": [20.83, 40.91, 56.99],
		"semiMonthly": [10.42, 20.46, 28.50],
		"biWeekly": [9.61, 18.88, 26.30],
		"weekly": [4.81, 9.44, 13.15]
	}, 
	"pd5" : { // ee only, ee + spouse, ee + child, family
		"monthly": [35.66, 70.04, 97.57],
		"semiMonthly": [17.83, 35.02, 48.79],
		"biWeekly": [16.46, 32.33, 45.03],
		"weekly": [8.23, 16.16, 22.52]
	},
	"pd6" : { // ee only, ee + spouse, ee + child, family
		"monthly": [50.43, 99.04, 137.98],
		"semiMonthly": [25.22, 49.52, 68.99],
		"biWeekly": [23.28, 45.71, 63.68],
		"weekly": [11.64, 22.86, 31.84]
	},
	"pd7" : { // ee only, ee + spouse, ee + child, family
		"monthly": [17.19, 33.76, 47.03],
		"semiMonthly": [8.60, 16.88, 23.52],
		"biWeekly": [7.93, 15.58, 21.71],
		"weekly": [3.97, 7.79, 10.85] 
	},
	"pd8" : { // ee only, ee + spouse, ee + child, family
		"monthly": [19.55, 38.40, 53.49],
		"semiMonthly": [9.78, 19.20, 26.75],
		"biWeekly": [9.02, 17.72, 24.69],
		"weekly": [4.51, 8.86, 12.34] 
	},
	"pd9" : { // ee only, ee + spouse, ee + child, family
		"monthly": [25.59, 50.26, 70.01],
		"semiMonthly": [12.80, 25.13, 35.01],
		"biWeekly": [11.81, 23.20, 32.31],
		"weekly": [5.91, 11.60, 16.16] 
	},
	"pd10" : { // ee only, ee + spouse, ee + child, family
		"monthly": [44.08, 86.57, 120.60],
		"semiMonthly": [22.04, 43.29, 60.30],
		"biWeekly": [20.34, 39.96, 55.66],
		"weekly": [10.17, 19.98, 27.83]
	}
};

// alternate States - FL IN ND OH RI - (60% LR) 3-tier

hiPlanData.rates['alt-3T'] = {
	"pd1" : { // ee only, ee + spouse, ee + child, family
		"monthly": [7.54, 14.81, 20.63],
		"semiMonthly": [3.77, 7.41, 10.32], 
		"biWeekly": [3.48, 6.84, 9.52],
		"weekly": [1.74, 3.42, 4.76]
	},
	"pd2" : { // ee only, ee + spouse, ee + child, family
		"monthly": [10.25, 20.13, 28.04],
		"semiMonthly": [5.13, 10.07, 14.02], 
		"biWeekly": [4.73, 9.29, 12.94],
		"weekly": [2.37, 4.65, 6.47]
	},
	"pd3" : { // ee only, ee + spouse, ee + child, family
		"monthly": [12.84, 25.22, 35.13],
		"semiMonthly": [6.42, 12.61, 17.57],
		"biWeekly": [5.93, 11.64, 16.21],
		"weekly": [2.96, 5.82, 8.11]
	},
	"pd4" : { // ee only, ee + spouse, ee + child, family
		"monthly": [17.35, 34.08, 47.47],
		"semiMonthly": [8.68, 17.04, 23.74],
		"biWeekly": [8.01, 15.73, 21.91],
		"weekly": [4.00, 7.86, 10.95]
	},
	"pd5" : { // ee only, ee + spouse, ee + child, family
		"monthly": [29.72, 58.37, 81.31],
		"semiMonthly": [14.86, 29.19, 40.66],
		"biWeekly": [13.72, 26.94, 37.53],
		"weekly": [6.86, 13.47, 18.76]
	},
	"pd6" : { // ee only, ee + spouse, ee + child, family
		"monthly": [42.03, 82.55, 114.99],
		"semiMonthly": [21.02, 41.28, 57.50],
		"biWeekly": [19.40, 38.10, 53.07],
		"weekly": [9.70, 19.05, 26.54]
	},
	"pd7" : { // ee only, ee + spouse, ee + child, family
		"monthly": [14.32, 28.12, 39.18],
		"semiMonthly": [7.16, 14.06, 19.59],
		"biWeekly": [6.61, 12.98, 18.08],
		"weekly": [3.30, 6.49, 9.04] 
	},
	"pd8" : { // ee only, ee + spouse, ee + child, family
		"monthly": [16.29, 31.99, 44.57],
		"semiMonthly": [8.15, 16.00, 22.29],
		"biWeekly": [7.52, 14.76, 20.57],
		"weekly": [3.76, 7.38, 10.29] 
	},
	"pd9" : { // ee only, ee + spouse, ee + child, family
		"monthly": [21.32, 41.87, 58.33],
		"semiMonthly": [10.66, 20.94, 29.17],
		"biWeekly": [9.84, 19.32, 26.92],
		"weekly": [4.92, 9.66, 13.46] 
	},
	"pd10" : { // ee only, ee + spouse, ee + child, family
		"monthly": [36.74, 72.16, 100.52],
		"semiMonthly": [18.37, 36.08, 50.26],
		"biWeekly": [16.96, 33.30, 46.39],
		"weekly": [8.48, 16.65, 23.20]
	}
};




// ********************
// DATA FUNCTIONS
// ********************

function f_money(value) { // display as dollar amounts
    var money;

    if (typeof value === "number"){
        value = value.toString();
        money = "$" + value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        money = value;
    }

    return money;
}

function displayPayRollProper(){
    var period = pf.payroll;

    switch (period) {
        case 'weekly' :
            period = 'Weekly';
            break;
        case 'biWeekly' :
            period = 'Bi-Weekly';
            break;
        case 'semiMonthly' :
            period = 'Semi-Monthly';
            break;
        default:
            period = 'Monthly';
    }

    return period;
}



// ********************
// VISUAL STRUCTURE
// ********************

function buildFeatureTable(){

	var scope = pf.planFeatures(),
	plans = pf.listPlansSelected(),
	plansLen = plans.length,
	planNames = pf.listPlanNames(),
	i = 0; //  loop counter

	//return scope[plans[0]]['confinement-day1'].toString();

	// initial lines for xat
	var xat_start = '<!--ATModel:PF_Area_Template_Box-->';
	xat_start += '<!--size:1905815,1203661-->';
	xat_start += '<?Pageflex pf_xat_ver="1"?>';

	// vertical, horizontal groups and text boxes wrapper
	var xat_body = '<PF_VBox_Base name="HI_Plan-data" border_simple_thickness="0" border_name="_none" h_align_contents="center" v_align_contents="center" display_order="0" height="shrinkwrap" width="1905815" y_position="0" x_position="0">';
	// header row plan names
	xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="9" height="shrinkwrap" width="1905000" y_position="-1246151" x_position="126338">';
	xat_body += '<PF_TextFrame_Base fill_color="Kemper_Orange" fill_name="_solid_fill" bottom_margin="20320" height="maximize" width="913409" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="25400" right_margin="25400" top_margin="20320">';
	xat_body += '<_text_column max_width="913409" min_width="0" v_align_contents="center" runaround="false">';
	xat_body += '<table_header_center>';
	xat_body += '<_char></_char>';
	xat_body += '</table_header_center>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	
	// loop over plan names by how many plans are selected // data_tag_for_delete="HIPlan1"
	for (i = 0; i < plansLen; i++) {
		xat_body += '<PF_TextFrame_Base fill_color="Kemper_Orange" fill_name="_solid_fill" bottom_margin="20320" x_position="1039747" y_position="-805169" display_order="10" width="maximize" height="maximize" runaround="false" left_margin="25400" right_margin="25400" top_margin="20320">';
		xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="center" runaround="false" width="maximize">';
		xat_body += '<table_header_center>';
		xat_body += '<_char>' + planNames[i] + '</_char>';
		xat_body += '</table_header_center>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
	}
	
	xat_body += '</PF_HBox_Base>';

	//  hospital confinement data
	xat_body += '<PF_VBox_Base fill_tint="20.000000" fill_color="Kemper_Orange" fill_name="_solid_fill" name="HospitalConfinement-data" border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="10" height="shrinkwrap" width="1905815" y_position="-1170241" x_position="126338">';
	xat_body += '<PF_TextFrame_Base bottom_margin="20320" top_margin="20320" right_margin="25400" left_margin="25400" height="shrinkwrap" width="1905815" display_order="10" y_position="-612858" x_position="126338">';
	xat_body += '<_text_column max_width="1905815" min_width="0">';
	xat_body += '<table_cell_leftHeading>';
	xat_body += '<_char>Hospital Confinement</_char>';
	xat_body += '</table_cell_leftHeading>';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Pays a fixed benefit amount per day of hospital confinement up to a maximum number of days per confinement</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="11" height="shrinkwrap" width="1905000" y_position="-476989" x_position="126338">';
	xat_body += '<PF_TextFrame_Base bottom_margin="20320" height="maximize" width="913409" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="63500" right_margin="25400" top_margin="20320">';
	xat_body += '<_text_column max_width="913409" min_width="0" v_align_contents="center" runaround="false">';
	xat_body += '<table_cell>';
	xat_body += '<_char>Benefit for 1st day of confinement</_char>';
	xat_body += '</table_cell>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	
	// confinement day 1
	for (i = 0; i < plansLen; i++) {
		xat_body += '<PF_TextFrame_Base bottom_margin="20320" x_position="1039747" y_position="-805169" display_order="10" width="maximize" height="maximize" runaround="false" left_margin="25400" right_margin="25400" top_margin="20320">';
		xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="center" runaround="false" width="maximize">';
		xat_body += '<table_cell_center>';
		xat_body += '<_char>' + f_money(scope[plans[i]]['confinement-day1']) + '</_char>';
		xat_body += '</table_cell_center>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
	}

	xat_body += '</PF_HBox_Base>';
	
	// 2nd to last day of confinement
	xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="12" height="shrinkwrap" width="1905000" y_position="-404606" x_position="127153">';
	xat_body += '<PF_TextFrame_Base bottom_margin="20320" height="maximize" width="913409" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="63500" right_margin="25400" top_margin="20320">';
	xat_body += '<_text_column max_width="913409" min_width="0" v_align_contents="center" runaround="false">';
	xat_body += '<table_cell>';
	xat_body += '<_char>Benefit for 2nd - last day of per confinement maximum</_char>';
	xat_body += '</table_cell>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	for (i = 0; i < plansLen; i++) {
		xat_body += '<PF_TextFrame_Base bottom_margin="20320" x_position="1039747" y_position="-805169" display_order="10" width="maximize" height="maximize" runaround="false" left_margin="25400" right_margin="25400" top_margin="20320">';
		xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="center" runaround="false" width="maximize">';
		xat_body += '<table_cell_center>';
		xat_body += '<_char>' + f_money(scope[plans[i]]['confinement-day2-last']) + '</_char>';
		xat_body += '</table_cell_center>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
	}

	xat_body += '</PF_HBox_Base>';

	// max days payable 
	xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="13" height="shrinkwrap" width="1905000" y_position="-332223" x_position="127153">';
	xat_body += '<PF_TextFrame_Base bottom_margin="20320" height="maximize" width="913409" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="63500" right_margin="25400" top_margin="20320">';
	xat_body += '<_text_column max_width="913409" min_width="0" v_align_contents="center" runaround="false">';
	xat_body += '<table_cell>';
	xat_body += '<_char>Maximum number of days payable per confinement</_char>';
	xat_body += '</table_cell>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	for (i = 0; i < plansLen; i++) {
		xat_body += '<PF_TextFrame_Base bottom_margin="20320" x_position="1039747" y_position="-805169" display_order="10" width="maximize" height="maximize" runaround="false" left_margin="25400" right_margin="25400" top_margin="20320">';
		xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="center" runaround="false" width="maximize">';
		xat_body += '<table_cell_center>';
		xat_body += '<_char>' + scope[plans[i]]['max-days-payable'] + '</_char>';
		xat_body += '</table_cell_center>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
	}
	
	xat_body += '</PF_HBox_Base>';

	// max confinements per yr
	xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="14" height="shrinkwrap" width="1905000" y_position="-259840" x_position="126338">';
	xat_body += '<PF_TextFrame_Base bottom_margin="20320" height="maximize" width="913409" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="63500" right_margin="25400" top_margin="20320">';
	xat_body += '<_text_column max_width="913409" min_width="0" v_align_contents="center" runaround="false">';
	xat_body += '<table_cell>';
	xat_body += '<_char>Maximum confinements per year</_char>';
	xat_body += '</table_cell>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	for (i = 0; i < plansLen; i++) {
		xat_body += '<PF_TextFrame_Base bottom_margin="20320" x_position="1039747" y_position="-805169" display_order="10" width="maximize" height="maximize" runaround="false" left_margin="25400" right_margin="25400" top_margin="20320">';
		xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="center" runaround="false" width="maximize">';
		xat_body += '<table_cell_center>';
		xat_body += '<_char>' + scope[plans[i]]['max-confinements-yr'] + '</_char>';
		xat_body += '</table_cell_center>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
	}

	xat_body += '</PF_HBox_Base>';
	xat_body += '</PF_VBox_Base>';

	// end hospital confinement

	//  ER for injury
	xat_body += '<PF_VBox_Base fill_tint="20.000000" fill_color="White" fill_name="_solid_fill" name="ER_Injury-data" border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="11" height="shrinkwrap" width="1905815" y_position="-755421" x_position="126338">';
	xat_body += '<PF_TextFrame_Base bottom_margin="20320" top_margin="20320" right_margin="25400" left_margin="25400" height="shrinkwrap" width="1905815" display_order="10" y_position="-612858" x_position="126338">';
	xat_body += '<_text_column max_width="1905815" min_width="0">';
	xat_body += '<table_cell_leftHeading>';
	xat_body += '<_char>Emergency Room (ER) for Injury</_char>';
	xat_body += '</table_cell_leftHeading>';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Pays a fixed benefit amount for each day a covered person receives treatment in a Hospital emergency room due to an Injury up to a maximum number of days per benefit period. The treatment must begin within 72 hours of the Accident.</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	// er benefit per day
	xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="11" height="shrinkwrap" width="1905000" y_position="-476989" x_position="126338">';
	xat_body += '<PF_TextFrame_Base bottom_margin="20320" height="maximize" width="913409" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="63500" right_margin="25400" top_margin="20320">';
	xat_body += '<_text_column max_width="913409" min_width="0" v_align_contents="center" runaround="false">';
	xat_body += '<table_cell>';
	xat_body += '<_char>Benefit per day</_char>';
	xat_body += '</table_cell>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	for (i = 0; i < plansLen; i++) {
		xat_body += '<PF_TextFrame_Base bottom_margin="20320" x_position="1039747" y_position="-805169" display_order="10" width="maximize" height="maximize" runaround="false" left_margin="25400" right_margin="25400" top_margin="20320">';
		xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="center" runaround="false" width="maximize">';
		xat_body += '<table_cell_center>';
		xat_body += '<_char>' + f_money(scope[plans[i]]['er-injury']) + '</_char>';
		xat_body += '</table_cell_center>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
	}

	xat_body += '</PF_HBox_Base>';

	// max er days per benefit period
	xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="12" height="shrinkwrap" width="1905000" y_position="-404606" x_position="127153">';
	xat_body += '<PF_TextFrame_Base bottom_margin="20320" height="maximize" width="913409" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="63500" right_margin="25400" top_margin="20320">';
	xat_body += '<_text_column max_width="913409" min_width="0" v_align_contents="center" runaround="false">';
	xat_body += '<table_cell>';
	xat_body += '<_char>Maximum number of days per benefit period</_char>';
	xat_body += '<_char supersub="superscript" line_break_penalty_degree="boolean">2</_char>';
	xat_body += '</table_cell>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	for (i = 0; i < plansLen; i++) {
		xat_body += '<PF_TextFrame_Base bottom_margin="20320" x_position="1039747" y_position="-805169" display_order="10" width="maximize" height="maximize" runaround="false" left_margin="25400" right_margin="25400" top_margin="20320">';
		xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="center" runaround="false" width="maximize">';
		xat_body += '<table_cell_center>';
		xat_body += '<_char>' + scope[plans[i]]['er-days'] + '</_char>';
		xat_body += '</table_cell_center>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
	}

	xat_body += '</PF_HBox_Base>';
	xat_body += '</PF_VBox_Base>';

	// end max days per benefit period

	// ICU confinement
	xat_body += '<PF_VBox_Base fill_tint="20.000000" fill_color="Kemper_Orange" fill_name="_solid_fill" name="ICU_Confinement-data" border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="12" height="shrinkwrap" width="1905815" y_position="-446570" x_position="126338">';
	xat_body += '<PF_TextFrame_Base bottom_margin="20320" top_margin="20320" right_margin="25400" left_margin="25400" height="shrinkwrap" width="1905815" display_order="10" y_position="-612858" x_position="126338">';
	xat_body += '<_text_column max_width="1905815" min_width="0">';
	xat_body += '<table_cell_leftHeading>';
	xat_body += '<_char>Intensive Care Unit (ICU) Confinement</_char>';
	xat_body += '</table_cell_leftHeading>';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Pays a fixed benefit amount for each day of confinement in an ICU up to a maximum number of days per benefit period, payable in addition to the Daily Hospital Confinement benefit</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="11" height="shrinkwrap" width="1905000" y_position="-476989" x_position="126338">';
	xat_body += '<PF_TextFrame_Base bottom_margin="20320" height="maximize" width="913409" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="63500" right_margin="25400" top_margin="20320">';
	xat_body += '<_text_column max_width="913409" min_width="0" v_align_contents="center" runaround="false">';
	xat_body += '<table_cell>';
	xat_body += '<_char>Benefit per day</_char>';
	xat_body += '</table_cell>';
	xat_body += '<table_cell>';
	xat_body += '<_char>(cannot exceed 100% of the first day of the Daily Hospital Confinement benefit)</_char>';
	xat_body += '</table_cell>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	for (i = 0; i < plansLen; i++) {
		xat_body += '<PF_TextFrame_Base bottom_margin="20320" x_position="1039747" y_position="-805169" display_order="10" width="maximize" height="maximize" runaround="false" left_margin="25400" right_margin="25400" top_margin="20320">';
		xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="center" runaround="false" width="maximize">';
		xat_body += '<table_cell_center>';
		xat_body += '<_char>' + f_money(scope[plans[i]]['icu-confinement']) + '</_char>';
		xat_body += '</table_cell_center>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
	}
	
	xat_body += '</PF_HBox_Base>';

	xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="12" height="shrinkwrap" width="1905000" y_position="-404606" x_position="127153">';
	xat_body += '<PF_TextFrame_Base bottom_margin="20320" height="maximize" width="913409" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="63500" right_margin="25400" top_margin="20320">';
	xat_body += '<_text_column max_width="913409" min_width="0" v_align_contents="center" runaround="false">';
	xat_body += '<table_cell>';
	xat_body += '<_char>Maximum number of days per benefit period</_char>';
	xat_body += '<_char supersub="superscript" line_break_penalty_degree="boolean">2</_char>';
	xat_body += '</table_cell>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	for (i = 0; i < plansLen; i++) {
		xat_body += '<PF_TextFrame_Base bottom_margin="20320" x_position="1039747" y_position="-805169" display_order="10" width="maximize" height="maximize" runaround="false" left_margin="25400" right_margin="25400" top_margin="20320">';
		xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="center" runaround="false" width="maximize">';
		xat_body += '<table_cell_center>';
		xat_body += '<_char>' + scope[plans[i]]['icu-max-days'] + '</_char>';
		xat_body += '</table_cell_center>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
	}

	xat_body += '</PF_HBox_Base>';
	xat_body += '</PF_VBox_Base>';
	
	// wrapper end
	xat_body += '</PF_VBox_Base>';

	
	xat_code = xat_start + xat_body; // combine all the parts

	return xat_code; // return it

}

function buildRateTable(){

	var planRates = pf.planRates(), // init plan rates
	plans = pf.listPlansSelected(), // get array of plan ids
	planNames = pf.listPlanNames(), // get array of plan names
	payroll = pf.payroll, // get array of plan names
	tier = pf.rateTier, // get tier value
	fillColor; // init fillColor

	var xat_start = '<!--ATModel:PF_Area_Template_Box-->';
	xat_start += '<!--size:1905815,272739-->';
	xat_start += '<?Pageflex pf_xat_ver="1"?>';

	var xat_body;

	var xat_end = '</PF_VBox_Base>';

	var i = 0;

	if (tier === '4T'){
		// vbox base
		xat_body = '<PF_VBox_Base name="rates-table" x_position="0" y_position="0" width="1905815" height="shrinkwrap" display_order="0" v_align_contents="center" h_align_contents="center" border_name="_none" border_simple_thickness="0" top_bumper="0">';
		// header row
		xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="center" v_align_contents="center" display_order="14" height="shrinkwrap" width="shrinkwrap" y_position="1997417" x_position="126338">';
		xat_body += '<PF_TextFrame_Base x_position="126338" y_position="2057517" display_order="6" width="444500" height="maximize" runaround="false" fill_name="_solid_fill" fill_color="Kemper_Orange" left_margin="25400" right_margin="25400" top_margin="17780" bottom_margin="17780">';
		xat_body += '<_text_column min_width="0" max_width="393700" v_align_contents="center" runaround="false">';
		xat_body += '<table_header>';
		xat_body += '<_char></_char>';
		xat_body += '</table_header>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
		xat_body += '<PF_TextFrame_Base x_position="570838" y_position="2057517" display_order="7" width="282755" height="maximize" runaround="false" fill_name="_solid_fill" fill_color="Kemper_Orange" left_margin="25400" right_margin="25400" top_margin="17780" bottom_margin="17780">';
		xat_body += '<_text_column min_width="0" max_width="231955" v_align_contents="center" runaround="false">';
		xat_body += '<table_header>';
		xat_body += '<_char>Employee</_char>';
		xat_body += '</table_header>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
		xat_body += '<PF_TextFrame_Base bottom_margin="17780" top_margin="17780" right_margin="25400" left_margin="25400" fill_color="Kemper_Orange" fill_name="_solid_fill" runaround="false" height="maximize" width="386080" display_order="8" y_position="2057517" x_position="853593">';
		xat_body += '<_text_column runaround="false" v_align_contents="center" max_width="335280" min_width="0">';
		xat_body += '<table_header>';
		xat_body += '<_char>Employee + Spouse</_char>';
		xat_body += '</table_header>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
		xat_body += '<PF_TextFrame_Base x_position="1239673" y_position="2057517" display_order="9" width="396240" height="maximize" runaround="false" fill_name="_solid_fill" fill_color="Kemper_Orange" left_margin="25400" right_margin="25400" top_margin="17780" bottom_margin="17780">';
		xat_body += '<_text_column min_width="0" max_width="345440" v_align_contents="center" runaround="false">';
		xat_body += '<table_header>';
		xat_body += '<_char>Employee + Children</_char>';
		xat_body += '</table_header>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
		xat_body += '<PF_TextFrame_Base x_position="1635913" y_position="2057517" display_order="10" width="396240" height="maximize" runaround="false" fill_name="_solid_fill" fill_color="Kemper_Orange" left_margin="25400" right_margin="25400" top_margin="17780" bottom_margin="17780">';
		xat_body += '<_text_column min_width="0" max_width="345440" v_align_contents="center" runaround="false">';
		xat_body += '<table_header>';
		xat_body += '<_char>Employee + Family</_char>';
		xat_body += '</table_header>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
		xat_body += '</PF_HBox_Base>';

		for (i = 0; i < plans.length; i++) {

			fillColor = (i % 2) ? "White" : "Kemper_Orange"; 

			xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="center" v_align_contents="center" display_order="15" height="shrinkwrap" width="shrinkwrap" y_position="2068247" x_position="126338">';
			xat_body += '<PF_TextFrame_Base x_position="126338" y_position="2057517" display_order="6" width="444500" height="maximize" runaround="false" fill_name="_solid_fill" fill_color="' + fillColor + '" left_margin="25400" right_margin="25400" top_margin="17780" bottom_margin="17780" fill_tint="20.000000">';
			xat_body += '<_text_column min_width="0" max_width="393700" v_align_contents="center" runaround="false">';
			xat_body += '<table_cell_leftHeading>';
			xat_body += '<_char>'+ planNames[i] +'</_char>';
			xat_body += '</table_cell_leftHeading>';
			xat_body += '</_text_column>';
			xat_body += '</PF_TextFrame_Base>';
			xat_body += '<PF_TextFrame_Base x_position="570838" y_position="2057517" display_order="7" width="282755" height="maximize" runaround="false" fill_name="_solid_fill" fill_color="' + fillColor + '" left_margin="25400" right_margin="25400" top_margin="17780" bottom_margin="17780" fill_tint="20.000000">';
			xat_body += '<_text_column min_width="0" max_width="231955" v_align_contents="center" runaround="false">';
			xat_body += '<table_cell>';
			xat_body += '<_char>$' + planRates[plans[i]][payroll][0].toLocaleString() + '</_char>'; // planRates[plans[i]][0]
			xat_body += '</table_cell>';
			xat_body += '</_text_column>';
			xat_body += '</PF_TextFrame_Base>';
			xat_body += '<PF_TextFrame_Base bottom_margin="17780" top_margin="17780" right_margin="25400" left_margin="25400" fill_color="' + fillColor + '" fill_name="_solid_fill" runaround="false" height="maximize" width="386080" display_order="8" y_position="2057517" x_position="853593" fill_tint="20.000000">';
			xat_body += '<_text_column runaround="false" v_align_contents="center" max_width="335280" min_width="0">';
			xat_body += '<table_cell>';
			xat_body += '<_char>$' + planRates[plans[i]][payroll][1].toLocaleString() + '</_char>';
			xat_body += '</table_cell>';
			xat_body += '</_text_column>';
			xat_body += '</PF_TextFrame_Base>';
			xat_body += '<PF_TextFrame_Base x_position="1239673" y_position="2057517" display_order="9" width="396240" height="maximize" runaround="false" fill_name="_solid_fill" fill_color="' + fillColor + '" left_margin="25400" right_margin="25400" top_margin="17780" bottom_margin="17780" fill_tint="20.000000">';
			xat_body += '<_text_column min_width="0" max_width="345440" v_align_contents="center" runaround="false">';
			xat_body += '<table_cell>';
			xat_body += '<_char>$' + planRates[plans[i]][payroll][2].toLocaleString() + '</_char>';
			xat_body += '</table_cell>';
			xat_body += '</_text_column>';
			xat_body += '</PF_TextFrame_Base>';
			xat_body += '<PF_TextFrame_Base x_position="1635913" y_position="2057517" display_order="10" width="396240" height="maximize" runaround="false" fill_name="_solid_fill" fill_color="' + fillColor + '" left_margin="25400" right_margin="25400" top_margin="17780" bottom_margin="17780" fill_tint="20.000000">';
			xat_body += '<_text_column min_width="0" max_width="345440" v_align_contents="center" runaround="false">';
			xat_body += '<table_cell>';
			xat_body += '<_char>$' + planRates[plans[i]][payroll][3].toLocaleString() + '</_char>';
			xat_body += '</table_cell>';
			xat_body += '</_text_column>';
			xat_body += '</PF_TextFrame_Base>';
			xat_body += '</PF_HBox_Base>';
		}

 	} else { // end $t condition

		xat_body = '<PF_VBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="center" v_align_contents="center" display_order="0" height="shrinkwrap" width="1896872" y_position="0" x_position="0">';
		xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="center" v_align_contents="center" display_order="7" height="shrinkwrap" width="1896872" y_position="1886631" x_position="-1988096">';
		xat_body += '<PF_TextFrame_Base x_position="126338" y_position="2057517" display_order="6" width="444500" height="maximize" runaround="false" fill_name="_solid_fill" fill_color="Kemper_Orange" left_margin="25400" right_margin="25400" top_margin="17780" bottom_margin="17780">';
		xat_body += '<_text_column min_width="0" max_width="393700" v_align_contents="center" runaround="false">';
		xat_body += '<table_header>';
		xat_body += '<_char></_char>';
		xat_body += '</table_header>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
		xat_body += '<PF_TextFrame_Base bottom_margin="17780" top_margin="17780" right_margin="25400" left_margin="25400" fill_color="Kemper_Orange" fill_name="_solid_fill" runaround="false" height="maximize" width="maximize" display_order="7" y_position="2057517" x_position="570838">';
		xat_body += '<_text_column width="maximize" runaround="false" v_align_contents="center" max_width="2743200" min_width="0">';
		xat_body += '<table_header>';
		xat_body += '<_char>Employee</_char>';
		xat_body += '</table_header>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
		xat_body += '<PF_TextFrame_Base x_position="853593" y_position="2057517" display_order="8" width="maximize" height="maximize" runaround="false" fill_name="_solid_fill" fill_color="Kemper_Orange" left_margin="25400" right_margin="25400" top_margin="17780" bottom_margin="17780">';
		xat_body += '<_text_column width="maximize" min_width="0" max_width="2743200" v_align_contents="center" runaround="false">';
		xat_body += '<table_header>';
		xat_body += '<_char>Employee +1</_char>';
		xat_body += '</table_header>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
		xat_body += '<PF_TextFrame_Base bottom_margin="17780" top_margin="17780" right_margin="25400" left_margin="25400" fill_color="Kemper_Orange" fill_name="_solid_fill" runaround="false" height="maximize" width="maximize" display_order="9" y_position="2057517" x_position="1239673">';
		xat_body += '<_text_column width="maximize" runaround="false" v_align_contents="center" max_width="2743200" min_width="0">';
		xat_body += '<table_header>';
		xat_body += '<_char>Employee +2 +</_char>';
		xat_body += '</table_header>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
		xat_body += '</PF_HBox_Base>';


		for (i = 0; i < plans.length; i++) {

			fillColor = (i % 2) ? "White" : "Kemper_Orange";
			
			xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="center" v_align_contents="center" display_order="8" height="shrinkwrap" width="1896872" y_position="1957461" x_position="-1988096">';
			xat_body += '<PF_TextFrame_Base x_position="126338" y_position="2057517" display_order="6" width="444500" height="maximize" runaround="false" fill_name="_solid_fill" fill_color="' + fillColor + '" left_margin="25400" right_margin="25400" top_margin="17780" bottom_margin="17780" fill_tint="20.000000">';
			xat_body += '<_text_column min_width="0" max_width="393700" v_align_contents="center" runaround="false">';
			xat_body += '<table_cell_leftHeading>';
			xat_body += '<_char>' + planNames[i] + '</_char>';
			xat_body += '</table_cell_leftHeading>';
			xat_body += '</_text_column>';
			xat_body += '</PF_TextFrame_Base>';
			xat_body += '<PF_TextFrame_Base fill_tint="20.000000" bottom_margin="17780" top_margin="17780" right_margin="25400" left_margin="25400" fill_color="' + fillColor + '" fill_name="_solid_fill" runaround="false" height="maximize" width="maximize" display_order="7" y_position="2057517" x_position="570838">';
			xat_body += '<_text_column width="maximize" runaround="false" v_align_contents="center" max_width="2743200" min_width="0">';
			xat_body += '<table_cell>';
			xat_body += '<_char>$' + planRates[plans[i]][payroll][0].toLocaleString() + '</_char>';
			xat_body += '</table_cell>';
			xat_body += '</_text_column>';
			xat_body += '</PF_TextFrame_Base>';
			xat_body += '<PF_TextFrame_Base fill_tint="20.000000" x_position="853593" y_position="2057517" display_order="8" width="maximize" height="maximize" runaround="false" fill_name="_solid_fill" fill_color="' + fillColor + '" left_margin="25400" right_margin="25400" top_margin="17780" bottom_margin="17780">';
			xat_body += '<_text_column width="maximize" min_width="0" max_width="2743200" v_align_contents="center" runaround="false">';
			xat_body += '<table_cell>';
			xat_body += '<_char>$' + planRates[plans[i]][payroll][1].toLocaleString() + '</_char>';
			xat_body += '</table_cell>';
			xat_body += '</_text_column>';
			xat_body += '</PF_TextFrame_Base>';
			xat_body += '<PF_TextFrame_Base fill_tint="20.000000" bottom_margin="17780" top_margin="17780" right_margin="25400" left_margin="25400" fill_color="' + fillColor + '" fill_name="_solid_fill" runaround="false" height="maximize" width="maximize" display_order="9" y_position="2057517" x_position="1239673">';
			xat_body += '<_text_column width="maximize" runaround="false" v_align_contents="center" max_width="2743200" min_width="0">';
			xat_body += '<table_cell>';
			xat_body += '<_char>$' + planRates[plans[i]][payroll][2].toLocaleString() + '</_char>';
			xat_body += '</table_cell>';
			xat_body += '</_text_column>';
			xat_body += '</PF_TextFrame_Base>';
			xat_body += '</PF_HBox_Base>';
		}

 	} // end if/else


	var table = xat_start + xat_body +  xat_end;
	return table;

}

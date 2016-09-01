// ********************
// TABLE OF CONTENTS
// ********************

// PF VARS
// DATA
// RATE TABLES
// DATA FUNCTIONS & FORMATTERS
// VISUAL STRUCTURE

// ********************
// PF VARS
// ********************

var pf = {

	// capturing values
	stateRates : PFGetValue('LMStates'), // pick the states scope

	lmPlan : PFGetValue('LMPlanChoice'), // generic only, generic and brand

	lmPayroll : PFGetValue('LMPayrollFrequency'), // payroll frequncy for LM rates
	// select boxes for plans
	plan1 : PFGetValue('LMPlan1'), // slot for plan 1, checkbox
	plan2 : PFGetValue('LMPlan2'), // slot for plan 2, checkbox
	plan3 : PFGetValue('LMPlan3'), // slot for plan 3, checkbox
	// plan names
	plan1Name: PFGetValue('LMPlan1Name'), // plan 1 name assignment
	plan2Name: PFGetValue('LMPlan2Name'), // plan 2 name assignment
	plan3Name: PFGetValue('LMPlan3Name'), // plan 3 name assignemnt
	
	// generic only options, if plan type is 'GENERIC ONLY'
	plan1gen : PFGetValue('LMPlan1_gen'), // pick from a list of generic only values to populate plan 1
	plan2gen : PFGetValue('LMPlan2_gen'), // pick from a list of generic only values to populate plan 2
	plan3gen : PFGetValue('LMPlan3_gen'), // // pick from a list of generic only values to populate plan 1
	
	// generic and brand options, if plan type is 'GENERIC & BRAND'
	plan1brand : PFGetValue('LMPlan1_brand'), // pick from a list of generic & brand values to populate plan 1
	plan2brand : PFGetValue('LMPlan2_brand'), // pick from a list of generic & brand values to populate plan 2

	// DC plans are special, so we deal with them here... //
	// if state is DC and plan type is generic ..
	dc_plan1gen : PFGetValue('LMPlan1_genDC'), // will be assigned to '115-plan'

	// if state is DC and plan type is generic + brand - may not be needed...
	//dc_plan1brand : PFGetValue('LMPlan1_brandDC'), // pick from a list of generic & brand values to populate plan 1
	//dc_plan2brand : PFGetValue('LMPlan2_brandDC'), // pick from a list of generic & brand values to populate plan 2

	listPlansSelected : function(){ // return array of selected values
        // pick up if plans are selected
        var that = this;

        var planInputs = [
		     // collect plan inputs so that we can loop thru them
		     { 
			     plan : { // plan 1
				     selected : that.plan1,
				     generic : that.plan1gen,
				     brand : that.plan1brand,
				     dc_gen : that.dc_plan1gen 
			     }
		     },
		     { 
			     plan : { // plan 2
				     selected : that.plan2,
				     generic : that.plan2gen,
				     brand : that.plan2brand,
				     dc_gen : false
			     }
		     },
		     { 
			     plan : { // plan 3
				     selected : that.plan3,
				     generic : that.plan3gen,
				     brand : false,
				     dc_gen : false
			     }
		     }
        ];
        
        var planList = []; 


			for(var i = 0; i < planInputs.length; i++) {

				if (planInputs[i].plan.selected !== ''){ // check seclected value of current plan
					
					if (this.lmPlan === 'generic') { // check the lmplanChoice for generic or brand
						
						if (this.stateRates !== 'DC') { // check that the state isn't 'DC'
							planList.push(planInputs[i].plan.generic);
						} else {
							planList.push(planInputs[i].plan.dc_gen);
							break; // '115-plan'
						}

					} else {

						if(planInputs[i].plan.brand !== false) { // if prop is not false, push brand data string
							planList.push(planInputs[i].plan.brand);
						} 
					
					}

				}
				
			}

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
    planScope : function() {
        var dataset = (this.lmPlan === 'generic') ? lmPlanData.generic : lmPlanData.brand;
        //var needle = ' ' ; // '50-plan'
        
        return dataset;
    },
    planRates : function(){

    		var plans = this.listPlansSelected(), // ex: ['50-plan', '60-plan', '90-plan'] 
    		state = this.stateRates; // ex: 'stStd', 'INOHRI', ect...

    		var planRatesList = [];
    		
    		for (var i = 0; i < plans.length; i++) {
    			planRatesList.push(state + '-' + plans[i]);
    		}

    		return planRatesList;
    }
};



// ********************
// DATA
// ********************

// Plan descriptions 
// same across all plans

var lmPlanData = {}; // set up lmPlanData obj

lmPlanData.generic = {}; // set up generic data obj

// plan1
lmPlanData.generic['50-plan'] = {

	"dailyHospitalConfinement" : {
		"benefitAmount" : 100,
		"maxDaysPerConfinement" : 1,
		"maxConfinementsPerPeriod" : 1
	},
	"hospitalAdmission" : {
		"benefitAmount" : 500,
		"maxDaysPerPeriod" : 1
	},
	"icuConfinement" : {
		"benefitAmount" : "N/A",
		"maxDaysPerPeriod" : "N/A"
	},
	"skilledNursingFacilityConfinemnet" : {
		"benefitAmount" : "N/A",
		"maxDaysPerPeriod" : "N/A",
		"maxDaysPerLifetime" : "N/A"
	},
	"inpatientSurgery" : {
		"benefitAmount" : 500,
		"maxDaysPerPeriod" : 1
	},
	"outpatientSurgery" : {
		"benefitAmount" : 150,
		"maxDaysPerPeriod" : 1
	},
	"anesthesia" : {
		"benefitAmount" : "20% of Surgical Benefit"
	},
	"outpatientPhysicianOfficeVisit" : {
		"benefitAmount" : 40,
		"maxDaysPerPeriod" : 6
	},
	"outpatientDiagnosticLabTests" : {
		"benefitAmount" : 10,
		"maxDaysPerPeriod" : 3
	},
	"outpatientDiagnosticTests" : {
		"benefitAmount" : 50,
		"maxDaysPerPeriod" : 3
	},
	"outpatientAdvancedDiagnosticTests" : {
		"lvlOneBenefitAmount" : "N/A",
		"lvlTwoBenefitAmount" : "N/A",
		"maxDaysPerPeriod" : "N/A"
	},
	"ambulance" : {
		"groundWaterBenefit" : "N/A",
		"airBenefit" : "N/A",
		"maxDaysPerPeriod" : "N/A"
	},
	"erInjury" : {
		"benefitAmount" : "N/A",
		"maxDaysPerPeriod" : "N/A"
	},
	"erSickness" : {
		"benefitAmount" : "N/A",
		"maxDaysPerPeriod" : "N/A"
	},
	"outpatientAccident" : {
		"benefitAmount" : "N/A",
		"maxDaysPerAccident" : "N/A",
		"maxAccidents" : "N/A"
	},
	"wellness" : {
		"benefitAmount" : 50,
		"maxDaysPerPeriodPersonsAge1+" : 1,
		"maxDaysPerPeriodUnderAge1" : 4
	}
};

// plan2
lmPlanData.generic['60-plan'] = {

	"dailyHospitalConfinement" : {
		"benefitAmount" : 100,
		"maxDaysPerConfinement" : 1,
		"maxConfinementsPerPeriod" : 1
	},
	"hospitalAdmission" : {
		"benefitAmount" : 750,
		"maxDaysPerPeriod" : 1
	},
	"icuConfinement" : {
		"benefitAmount" : "N/A",
		"maxDaysPerPeriod" : "N/A"
	},
	"skilledNursingFacilityConfinemnet" : {
		"benefitAmount" : "N/A",
		"maxDaysPerPeriod" : "N/A",
		"maxDaysPerLifetime" : "N/A"
	},
	"inpatientSurgery" : {
		"benefitAmount" : 800,
		"maxDaysPerPeriod" : 1
	},
	"outpatientSurgery" : {
		"benefitAmount" : 300,
		"maxDaysPerPeriod" : 1
	},
	"anesthesia" : {
		"benefitAmount" : "20% of Surgical Benefit"
	},
	"outpatientPhysicianOfficeVisit" : {
		"benefitAmount" : 40,
		"maxDaysPerPeriod" : 6
	},
	"outpatientDiagnosticLabTests" : {
		"benefitAmount" : 10,
		"maxDaysPerPeriod" : 3
	},
	"outpatientDiagnosticTests" : {
		"benefitAmount" : 50,
		"maxDaysPerPeriod" : 3
	},
	"outpatientAdvancedDiagnosticTests" : {
		"lvlOneBenefitAmount" : "N/A",
		"lvlTwoBenefitAmount" : "N/A",
		"maxDaysPerPeriod" : "N/A"
	},
	"ambulance" : {
		"groundWaterBenefit" : "N/A",
		"airBenefit" : "N/A",
		"maxDaysPerPeriod" : "N/A"
	},
	"erInjury" : {
		"benefitAmount" : "N/A",
		"maxDaysPerPeriod" : "N/A"
	},
	"erSickness" : {
		"benefitAmount" : "N/A",
		"maxDaysPerPeriod" : "N/A"
	},
	"outpatientAccident" : {
		"benefitAmount" : "N/A",
		"maxDaysPerAccident" : "N/A",
		"maxAccidents" : "N/A"
	},
	"wellness" : {
		"benefitAmount" : 50,
		"maxDaysPerPeriodPersonsAge1+" : 1,
		"maxDaysPerPeriodUnderAge1" : 4
	}
};

// plan3
lmPlanData.generic['90-plan'] = {

	"dailyHospitalConfinement" : {
		"benefitAmount" : 100,
		"maxDaysPerConfinement" : 10,
		"maxConfinementsPerPeriod" : 1
	},
	"hospitalAdmission" : {
		"benefitAmount" : 750,
		"maxDaysPerPeriod" : 1
	},
	"icuConfinement" : {
		"benefitAmount" : "N/A",
		"maxDaysPerPeriod" : "N/A"
	},
	"skilledNursingFacilityConfinemnet" : {
		"benefitAmount" : "N/A",
		"maxDaysPerPeriod" : "N/A",
		"maxDaysPerLifetime" : "N/A"
	},
	"inpatientSurgery" : {
		"benefitAmount" : 1000,
		"maxDaysPerPeriod" : 1
	},
	"outpatientSurgery" : {
		"benefitAmount" : 500,
		"maxDaysPerPeriod" : 1
	},
	"anesthesia" : {
		"benefitAmount" : "20% of Surgical Benefit"
	},
	"outpatientPhysicianOfficeVisit" : {
		"benefitAmount" : 50,
		"maxDaysPerPeriod" : 6
	},
	"outpatientDiagnosticLabTests" : {
		"benefitAmount" : 50,
		"maxDaysPerPeriod" : 3
	},
	"outpatientDiagnosticTests" : {
		"benefitAmount" : 50,
		"maxDaysPerPeriod" : 3
	},
	"outpatientAdvancedDiagnosticTests" : {
		"lvlOneBenefitAmount" : "N/A",
		"lvlTwoBenefitAmount" : "N/A",
		"maxDaysPerPeriod" : "N/A"
	},
	"ambulance" : {
		"groundWaterBenefit" : "N/A",
		"airBenefit" : "N/A",
		"maxDaysPerPeriod" : "N/A"
	},
	"erInjury" : {
		"benefitAmount" : 300,
		"maxDaysPerPeriod" : 3
	},
	"erSickness" : {
		"benefitAmount" : 50,
		"maxDaysPerPeriod" : 3
	},
	"outpatientAccident" : {
		"benefitAmount" : "N/A",
		"maxDaysPerAccident" : "N/A",
		"maxAccidents" : "N/A"
	},
	"wellness" : {
		"benefitAmount" : 50,
		"maxDaysPerPeriodPersonsAge1+" : 1,
		"maxDaysPerPeriodUnderAge1" : 4
	}
};

// plan4
lmPlanData.generic['115-plan'] = {

	"dailyHospitalConfinement" : {
		"benefitAmount" : 250,
		"maxDaysPerConfinement" : 10,
		"maxConfinementsPerPeriod" : 1
	},
	"hospitalAdmission" : {
		"benefitAmount" : 1000,
		"maxDaysPerPeriod" : 1
	},
	"icuConfinement" : {
		"benefitAmount" : 100,
		"maxDaysPerPeriod" : 5
	},
	"skilledNursingFacilityConfinemnet" : {
		"benefitAmount" : 100,
		"maxDaysPerPeriod" : 30,
		"maxDaysPerLifetime" : 120
	},
	"inpatientSurgery" : {
		"benefitAmount" : 2000,
		"maxDaysPerPeriod" : 1
	},
	"outpatientSurgery" : {
		"benefitAmount" : 600,
		"maxDaysPerPeriod" : 1
	},
	"anesthesia" : {
		"benefitAmount" : "20% of Surgical Benefit"
	},
	"outpatientPhysicianOfficeVisit" : {
		"benefitAmount" : 50,
		"maxDaysPerPeriod" : 6
	},
	"outpatientDiagnosticLabTests" : {
		"benefitAmount" : 50,
		"maxDaysPerPeriod" : 3
	},
	"outpatientDiagnosticTests" : {
		"benefitAmount" : 50,
		"maxDaysPerPeriod" : 3
	},
	"outpatientAdvancedDiagnosticTests" : {
		"lvlOneBenefitAmount" : (pf.stateRates === 'MD') ? 'N/A' : 100, // MD isnt special - set to 'N/A'
		"lvlTwoBenefitAmount" : (pf.stateRates === 'MD') ? 'N/A' : "3X Level One Amount",
		"maxDaysPerPeriod" : (pf.stateRates === 'MD') ? 'N/A' : 3
	},
	"ambulance" : {
		"groundWaterBenefit" : 100,
		"airBenefit" : "3X Ground/Water Amount",
		"maxDaysPerPeriod" : 3
	},
	"erInjury" : {
		"benefitAmount" : 300,
		"maxDaysPerPeriod" : 3
	},
	"erSickness" : {
		"benefitAmount" : 75,
		"maxDaysPerPeriod" : 3
	},
	"outpatientAccident" : {
		"benefitAmount" : 50,
		"maxDaysPerAccident" : 1,
		"maxAccidents" :  3
	},
	"wellness" : {
		"benefitAmount" : 50,
		"maxDaysPerPeriodPersonsAge1+" : 1,
		"maxDaysPerPeriodUnderAge1" : 4
	}
};



lmPlanData.brand = {}; // set up generic & brand data obj

// plan5
lmPlanData.brand['130-plan'] = {

	"dailyHospitalConfinement" : {
		"benefitAmount" : 300,
		"maxDaysPerConfinement" : 10,
		"maxConfinementsPerPeriod" : 1
	},
	"hospitalAdmission" : {
		"benefitAmount" : 1100,
		"maxDaysPerPeriod" : 1
	},
	"icuConfinement" : {
		"benefitAmount" : 200,
		"maxDaysPerPeriod" : 5
	},
	"skilledNursingFacilityConfinemnet" : {
		"benefitAmount" : 200,
		"maxDaysPerPeriod" : 30,
		"maxDaysPerLifetime" : 120
	},
	"inpatientSurgery" : {
		"benefitAmount" : 2200,
		"maxDaysPerPeriod" : 1
	},
	"outpatientSurgery" : {
		"benefitAmount" : 1000,
		"maxDaysPerPeriod" : 1
	},
	"anesthesia" : {
		"benefitAmount" : "20% of Surgical Benefit"
	},
	"outpatientPhysicianOfficeVisit" : {
		"benefitAmount" : 50,
		"maxDaysPerPeriod" : 6
	},
	"outpatientDiagnosticLabTests" : {
		"benefitAmount" : 50,
		"maxDaysPerPeriod" : 3
	},
	"outpatientDiagnosticTests" : {
		"benefitAmount" : 50,
		"maxDaysPerPeriod" : 3
	},
	"outpatientAdvancedDiagnosticTests" : {
		"lvlOneBenefitAmount" : (pf.stateRates === 'MD') ? 'N/A' : 100, // MD isnt special - set to 'N/A'
		"lvlTwoBenefitAmount" : (pf.stateRates === 'MD') ? 'N/A' : "3X Level One Amount",
		"maxDaysPerPeriod" : (pf.stateRates === 'MD') ? 'N/A' : 3
	},
	"ambulance" : {
		"groundWaterBenefit" : 100,
		"airBenefit" : "3X Ground/Water Amount",
		"maxDaysPerPeriod" : 3
	},
	"erInjury" : {
		"benefitAmount" : 300,
		"maxDaysPerPeriod" : 3
	},
	"erSickness" : {
		"benefitAmount" : 75,
		"maxDaysPerPeriod" : 3
	},
	"outpatientAccident" : {
		"benefitAmount" : 50,
		"maxDaysPerAccident" : 1,
		"maxAccidents" : 3
	},
	"wellness" : {
		"benefitAmount" : 50,
		"maxDaysPerPeriodPersonsAge1+" : 1,
		"maxDaysPerPeriodUnderAge1" : 4
	}
};

// plan6
lmPlanData.brand['155-plan'] = {

	"dailyHospitalConfinement" : {
		"benefitAmount" : 400,
		"maxDaysPerConfinement" : 10,
		"maxConfinementsPerPeriod" : 1
	},
	"hospitalAdmission" : {
		"benefitAmount" : 1250,
		"maxDaysPerPeriod" : 1
	},
	"icuConfinement" : {
		"benefitAmount" : 250,
		"maxDaysPerPeriod" : 5
	},
	"skilledNursingFacilityConfinemnet" : {
		"benefitAmount" : 250,
		"maxDaysPerPeriod" : 30,
		"maxDaysPerLifetime" : 120
	},
	"inpatientSurgery" : {
		"benefitAmount" : 2500,
		"maxDaysPerPeriod" : 1
	},
	"outpatientSurgery" : {
		"benefitAmount" : 1250,
		"maxDaysPerPeriod" : 1
	},
	"anesthesia" : {
		"benefitAmount" : "20% of Surgical Benefit"
	},
	"outpatientPhysicianOfficeVisit" : {
		"benefitAmount" : 60,
		"maxDaysPerPeriod" : 6
	},
	"outpatientDiagnosticLabTests" : {
		"benefitAmount" : 50,
		"maxDaysPerPeriod" : 3
	},
	"outpatientDiagnosticTests" : {
		"benefitAmount" : 50,
		"maxDaysPerPeriod" : 3
	},
	"outpatientAdvancedDiagnosticTests" : {
		"lvlOneBenefitAmount" : "N/A",
		"lvlTwoBenefitAmount" : "N/A",
		"maxDaysPerPeriod" : "N/A"
	},
	"ambulance" : {
		"groundWaterBenefit" : 200,
		"airBenefit" : "3X Ground/Water Amount",
		"maxDaysPerPeriod" : 3
	},
	"erInjury" : {
		"benefitAmount" : 500,
		"maxDaysPerPeriod" : 3
	},
	"erSickness" : {
		"benefitAmount" : 75,
		"maxDaysPerPeriod" : 3
	},
	"outpatientAccident" : {
		"benefitAmount" : "N/A",
		"maxDaysPerAccident" : "N/A",
		"maxAccidents" :  "N/A"
	},
	"wellness" : {
		"benefitAmount" : 50,
		"maxDaysPerPeriodPersonsAge1+" : 1,
		"maxDaysPerPeriodUnderAge1" : 4
	}
};


// lmPlanData.brand['dc-130-plan'] = {

// 	"dailyHospitalConfinement" : {
// 		"benefitAmount" : 300,
// 		"maxDaysPerConfinement" : 10,
// 		"maxConfinementsPerPeriod" : 1
// 	},
// 	"hospitalAdmission" : {
// 		"benefitAmount" : 1100,
// 		"maxDaysPerPeriod" : 1,
// 	},
// 	"icuConfinement" : {
// 		"benefitAmount" : 200,
// 		"maxDaysPerPeriod" : 5
// 	},
// 	"skilledNursingFacilityConfinemnet" : {
// 		"benefitAmount" : 200,
// 		"maxDaysPerPeriod" : 30,
// 		"maxDaysPerLifetime" : 120
// 	},
// 	"inpatientSurgery" : {
// 		"benefitAmount" : 2200,
// 		"maxDaysPerPeriod" : 1
// 	},
// 	"outpatientSurgery" : {
// 		"benefitAmount" : 1000,
// 		"maxDaysPerPeriod" : 1
// 	},
// 	"anesthesia" : {
// 		"benefitAmount" : "20% of Surgical Benefit"
// 	},
// 	"outpatientPhysicianOfficeVisit" : {
// 		"benefitAmount" : 50,
// 		"maxDaysPerPeriod" : 6
// 	},
// 	"outpatientDiagnosticLabTests" : {
// 		"benefitAmount" : 50,
// 		"maxDaysPerPeriod" : 3
// 	},
// 	"outpatientDiagnosticTests" : {
// 		"benefitAmount" : 50,
// 		"maxDaysPerPeriod" : 3
// 	},
// 	"outpatientAdvancedDiagnosticTests" : {
// 		"lvlOneBenefitAmount" : 100,
// 		"lvlTwoBenefitAmount" : "3X Level One Amount",
// 		"maxDaysPerPeriod" : 3
// 	},
// 	"ambulance" : {
// 		"groundWaterBenefit" : 100,
// 		"airBenefit" : "3X Ground/Water Amount",
// 		"maxDaysPerPeriod" : 3
// 	},
// 	"erInjury" : {
// 		"benefitAmount" : 300,
// 		"maxDaysPerPeriod" : 3
// 	},
// 	"erSickness" : {
// 		"benefitAmount" : 75,
// 		"maxDaysPerPeriod" : 3
// 	},
// 	"outpatientAccident" : {
// 		"benefitAmount" : 50,
// 		"maxDaysPerAccident" : 1,
// 		"maxAccidents" :  3
// 	},
// 	"wellness" : {
// 		"benefitAmount" : 50,
// 		"maxDaysPerPeriodPersonsAge1+" : 1,
// 		"maxDaysPerPeriodUnderAge1" : 4
// 	},
// 	rates : {
// 		"monthly" : [127.35, 241.18, 227.92, 343.75], 
// 		"semiMonthly" : [63.68, 120.59, 113.96, 171.88],
// 		"biWeekly" : [58.78, 111.32, 105.20, 158.66],
// 		"weekly" : [29.38, 55.65, 52.59, 79.32]
// 	} // ee, ee + spouse, ee + child, ee+ family
// };

// we need to clear outpatient drug benefit vals beow if MD or ILME is selected

lmPlanData.generic.additionalBenefits = {
	"eeOnlyTermLifeADD" : { // all states and plans
		"benefitAmount" : 5000
	},
	"outpatientIndemnityPrescriptionDrugBenefit" : {
		"prescriptionBenefit" : "Generic Only",
		"prescriptionAnnualBenefitMax" : 1000
	}

}; // additional plan benefits

lmPlanData.brand.additionalBenefits = {
	"eeOnlyTermLifeADD" : { // all states and plans
		"benefitAmount" : 5000
	},
	"outpatientIndemnityPrescriptionDrugBenefit" : { // 'stdSt', 'IN OH RI', 'DC', 'FL'
		"prescriptionBenefit" : "Generic and Brand",
		"prescriptionAnnualBenefitMax" : 2000
	}
};

// ********************
// RATE TABLES
// ********************

lmPlanData.rates = {};

// standard state rates

// ee, ee + spouse, ee + child, ee+ family
lmPlanData.rates['stdSt-50-plan'] = {
	"monthly" : [51.22, 88.94, 84.59, 123.10],
	"semiMonthly" : [25.62, 44.47, 42.30, 61.55],
	"biWeekly" : [23.64, 41.06, 39.05, 56.82],
	"weekly" : [11.81, 20.52, 19.51, 28.40]
};
lmPlanData.rates['stdSt-60-plan'] = {
	"monthly" : [58.85, 104.20, 98.92, 145.06],
	"semiMonthly" : [29.43, 52.10, 49.46, 72.53],
	"biWeekly" : [27.16, 48.10, 45.66, 66.95],
	"weekly" : [13.57, 24.04, 22.82, 33.47]
};
lmPlanData.rates['stdSt-90-plan'] = {
	"monthly" : [77.75, 142.00, 134.45, 199.49],
	"semiMonthly" : [38.88, 71.00, 67.23, 99.75],
	"biWeekly" : [35.88, 65.55, 62.06, 92.07],
	"weekly" : [17.93, 32.76, 31.02, 46.03]
};
lmPlanData.rates['stdSt-115-plan'] = {
	"monthly" : [103.19, 192.88, 182.28, 272.76],
	"semiMonthly" : [51.60, 96.44, 91.14, 136.38],
	"biWeekly" : [47.62, 89.03, 84.14, 125.89],
	"weekly" : [23.80, 44.50, 42.06, 62.94]
};
lmPlanData.rates['stdSt-130-plan'] = {
	"monthly" : [127.35, 241.18, 227.92, 343.75], 
	"semiMonthly" : [63.68, 120.59, 113.96, 171.88],
	"biWeekly" : [58.78, 111.32, 105.20, 158.66],
	"weekly" : [29.38, 55.65, 52.59, 79.32]
};
lmPlanData.rates['stdSt-155-plan'] = {
	"monthly" : [140.40, 267.28, 252.45, 381.33],
	"semiMonthly" : [70.21, 133.64, 126.23, 190.67],
	"biWeekly" : [64.80, 123.36, 116.52, 176.01],
	"weekly" : [32.40, 61.67, 58.25, 87.99]	
};

// IL and ME rates
lmPlanData.rates['ILME-50-plan'] = {
	"monthly" : [37.17, 66.72, 63.19, 92.74],
	"semiMonthly" : [18.59, 33.36, 31.60, 46.37],
	"biWeekly" : [17.16, 30.80, 29.17, 42.81],
	"weekly" : [8.57, 15.39, 14.57, 21.39]
};
lmPlanData.rates['ILME-60-plan'] = {
	"monthly" : [44.80, 81.98, 77.52, 114.70],
	"semiMonthly" : [22.40, 40.99, 38.76, 57.35],
	"biWeekly" : [20.68, 37.84, 35.78, 52.94],
	"weekly" : [10.33, 18.91, 17.88, 26.46]
};
lmPlanData.rates['ILME-90-plan'] = {
	"monthly" : [63.70, 119.78, 113.05, 169.13],
	"semiMonthly" : [31.85, 59.89, 56.53, 84.57],
	"biWeekly" : [29.40, 55.29, 52.18, 78.06],
	"weekly" : [14.69, 27.63, 26.08, 39.02]
};
lmPlanData.rates['ILME-115-plan'] = {
	"monthly" : [89.14, 170.66, 160.88, 242.40],
	"semiMonthly" : [44.57, 85.33, 80.44, 121.20],
	"biWeekly" : [41.14, 78.77, 74.26, 111.88],
	"weekly" : [20.56, 39.37, 37.12, 55.93]
};
lmPlanData.rates['ILME-130-plan'] = {
	"monthly" : [101.50, 195.38, 184.12, 278.00],
	"semiMonthly" : [50.75, 97.69, 92.06, 139.00],
	"biWeekly" : [46.85, 90.18, 84.98, 128.31],
	"weekly" : [23.41, 45.08, 42.48, 64.15]
};
lmPlanData.rates['ILME-155-plan'] = {
	"monthly" : [114.55, 221.48, 208.65, 315.58],
	"semiMonthly" : [57.28, 110.74, 104.33, 157.79],
	"biWeekly" : [52.87, 102.22, 96.30, 145.66],
	"weekly" : [26.43, 51.10, 48.14, 72.82]
};

// FL 51-500 rates
lmPlanData.rates['FL-50-plan'] = {
	"monthly" : [44.64, 76.68, 72.97, 105.75],
	"semiMonthly" : [22.33, 38.35, 36.49, 52.89],
	"biWeekly" : [20.61, 35.40, 33.68, 48.81],
	"weekly" : [10.30, 17.70, 16.84, 24.40]
};
lmPlanData.rates['FL-60-plan'] = {
	"monthly" : [51.00, 89.40, 84.93, 124.07],
	"semiMonthly" : [25.51, 44.71, 42.47, 62.05],
	"biWeekly" : [23.54, 41.27, 39.20, 57.26],
	"weekly" : [11.77, 20.63, 19.60, 28.63]
};
lmPlanData.rates['FL-90-plan'] = {
	"monthly" : [66.78, 120.96, 114.59, 169.51],
	"semiMonthly" : [33.40, 60.49, 57.30, 84.77],
	"biWeekly" : [30.83, 55.83, 52.89, 78.24],
	"weekly" : [15.41, 27.92, 26.44, 39.12]
};
lmPlanData.rates['FL-115-plan'] = {
	"monthly" : [87.97, 163.34, 154.43, 230.54],
	"semiMonthly" : [43.99, 81.68, 77.22, 115.28],
	"biWeekly" : [40.61, 75.39, 71.28, 106.40],
	"weekly" : [20.30, 37.70, 35.63, 53.20]
};
lmPlanData.rates['FL-130-plan'] = {
	"monthly" : [109.21, 205.81, 194.56, 293.01],
	"semiMonthly" : [54.61, 102.91, 97.29, 146.52],
	"biWeekly" : [50.40, 94.99, 89.80, 135.24],
	"weekly" : [25.20, 47.49, 44.90, 67.62]
};
lmPlanData.rates['FL-155-plan'] = {
	"monthly" : [120.11, 227.61, 215.07, 324.42],
	"semiMonthly" : [60.06, 113.81, 107.54, 162.22],
	"biWeekly" : [55.43, 105.05, 99.27, 149.74],
	"weekly" : [27.72, 52.52, 49.63, 74.87]
};

// IN, ON, RI rates - .60 LR plus 5K life
lmPlanData.rates['INOHRI-50-plan'] = {
	"monthly" : [45.85, 78.63, 74.85, 108.42],
	"semiMonthly" : [22.94, 39.32, 37.43, 54.22],
	"biWeekly" : [21.16, 36.30, 34.55, 50.04],
	"weekly" : [10.58, 18.15, 17.28, 25.02]
};
lmPlanData.rates['INOHRI-60-plan'] = {
	"monthly" :[52.21, 91.35, 86.81, 126.74],
	"semiMonthly" :[26.12, 45.68, 43.41, 63.38],
	"biWeekly" :[24.09, 42.17, 40.07, 58.49],
	"weekly" :[12.05, 21.08, 20.04, 29.25]
};
lmPlanData.rates['INOHRI-90-plan'] = {
	"monthly" : [67.99, 122.91, 116.47, 172.18],
	"semiMonthly" : [34.01, 61.46, 58.24, 86.10],
	"biWeekly" : [31.38, 56.73, 53.76, 79.47],
	"weekly" : [15.69, 28.37, 26.88, 39.74]
};
lmPlanData.rates['INOHRI-115-plan'] = {
	"monthly" : [89.18, 165.29, 156.31, 233.21],
	"semiMonthly" : [44.60, 82.65, 78.16, 116.61],
	"biWeekly" : [41.16, 76.29, 72.15, 107.63],
	"weekly" : [20.58, 38.15, 36.07, 53.82]
};
lmPlanData.rates['INOHRI-130-plan'] = {
	"monthly" : [111.26, 209.43, 198.02, 298.19],
	"semiMonthly" : [55.64, 104.72, 99.02, 149.11],
	"biWeekly" : [51.35, 96.66, 91.40, 137.63],
	"weekly" : [25.68, 48.33, 45.70, 68.81]
};
lmPlanData.rates['INOHRI-155-plan'] = {
	"monthly" : [122.16, 231.23, 218.53, 329.60],
	"semiMonthly" : [61.09, 115.62, 109.27, 164.81],
	"biWeekly" : [56.38, 106.72, 100.87, 152.13],
	"weekly" : [28.20, 53.36, 50.43, 76.06]
};

// MD rates - .60 LR plus 5k life
lmPlanData.rates['MD-50-plan'] = {
	"monthly" : [31.80, 56.41, 53.45, 78.06],
	"semiMonthly" : [15.91, 28.21, 26.73, 39.04],
	"biWeekly" : [14.68, 26.04, 24.67, 36.03],
	"weekly" : [7.34, 13.02, 12.34, 18.01]
};
lmPlanData.rates['MD-60-plan'] = {
	"monthly" : [38.16, 69.13, 65.41, 96.38],
	"semiMonthly" : [19.09, 34.57, 32.71, 48.20],
	"biWeekly" : [17.61, 31.91, 30.19, 44.48],
	"weekly" :	 [8.81, 15.95, 15.10, 22.24]
};
lmPlanData.rates['MD-90-plan'] = {
	"monthly" : [53.94, 100.69, 95.07, 141.82],
	"semiMonthly" : [26.98, 50.35, 47.54, 70.92],
	"biWeekly" : [24.90, 46.47, 43.88, 65.46],
	"weekly" : [12.45, 23.24, 21.94, 32.73]
};
lmPlanData.rates['MD-115-plan'] = {
	"monthly" : [71.00, 134.81, 127.15, 190.96],
	"semiMonthly" : [35.51, 67.41, 63.58, 95.49],
	"biWeekly" : [32.77, 62.22, 58.69, 88.14],
	"weekly" : [16.39, 31.11, 29.34, 44.07]
};
lmPlanData.rates['MD-130-plan'] = {
	"monthly" : [81.28, 155.37, 146.46, 220.55],
	"semiMonthly" : [40.65, 77.69, 73.24, 110.28],
	"biWeekly" : [37.52, 71.71, 67.60, 101.79],
	"weekly" : [18.76, 35.86, 33.80, 50.90]
};
lmPlanData.rates['MD-155-plan'] = {
	"monthly" : [96.31, 185.43, 174.73, 263.85],
	"semiMonthly" : [48.16, 92.72, 87.37, 131.93],
	"biWeekly" : [44.45, 85.58, 80.65, 121.78],
	"weekly" : [22.23, 42.79, 40.32, 60.89]
};

// dc rates
lmPlanData.rates['DC-115-plan'] = {
	"monthly" : [103.19, 192.88, 182.28, 272.76],
	"semiMonthly" : [51.60, 96.44, 91.14, 136.38],
	"biWeekly" : [47.62, 89.03, 84.14, 125.89],
	"weekly" : [23.80, 44.50, 42.06, 62.94]
};
lmPlanData.rates['DC-130-plan'] = {
	"monthly" : [127.35, 241.18, 227.92, 343.75],
	"semiMonthly" : [63.68, 120.59, 113.96, 171.88],
	"biWeekly" : [58.78, 111.32, 105.20, 158.66],
	"weekly" : [29.38, 55.65, 52.59, 79.32]
};
lmPlanData.rates['DC-155-plan'] = {
	"monthly" : [140.40, 267.28, 252.45, 381.33],
	"semiMonthly" : [70.21, 133.64, 126.23, 190.67],
	"biWeekly" : [64.80, 123.36, 116.52, 176.01],
	"weekly" : [32.40, 61.67, 58.25, 87.99]
};


// ********************
// DATA FUNCTIONS & FORMATTERS
// ********************

// checking values from data to handle returning proper formatting for 
// the information. for example: '$100 per day', '1 day', '5 days' or 'N/A'
function dayFormat(value, perDay){
	var str = "day";

	if (perDay) { // looks for an optional boolean argument

		if (typeof value === 'string') { 
			return value; // if comes in as a string, just return the string
		} else {
			value = f_money(value); // this is dealing with dollar amounts per day, so add a dolla sign
			str = " per " + str; // perDay is truthy, add 'per ' to the front
		}		
		
	} else {

		if (value > 1) {
			str += "s"; // add 's' to the end
		} else if (typeof value === 'string') { 
			return value; // if its a string, just return the string
		}

	}

		return value + ' ' + str; // return appropriate string
}

function f_money(value) { // display as dollar amounts with commas
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
    var period = pf.lmPayroll;

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

function clearOutpatientDrug() {

	var naVals = ['MD', 'ILME'],
	scope = pf.planScope;

	for (var i = 0; i < naVals.length; i++) {
		if (pf.stateRates === naVals[i]){

			scope.additionalBenefits = {
				"outpatientIndemnityPrescriptionDrugBenefit" : { 
					"prescriptionBenefit" : "N/A",
					"prescriptionAnnualBenefitMax" : "N/A"
				}
			};
		}
	}
	
}

// ********************
// VISUAL STRUCTURE
// ********************

function headerRow() {

	var plans = pf.listPlansSelected(),
	plansLen = plans.length,

	planNames = pf.listPlanNames(),
	i = 0;

	var xat_start = '<!--ATModel:PF_Area_Template_Box-->';
	xat_start += '<!--size:1905000,75910-->';
	xat_start += '<?Pageflex pf_xat_ver="1"?>';

	var xat_body = '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="0" height="shrinkwrap" width="1905000" y_position="0" x_position="0">';
	// empty, far left cell
	xat_body += '<PF_TextFrame_Base fill_color="Kemper_Orange" fill_name="_solid_fill" bottom_margin="20320" height="maximize" width="666750" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="25400" right_margin="25400" top_margin="20320">';
	xat_body += '<_text_column max_width="615950" min_width="0" v_align_contents="center" runaround="false">';
	xat_body += '<table_header_center>';
	xat_body += '<_char></_char>';
	xat_body += '</table_header_center>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	
	// cells
	for (i = 0; i < plansLen; i++) {
		xat_body += '<PF_TextFrame_Base fill_color="Kemper_Orange" fill_name="_solid_fill" bottom_margin="20320" x_position="1039747" y_position="-805169" display_order="10" width="maximize" height="maximize" runaround="false" left_margin="25400" right_margin="25400" top_margin="20320">';
		xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="center" runaround="false" width="maximize">';
		xat_body += '<table_header>';
		xat_body += '<_char>' + planNames[i] + '</_char>';
		xat_body += '</table_header>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
	}
	
	xat_body += '</PF_HBox_Base>';

	return xat_start + xat_body;

}

function benefitPlans1 () {
	
	var scope = pf.planScope(), // find .generic or .brand
	plans = pf.listPlansSelected(), // array of plans selected ['50-plan', '60-plan', '90-plan']
	plansLen = plans.length,
	i = 0;

	var xat_start = '<!--ATModel:PF_Area_Template_Box-->';
	xat_start += '<!--size:1905000,2180944-->';
	xat_start += '<?Pageflex pf_xat_ver="1"?>';

	// Daily Hosptial Confinement group
	var xat_body = '<PF_VBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="0" height="shrinkwrap" width="1905000" y_position="0" x_position="0">';
	xat_body += '<PF_VBox_Base fill_tint="20.000000" fill_color="Kemper_Orange" fill_name="_solid_fill" border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="8" height="shrinkwrap" width="1905000" y_position="317196" x_position="127000" top_margin="22860" bottom_margin="22860">';
	xat_body += '<PF_TextFrame_Base top_margin="0" right_margin="25400" left_margin="25400" height="shrinkwrap" width="1905000" display_order="13" y_position="453044" x_position="-1968818">';
	xat_body += '<_text_column max_width="1905000" min_width="0">';
	xat_body += '<table_cell_leftHeading_tight>';
	xat_body += '<_char>Daily Hospital Confinement</_char>';
	xat_body += '</table_cell_leftHeading_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	
	// benefit items column
	xat_body += '<PF_HBox_Base bottom_margin="0" top_margin="5080" min_height="7620" fill_tint="20.000000" fill_color="Kemper_Orange" fill_name="_none" x_position="-1968818" y_position="510549" width="1905000" height="shrinkwrap" display_order="12" v_align_contents="top" h_align_contents="left" border_name="_none" border_simple_thickness="0">';
	xat_body += '<PF_TextFrame_Base min_height="7620" top_margin="0" right_margin="25400" left_margin="25400" runaround="false" x_position="126338" y_position="-805169" display_order="1" width="666750" height="maximize" bottom_margin="0">';
	xat_body += '<_text_column runaround="false" v_align_contents="bottom" min_width="0" max_width="615950">';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Benefit Amount</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Maximum Days per Confinement</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Maximum Confinements per Benefit Period</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	// plan columns
	for (i = 0; i < plansLen; i++) {
		xat_body += '<PF_TextFrame_Base top_margin="0" right_margin="25400" left_margin="25400" runaround="false" height="maximize" width="maximize" display_order="10" y_position="-805169" x_position="1039747" bottom_margin="0">';
		xat_body += '<_text_column width="maximize" runaround="false" v_align_contents="bottom" max_width="2743200" min_width="0">';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].dailyHospitalConfinement.benefitAmount, true) + '</_char>'; // benefit amount
		xat_body += '</table_cell_tight>';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].dailyHospitalConfinement.maxDaysPerConfinement) + '</_char>'; // max days per confinement
		xat_body += '</table_cell_tight>';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + scope[plans[i]].dailyHospitalConfinement.maxConfinementsPerPeriod + '</_char>'; // // max confinements
		xat_body += '</table_cell_tight>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
	}

	xat_body += '</PF_HBox_Base>'; // end hbox
	xat_body += '</PF_VBox_Base>'; // end Daily Hospital confinement

	// Hospital Admission 
	xat_body += '<PF_VBox_Base x_position="127000" y_position="479162" width="1905000" height="shrinkwrap" display_order="9" v_align_contents="top" h_align_contents="left" border_name="_none" border_simple_thickness="0" fill_name="_solid_fill" fill_color="White" fill_tint="20.000000" top_margin="22860" bottom_margin="22860">';
	xat_body += '<PF_TextFrame_Base x_position="-1968818" y_position="453044" display_order="13" width="1905000" height="shrinkwrap" left_margin="25400" right_margin="25400" top_margin="0">';
	xat_body += '<_text_column min_width="0" max_width="1905000">';
	xat_body += '<table_cell_leftHeading_tight>';
	xat_body += '<_char>Hospital Admission</_char>';
	xat_body += '</table_cell_leftHeading_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="12" height="shrinkwrap" width="1905000" y_position="510549" x_position="-1968818" fill_name="_none" fill_color="Kemper_Orange" fill_tint="20.000000" min_height="7620" top_margin="5080" bottom_margin="0">';
	xat_body += '<PF_TextFrame_Base bottom_margin="0" height="maximize" width="666750" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="25400" right_margin="25400" top_margin="0" min_height="7620">';
	xat_body += '<_text_column max_width="615950" min_width="0" v_align_contents="bottom" runaround="false">';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Benefit Amount</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Maximum Days per Confinement</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	// cells
	for (i = 0; i < plansLen; i++) {
		xat_body += '<PF_TextFrame_Base bottom_margin="0" x_position="1039747" y_position="-805169" display_order="10" width="maximize" height="maximize" runaround="false" left_margin="25400" right_margin="25400" top_margin="0">';
		xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="bottom" runaround="false" width="maximize">';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].hospitalAdmission.benefitAmount, true) + '</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].hospitalAdmission.maxDaysPerPeriod) + '</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
	}

	xat_body += '</PF_HBox_Base>';
	xat_body += '</PF_VBox_Base>'; // end hospital admission

	// ICU confinement
	xat_body += '<PF_VBox_Base bottom_margin="22860" top_margin="22860" fill_tint="20.000000" fill_color="Kemper_Orange" fill_name="_solid_fill" border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="10" height="shrinkwrap" width="1905000" y_position="628718" x_position="127000">';
	xat_body += '<PF_TextFrame_Base top_margin="0" right_margin="25400" left_margin="25400" height="shrinkwrap" width="1905000" display_order="15" y_position="-288662" x_position="-1968818">';
	xat_body += '<_text_column max_width="1905000" min_width="0">';
	xat_body += '<table_cell_leftHeading_tight>';
	xat_body += '<_char>Intensive Care Unit Confinement</_char>';
	xat_body += '</table_cell_leftHeading_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	
	xat_body += '<PF_HBox_Base bottom_margin="0" top_margin="5080" min_height="7620" fill_tint="20.000000" fill_color="Kemper_Orange" fill_name="_none" x_position="-1968818" y_position="-236599" width="1905000" height="shrinkwrap" display_order="14" v_align_contents="top" h_align_contents="left" border_name="_none" border_simple_thickness="0">';
	xat_body += '<PF_TextFrame_Base min_height="7620" top_margin="0" right_margin="25400" left_margin="25400" runaround="false" x_position="126338" y_position="-805169" display_order="1" width="666750" height="maximize" bottom_margin="0">';
	xat_body += '<_text_column runaround="false" v_align_contents="bottom" min_width="0" max_width="615950">';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Benefit Amount</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Maximum per Benefit Period</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	for (i = 0; i < plansLen; i++){
		xat_body += '<PF_TextFrame_Base top_margin="0" right_margin="25400" left_margin="25400" runaround="false" height="maximize" width="maximize" display_order="10" y_position="-805169" x_position="1039747" bottom_margin="0">';
		xat_body += '<_text_column width="maximize" runaround="false" v_align_contents="bottom" max_width="2743200" min_width="0">';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].icuConfinement.benefitAmount, true) + '</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].icuConfinement.maxDaysPerPeriod) + '</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
	}

	xat_body += '</PF_HBox_Base>';
	
	// group footnote
	xat_body += '<PF_HBox_Base bottom_margin="0" top_margin="5080" min_height="7620" fill_tint="20.000000" fill_color="Kemper_Orange" fill_name="_none" x_position="-1968818" y_position="-129236" width="1905000" height="shrinkwrap" display_order="12" v_align_contents="top" h_align_contents="left" border_name="_none" border_simple_thickness="0">';
	xat_body += '<PF_TextFrame_Base min_height="7620" top_margin="0" right_margin="25400" left_margin="25400" runaround="false" x_position="126338" y_position="-805169" display_order="1" width="666750" height="maximize" bottom_margin="0">';
	xat_body += '<_text_column runaround="false" v_align_contents="bottom" min_width="0" max_width="615950">';
	xat_body += '<table_cell_right_light>';
	xat_body += '<_char>Paid in addition to Daily Hospital Confinement</_char>';
	xat_body += '</table_cell_right_light>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	xat_body += '<PF_TextFrame_Base top_margin="0" right_margin="25400" left_margin="25400" runaround="false" height="maximize" width="maximize" display_order="10" y_position="-805169" x_position="1039747" bottom_margin="0" data_tag_for_delete="HIPlan1">';
	xat_body += '<_text_column width="maximize" runaround="false" v_align_contents="bottom" max_width="2743200" min_width="0">';
	xat_body += '<table_cell_right_light>';
	xat_body += '<_char></_char>';
	xat_body += '</table_cell_right_light>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	xat_body += '</PF_HBox_Base>';
	xat_body += '</PF_VBox_Base>';

	// Skilled Nursing Facility Confinment group
	xat_body += '<PF_VBox_Base x_position="127000" y_position="811570" width="1905000" height="shrinkwrap" display_order="11" v_align_contents="top" h_align_contents="left" border_name="_none" border_simple_thickness="0" fill_name="_solid_fill" fill_color="White" top_bumper="0" bottom_bumper="0" top_margin="22860" bottom_margin="22860">';
	xat_body += '<PF_TextFrame_Base x_position="-1968818" y_position="-288662" display_order="15" width="1905000" height="shrinkwrap" left_margin="25400" right_margin="25400" top_margin="0">';
	xat_body += '<_text_column min_width="0" max_width="1905000">';
	xat_body += '<table_cell_leftHeading_tight>';
	xat_body += '<_char>Skilled Nursing Facility Confinement</_char>';
	xat_body += '</table_cell_leftHeading_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="14" height="shrinkwrap" width="1905000" y_position="-236599" x_position="-1968818" fill_name="_none" fill_color="Kemper_Orange" fill_tint="20.000000" min_height="7620" top_margin="5080" bottom_margin="0">';
	xat_body += '<PF_TextFrame_Base bottom_margin="0" height="maximize" width="666750" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="25400" right_margin="25400" top_margin="0" min_height="7620">';
	xat_body += '<_text_column max_width="615950" min_width="0" v_align_contents="bottom" runaround="false">';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Benefit Amount</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Maximum per Benefit Period</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Maximum per Lifetime</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	for (i = 0; i < plansLen; i++){
		xat_body += '<PF_TextFrame_Base bottom_margin="0" x_position="1039747" y_position="-805169" display_order="10" width="maximize" height="maximize" runaround="false" left_margin="25400" right_margin="25400" top_margin="0">';
		xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="bottom" runaround="false" width="maximize">';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].skilledNursingFacilityConfinemnet.benefitAmount, true) + '</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].skilledNursingFacilityConfinemnet.maxDaysPerPeriod) + '</_char>'; // 30 days or N/A
		xat_body += '</table_cell_tight>';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].skilledNursingFacilityConfinemnet.maxDaysPerLifetime)+'</_char>'; // 120 days or N/A
		xat_body += '</table_cell_tight>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
	}

	xat_body += '</PF_HBox_Base>';

	xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="12" height="shrinkwrap" width="1905000" y_position="-129236" x_position="-1968818" fill_name="_none" fill_color="Kemper_Orange" fill_tint="20.000000" min_height="7620" top_margin="5080" bottom_margin="0">';
	xat_body += '<PF_TextFrame_Base bottom_margin="0" height="maximize" width="666750" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="25400" right_margin="25400" top_margin="0" min_height="7620">';
	xat_body += '<_text_column max_width="615950" min_width="0" v_align_contents="bottom" runaround="false">';
	xat_body += '<table_cell_right_light>';
	xat_body += '<_char>Must be under age 65 and admitted to the Skilled</_char>';
	xat_body += '</table_cell_right_light>';
	xat_body += '<table_cell_right_light>';
	xat_body += '<_char>Nursing Facility within 14 days following a</_char>';
	xat_body += '</table_cell_right_light>';
	xat_body += '<table_cell_right_light>';
	xat_body += '<_char>Hospital stay of at least three consecutive days.</_char>';
	xat_body += '</table_cell_right_light>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	xat_body += '<PF_TextFrame_Base bottom_margin="0" x_position="1039747" y_position="-805169" display_order="10" width="maximize" height="maximize" runaround="false" left_margin="25400" right_margin="25400" top_margin="0">';
	xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="bottom" runaround="false" width="maximize">';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char></_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	xat_body += '</PF_HBox_Base>';
	xat_body += '</PF_VBox_Base>';

	// inpatient surgery  
	xat_body += '<PF_VBox_Base fill_tint="20.000000" fill_color="Kemper_Orange" fill_name="_solid_fill" border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="12" height="shrinkwrap" width="1905000" y_position="1100232" x_position="127000" top_margin="22860" bottom_margin="22860">';
	xat_body += '<PF_TextFrame_Base top_margin="0" right_margin="25400" left_margin="25400" height="shrinkwrap" width="1905000" display_order="13" y_position="453044" x_position="-1968818">';
	xat_body += '<_text_column max_width="1905000" min_width="0">';
	xat_body += '<table_cell_leftHeading_tight>';
	xat_body += '<_char>Inpatient Surgery</_char>';
	xat_body += '</table_cell_leftHeading_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	xat_body += '<PF_HBox_Base bottom_margin="0" top_margin="5080" min_height="7620" fill_tint="20.000000" fill_color="Kemper_Orange" fill_name="_none" x_position="-1968818" y_position="510549" width="1905000" height="shrinkwrap" display_order="12" v_align_contents="top" h_align_contents="left" border_name="_none" border_simple_thickness="0">';
	xat_body += '<PF_TextFrame_Base min_height="7620" top_margin="0" right_margin="25400" left_margin="25400" runaround="false" x_position="126338" y_position="-805169" display_order="1" width="666750" height="maximize" bottom_margin="0">';
	xat_body += '<_text_column runaround="false" v_align_contents="bottom" min_width="0" max_width="615950">';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Benefit Amount</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Maximum per Benefit Period</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	// benefit plan values
	for (i = 0; i < plansLen; i++){
		xat_body += '<PF_TextFrame_Base top_margin="0" right_margin="25400" left_margin="25400" runaround="false" height="maximize" width="maximize" display_order="10" y_position="-805169" x_position="1039747" bottom_margin="0">';
		xat_body += '<_text_column width="maximize" runaround="false" v_align_contents="bottom" max_width="2743200" min_width="0">';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].inpatientSurgery.benefitAmount, true) + '</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].inpatientSurgery.maxDaysPerPeriod) + '</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
	}

	xat_body += '</PF_HBox_Base>';
	xat_body += '</PF_VBox_Base>';

	// Outpatient Surgery
	xat_body += '<PF_VBox_Base fill_color="White" fill_name="_solid_fill" bottom_margin="22860" top_margin="22860" x_position="127000" y_position="1249788" width="1905000" height="shrinkwrap" display_order="13" v_align_contents="top" h_align_contents="left" border_name="_none" border_simple_thickness="0">';
	xat_body += '<PF_TextFrame_Base x_position="-1968818" y_position="-288662" display_order="15" width="1905000" height="shrinkwrap" left_margin="25400" right_margin="25400" top_margin="0">';
	xat_body += '<_text_column min_width="0" max_width="1905000">';
	xat_body += '<table_cell_leftHeading_tight>';
	xat_body += '<_char>Outpatient Surgery</_char>';
	xat_body += '</table_cell_leftHeading_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="14" height="shrinkwrap" width="1905000" y_position="-236599" x_position="-1968818" fill_name="_none" fill_color="Kemper_Orange" fill_tint="20.000000" min_height="7620" top_margin="5080" bottom_margin="0">';
	xat_body += '<PF_TextFrame_Base bottom_margin="0" height="maximize" width="666750" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="25400" right_margin="25400" top_margin="0" min_height="7620">';
	xat_body += '<_text_column max_width="615950" min_width="0" v_align_contents="bottom" runaround="false">';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Benefit Amount</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Maximum per Benefit Period</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	for (i = 0; i < plansLen; i++){
		xat_body += '<PF_TextFrame_Base bottom_margin="0" x_position="1039747" y_position="-805169" display_order="10" width="maximize" height="maximize" runaround="false" left_margin="25400" right_margin="25400" top_margin="0">';
		xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="bottom" runaround="false" width="maximize">';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].outpatientSurgery.benefitAmount, true) + ' </_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].outpatientSurgery.maxDaysPerPeriod) + '</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
	}

	xat_body += '</PF_HBox_Base>';

	xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="12" height="shrinkwrap" width="1905000" y_position="-129236" x_position="-1968818" fill_name="_none" fill_color="Kemper_Orange" fill_tint="20.000000" min_height="7620" top_margin="5080" bottom_margin="0">';
	xat_body += '<PF_TextFrame_Base bottom_margin="0" height="maximize" width="666750" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="25400" right_margin="25400" top_margin="0" min_height="7620">';
	xat_body += '<_text_column max_width="615950" min_width="0" v_align_contents="bottom" runaround="false">';
	xat_body += '<table_cell_right_light>';
	xat_body += '<_char>Benefits are not payable for surgical operations</_char>';
	xat_body += '</table_cell_right_light>';
	xat_body += '<table_cell_right_light>';
	xat_body += '<_char>performed in a Physician’s office.</_char>';
	xat_body += '</table_cell_right_light>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	xat_body += '<PF_TextFrame_Base bottom_margin="0" x_position="1039747" y_position="-805169" display_order="10" width="maximize" height="maximize" runaround="false" left_margin="25400" right_margin="25400" top_margin="0">';
	xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="bottom" runaround="false" width="maximize">';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char></_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	xat_body += '</PF_HBox_Base>';
	xat_body += '</PF_VBox_Base>';

	// anesthesia benefit
	xat_body += '<PF_VBox_Base fill_tint="20.000000" fill_color="Kemper_Orange" fill_name="_solid_fill" border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="14" height="shrinkwrap" width="1905000" y_position="1467910" x_position="127000" top_margin="22860" bottom_margin="22860">';
	xat_body += '<PF_TextFrame_Base top_margin="0" right_margin="25400" left_margin="25400" height="shrinkwrap" width="1905000" display_order="13" y_position="453044" x_position="-1968818">';
	xat_body += '<_text_column max_width="1905000" min_width="0">';
	xat_body += '<table_cell_leftHeading_tight>';
	xat_body += '<_char>Anesthesia</_char>';
	xat_body += '</table_cell_leftHeading_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	xat_body += '<PF_HBox_Base bottom_margin="0" top_margin="5080" min_height="7620" fill_tint="20.000000" fill_color="Kemper_Orange" fill_name="_none" x_position="-1968818" y_position="510549" width="1905000" height="shrinkwrap" display_order="12" v_align_contents="top" h_align_contents="left" border_name="_none" border_simple_thickness="0">';
	xat_body += '<PF_TextFrame_Base min_height="7620" top_margin="0" right_margin="25400" left_margin="25400" runaround="false" x_position="126338" y_position="-805169" display_order="1" width="666750" height="maximize" bottom_margin="0">';
	xat_body += '<_text_column runaround="false" v_align_contents="bottom" min_width="0" max_width="615950">';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Benefit Amount</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	// columns
	for (i = 0; i < plansLen; i++){
		xat_body += '<PF_TextFrame_Base top_margin="0" right_margin="25400" left_margin="25400" runaround="false" height="maximize" width="maximize" display_order="10" y_position="-805169" x_position="1039747" bottom_margin="0">';
		xat_body += '<_text_column width="maximize" runaround="false" v_align_contents="bottom" max_width="2743200" min_width="0">';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].anesthesia.benefitAmount) + '</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
	}

	xat_body += '</PF_HBox_Base>';
	xat_body += '</PF_VBox_Base>';
	// outpatient physician office visit
	xat_body += '<PF_VBox_Base fill_tint="20.000000" fill_color="White" fill_name="_solid_fill" border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="15" height="shrinkwrap" width="1905000" y_position="1582196" x_position="127000" top_margin="22860" bottom_margin="22860">';
	xat_body += '<PF_TextFrame_Base top_margin="0" right_margin="25400" left_margin="25400" height="shrinkwrap" width="1905000" display_order="13" y_position="453044" x_position="-1968818">';
	xat_body += '<_text_column max_width="1905000" min_width="0">';
	xat_body += '<table_cell_leftHeading_tight>';
	xat_body += '<_char>Outpatient Physician Office Visit</_char>';
	xat_body += '</table_cell_leftHeading_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	xat_body += '<PF_HBox_Base bottom_margin="0" top_margin="5080" min_height="7620" fill_tint="20.000000" fill_color="Kemper_Orange" fill_name="_none" x_position="-1968818" y_position="510549" width="1905000" height="shrinkwrap" display_order="12" v_align_contents="top" h_align_contents="left" border_name="_none" border_simple_thickness="0">';
	xat_body += '<PF_TextFrame_Base min_height="7620" top_margin="0" right_margin="25400" left_margin="25400" runaround="false" x_position="126338" y_position="-805169" display_order="1" width="666750" height="maximize" bottom_margin="0">';
	xat_body += '<_text_column runaround="false" v_align_contents="bottom" min_width="0" max_width="615950">';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Benefit Amount</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Maximum per Benefit Period</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	// columns
	for (i = 0; i < plansLen; i++){
		xat_body += '<PF_TextFrame_Base top_margin="0" right_margin="25400" left_margin="25400" runaround="false" height="maximize" width="maximize" display_order="10" y_position="-805169" x_position="1039747" bottom_margin="0">';
		xat_body += '<_text_column width="maximize" runaround="false" v_align_contents="bottom" max_width="2743200" min_width="0">';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].outpatientPhysicianOfficeVisit.benefitAmount, true) + '</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].outpatientPhysicianOfficeVisit.maxDaysPerPeriod) + ' days</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
	}

	xat_body += '</PF_HBox_Base>';
	xat_body += '</PF_VBox_Base>';

	xat_body += '<PF_VBox_Base fill_tint="20.000000" fill_color="Kemper_Orange" fill_name="_solid_fill" bottom_margin="22860" top_margin="22860" x_position="127000" y_position="1731752" width="1905000" height="shrinkwrap" display_order="16" v_align_contents="top" h_align_contents="left" border_name="_none" border_simple_thickness="0">';
	xat_body += '<PF_TextFrame_Base x_position="-1968818" y_position="-288662" display_order="15" width="1905000" height="shrinkwrap" left_margin="25400" right_margin="25400" top_margin="0">';
	xat_body += '<_text_column min_width="0" max_width="1905000">';
	xat_body += '<table_cell_leftHeading_tight>';
	xat_body += '<_char>Outpatient Diagnostic Laboratory Tests</_char>';
	xat_body += '</table_cell_leftHeading_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="14" height="shrinkwrap" width="1905000" y_position="-236599" x_position="-1968818" fill_name="_none" fill_color="Kemper_Orange" fill_tint="20.000000" min_height="7620" top_margin="5080" bottom_margin="0">';
	xat_body += '<PF_TextFrame_Base bottom_margin="0" height="maximize" width="666750" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="25400" right_margin="25400" top_margin="0" min_height="7620">';
	xat_body += '<_text_column max_width="615950" min_width="0" v_align_contents="bottom" runaround="false">';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Benefit Amount</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Maximum per Benefit Period</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	for (i = 0; i < plansLen; i++){
		xat_body += '<PF_TextFrame_Base bottom_margin="0" x_position="1039747" y_position="-805169" display_order="10" width="maximize" height="maximize" runaround="false" left_margin="25400" right_margin="25400" top_margin="0">';
		xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="bottom" runaround="false" width="maximize">';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].outpatientDiagnosticLabTests.benefitAmount, true) + '</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].outpatientDiagnosticLabTests.maxDaysPerPeriod)+ '</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
	}

	xat_body += '</PF_HBox_Base>';

	xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="12" height="shrinkwrap" width="1905000" y_position="-129236" x_position="-1968818" fill_name="_none" fill_color="Kemper_Orange" fill_tint="20.000000" min_height="7620" top_margin="5080" bottom_margin="0">';
	xat_body += '<PF_TextFrame_Base bottom_margin="0" height="maximize" width="666750" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="25400" right_margin="25400" top_margin="0" min_height="7620">';
	xat_body += '<_text_column max_width="615950" min_width="0" v_align_contents="bottom" runaround="false">';
	xat_body += '<table_cell_right_light>';
	xat_body += '<_char>Routine or wellness lab screens &amp; tests not covered.</_char>';
	xat_body += '</table_cell_right_light>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	xat_body += '<PF_TextFrame_Base bottom_margin="0" x_position="1039747" y_position="-805169" display_order="10" width="maximize" height="maximize" runaround="false" left_margin="25400" right_margin="25400" top_margin="0">';
	xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="bottom" runaround="false" width="maximize">';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char></_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	xat_body += '</PF_HBox_Base>';

	xat_body += '</PF_VBox_Base>'; // end outpatient diagnostic LAB tests

	// outpatient diagnostic tests
	xat_body += '<PF_VBox_Base fill_tint="20.000000" fill_color="White" fill_name="_solid_fill" bottom_margin="22860" top_margin="22860" x_position="127000" y_position="1949874" width="1905000" height="shrinkwrap" display_order="17" v_align_contents="top" h_align_contents="left" border_name="_none" border_simple_thickness="0">';
	xat_body += '<PF_TextFrame_Base x_position="-1968818" y_position="-288662" display_order="15" width="1905000" height="shrinkwrap" left_margin="25400" right_margin="25400" top_margin="0">';
	xat_body += '<_text_column min_width="0" max_width="1905000">';
	xat_body += '<table_cell_leftHeading_tight>';
	xat_body += '<_char>Outpatient Diagnostic Tests</_char>';
	xat_body += '</table_cell_leftHeading_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="14" height="shrinkwrap" width="1905000" y_position="-236599" x_position="-1968818" fill_name="_none" fill_color="Kemper_Orange" fill_tint="20.000000" min_height="7620" top_margin="5080" bottom_margin="0">';
	xat_body += '<PF_TextFrame_Base bottom_margin="0" height="maximize" width="666750" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="25400" right_margin="25400" top_margin="0" min_height="7620">';
	xat_body += '<_text_column max_width="615950" min_width="0" v_align_contents="bottom" runaround="false">';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Benefit Amount</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Maximum per Benefit Period</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	
	// columns data
	for (i = 0; i < plansLen; i++){
		xat_body += '<PF_TextFrame_Base bottom_margin="0" x_position="1039747" y_position="-805169" display_order="10" width="maximize" height="maximize" runaround="false" left_margin="25400" right_margin="25400" top_margin="0">';
		xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="bottom" runaround="false" width="maximize">';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].outpatientDiagnosticTests.benefitAmount, true) + '</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].outpatientDiagnosticTests.maxDaysPerPeriod) + '</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
	}

	xat_body += '</PF_HBox_Base>';
	// footnote
	xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="12" height="shrinkwrap" width="1905000" y_position="-129236" x_position="-1968818" fill_name="_none" fill_color="Kemper_Orange" fill_tint="20.000000" min_height="7620" top_margin="5080" bottom_margin="0">';
	xat_body += '<PF_TextFrame_Base bottom_margin="0" height="maximize" width="666750" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="25400" right_margin="25400" top_margin="0" min_height="7620">';
	xat_body += '<_text_column max_width="615950" min_width="0" v_align_contents="bottom" runaround="false">';
	xat_body += '<table_cell_right_light>';
	xat_body += '<_char>Laboratory tests and routine wellness screens &amp;</_char>';
	xat_body += '</table_cell_right_light>';
	xat_body += '<table_cell_right_light>';
	xat_body += '<_char>tests not covered</_char>';
	xat_body += '</table_cell_right_light>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	xat_body += '<PF_TextFrame_Base bottom_margin="0" x_position="1039747" y_position="-805169" display_order="10" width="maximize" height="maximize" runaround="false" left_margin="25400" right_margin="25400" top_margin="0">';
	xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="bottom" runaround="false" width="maximize">';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char></_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	xat_body += '</PF_HBox_Base>';

	xat_body += '</PF_VBox_Base>'; // end outpatient diagnostic tests

	// outpatient advanced diagnostic tests
	xat_body += '<PF_VBox_Base fill_tint="20.000000" fill_color="Kemper_Orange" fill_name="_solid_fill" bottom_margin="22860" top_margin="22860" border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="18" height="shrinkwrap" width="1905000" y_position="2167996" x_position="127000">';
	xat_body += '<PF_TextFrame_Base x_position="-1968817" y_position="-927465" display_order="15" width="1905000" height="shrinkwrap" left_margin="25400" right_margin="25400" top_margin="0">';
	xat_body += '<_text_column min_width="0" max_width="1905000">';
	xat_body += '<table_cell_leftHeading_tight>';
	xat_body += '<_char>Outpatient Advanced Diagnostic Tests</_char>';
	xat_body += '</table_cell_leftHeading_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="16" height="shrinkwrap" width="1905000" y_position="-895722" x_position="-1968817" fill_name="_none" fill_color="Kemper_Orange" fill_tint="20.000000" min_height="7620" top_margin="5080" bottom_margin="0">';
	xat_body += '<PF_TextFrame_Base bottom_margin="0" height="maximize" width="666750" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="25400" right_margin="25400" top_margin="0" min_height="7620">';
	xat_body += '<_text_column max_width="615950" min_width="0" v_align_contents="bottom" runaround="false">';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Level One Benefit Amount</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	for (i = 0; i < plansLen; i++){
		xat_body += '<PF_TextFrame_Base bottom_margin="0" x_position="1039747" y_position="-805169" display_order="10" width="maximize" height="maximize" runaround="false" left_margin="25400" right_margin="25400" top_margin="0">';
		xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="bottom" runaround="false" width="maximize">';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].outpatientAdvancedDiagnosticTests.lvlOneBenefitAmount, true) + '</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
	}

	xat_body += '</PF_HBox_Base>';
	// level one descriptions
	xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="17" height="shrinkwrap" width="1905000" y_position="-858899" x_position="-1968817" fill_name="_none" fill_color="Kemper_Orange" fill_tint="20.000000" min_height="7620" top_margin="5080" bottom_margin="0">';
	xat_body += '<PF_TextFrame_Base bottom_margin="0" height="maximize" width="666750" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="25400" right_margin="25400" top_margin="0" min_height="7620">';
	xat_body += '<_text_column max_width="615950" min_width="0" v_align_contents="bottom" runaround="false">';
	xat_body += '<table_cell_right_light>';
	xat_body += '<_char>Ultrasound, Mammogram, Stress Test,</_char>';
	xat_body += '</table_cell_right_light>';
	xat_body += '<table_cell_right_light>';
	xat_body += '<_char>Echocardiogram, EEG, or EKG</_char>';
	xat_body += '</table_cell_right_light>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	xat_body += '<PF_TextFrame_Base bottom_margin="0" x_position="1039747" y_position="-805169" display_order="10" width="maximize" height="maximize" runaround="false" left_margin="25400" right_margin="25400" top_margin="0">';
	xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="bottom" runaround="false" width="maximize">';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char></_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	xat_body += '</PF_HBox_Base>';
	// level two title
	xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="18" height="shrinkwrap" width="1905000" y_position="-822076" x_position="-1968817" fill_name="_none" fill_color="Kemper_Orange" fill_tint="20.000000" min_height="7620" top_margin="5080" bottom_margin="0">';
	xat_body += '<PF_TextFrame_Base bottom_margin="0" height="maximize" width="666750" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="25400" right_margin="25400" top_margin="0" min_height="7620">';
	xat_body += '<_text_column max_width="615950" min_width="0" v_align_contents="bottom" runaround="false">';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Level Two Benefit Amount</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	for (i = 0; i < plansLen; i++) {
		xat_body += '<PF_TextFrame_Base bottom_margin="0" x_position="1039747" y_position="-805169" display_order="10" width="maximize" height="maximize" runaround="false" left_margin="25400" right_margin="25400" top_margin="0">';
		xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="bottom" runaround="false" width="maximize">';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].outpatientAdvancedDiagnosticTests.lvlTwoBenefitAmount) + '</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>'; 
	}

	xat_body += '</PF_HBox_Base>';

	// level two descriptions
	xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="19" height="shrinkwrap" width="1905000" y_position="-785253" x_position="-1968817" fill_name="_none" fill_color="Kemper_Orange" fill_tint="20.000000" min_height="7620" top_margin="5080" bottom_margin="0">';
	xat_body += '<PF_TextFrame_Base bottom_margin="0" height="maximize" width="666750" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="25400" right_margin="25400" top_margin="0" min_height="7620">';
	xat_body += '<_text_column max_width="615950" min_width="0" v_align_contents="bottom" runaround="false">';
	xat_body += '<table_cell_right_light>';
	xat_body += '<_char>CT or CAT, MRI, MRA, or PET</_char>';
	xat_body += '</table_cell_right_light>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	xat_body += '<PF_TextFrame_Base bottom_margin="0" x_position="1039747" y_position="-805169" display_order="10" width="maximize" height="maximize" runaround="false" left_margin="25400" right_margin="25400" top_margin="0">';
	xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="bottom" runaround="false" width="maximize">';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char></_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	xat_body += '</PF_HBox_Base>';

	xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="20" height="shrinkwrap" width="1905000" y_position="-748430" x_position="-1968818" fill_name="_none" fill_color="Kemper_Orange" fill_tint="20.000000" min_height="7620" top_margin="5080" bottom_margin="0">';
	xat_body += '<PF_TextFrame_Base bottom_margin="0" height="maximize" width="666750" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="25400" right_margin="25400" top_margin="0" min_height="7620">';
	xat_body += '<_text_column max_width="615950" min_width="0" v_align_contents="bottom" runaround="false">';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Maximum per Benefit Period</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	for (i = 0; i < plansLen; i++) {
		xat_body += '<PF_TextFrame_Base bottom_margin="0" x_position="1039747" y_position="-805169" display_order="10" width="maximize" height="maximize" runaround="false" left_margin="25400" right_margin="25400" top_margin="0">';
		xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="bottom" runaround="false" width="maximize">';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].outpatientAdvancedDiagnosticTests.maxDaysPerPeriod) + '</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
	}

	xat_body += '</PF_HBox_Base>';

	// maximum per benefit period description
	xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="21" height="shrinkwrap" width="1905000" y_position="-711607" x_position="-1968818" fill_name="_none" fill_color="Kemper_Orange" fill_tint="20.000000" min_height="7620" top_margin="5080" bottom_margin="0">';
	xat_body += '<PF_TextFrame_Base bottom_margin="0" height="maximize" width="666750" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="25400" right_margin="25400" top_margin="0" min_height="7620">';
	xat_body += '<_text_column max_width="615950" min_width="0" v_align_contents="bottom" runaround="false">';
	xat_body += '<table_cell_right_light>';
	xat_body += '<_char>Level One &amp; Two Combined”</_char>';
	xat_body += '</table_cell_right_light>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	xat_body += '<PF_TextFrame_Base bottom_margin="0" x_position="1039747" y_position="-805169" display_order="10" width="maximize" height="maximize" runaround="false" left_margin="25400" right_margin="25400" top_margin="0">';
	xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="bottom" runaround="false" width="maximize">';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char></_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	xat_body += '</PF_HBox_Base>';

	xat_body += '</PF_VBox_Base>'; // end outpatient advanced diagnostic tests

	xat_body += '</PF_VBox_Base>'; // end table 1


	return xat_start + xat_body;
}


function benefitPlans2(){

	var scope = pf.planScope(),
	plans = pf.listPlansSelected(),
	plansLen = plans.length,

	planNames = pf.listPlanNames(),
	i = 0;

	var xat_start = '<!--ATModel:PF_Area_Template_Box-->';
	xat_start += '<!--size:1905000,1468027-->';
	xat_start += '<?Pageflex pf_xat_ver="1"?>';

	var xat_body = '<PF_VBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="0" height="shrinkwrap" width="1905000" y_position="0" x_position="0">';

	xat_body += '<PF_VBox_Base fill_tint="20.000000" fill_color="Kemper_Orange" fill_name="_solid_fill" bottom_margin="22860" top_margin="22860" x_position="-2019970" y_position="497759" width="1905000" height="shrinkwrap" display_order="10" v_align_contents="top" h_align_contents="left" border_name="_none" border_simple_thickness="0">';
	
	xat_body += '<PF_TextFrame_Base x_position="-1968818" y_position="-288662" display_order="15" width="1905000" height="shrinkwrap" left_margin="25400" right_margin="25400" top_margin="0">';
	xat_body += '<_text_column min_width="0" max_width="1905000">';
	xat_body += '<table_cell_leftHeading_tight>';
	xat_body += '<_char>Ambulance</_char>';
	xat_body += '</table_cell_leftHeading_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="14" height="shrinkwrap" width="1905000" y_position="-236599" x_position="-1968818" fill_name="_none" fill_color="Kemper_Orange" fill_tint="20.000000" min_height="7620" top_margin="5080" bottom_margin="0">';
	xat_body += '<PF_TextFrame_Base bottom_margin="0" height="maximize" width="666750" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="25400" right_margin="25400" top_margin="0" min_height="7620">';
	xat_body += '<_text_column max_width="615950" min_width="0" v_align_contents="bottom" runaround="false">';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Benefit for Ground/Water Ambulance</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Benefit for Air Ambulance</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Maximum per Benefit Period</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	
	for (i = 0; i < plansLen; i++) {
		xat_body += '<PF_TextFrame_Base bottom_margin="0" x_position="1039747" y_position="-805169" display_order="10" width="maximize" height="maximize" runaround="false" left_margin="25400" right_margin="25400" top_margin="0">';
		xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="bottom" runaround="false" width="maximize">';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].ambulance.groundWaterBenefit, true) + '</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char additional_letterspacing="-0.050000em">' + dayFormat(scope[plans[i]].ambulance.airBenefit) + '</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].ambulance.maxDaysPerPeriod) + '</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
	}
	// ambulance footnotea
	xat_body += '</PF_HBox_Base>';
	xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="12" height="shrinkwrap" width="1905000" y_position="-129236" x_position="-1968818" fill_name="_none" fill_color="Kemper_Orange" fill_tint="20.000000" min_height="7620" top_margin="5080" bottom_margin="0">';
	xat_body += '<PF_TextFrame_Base bottom_margin="0" height="maximize" width="666750" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="25400" right_margin="25400" top_margin="0" min_height="7620">';
	xat_body += '<_text_column max_width="615950" min_width="0" v_align_contents="bottom" runaround="false">';
	xat_body += '<table_cell_right_light>';
	xat_body += '<_char>Transportation must occur within 72 hours of the</_char>';
	xat_body += '</table_cell_right_light>';
	xat_body += '<table_cell_right_light>';
	xat_body += '<_char>Accident or onset of the Sickness</_char>';
	xat_body += '</table_cell_right_light>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	xat_body += '<PF_TextFrame_Base bottom_margin="0" x_position="1039747" y_position="-805169" display_order="10" width="maximize" height="maximize" runaround="false" left_margin="25400" right_margin="25400" top_margin="0">';
	xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="bottom" runaround="false" width="maximize">';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char></_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	xat_body += '</PF_HBox_Base>';

	xat_body += '</PF_VBox_Base>';

	// er for injury
	xat_body += '<PF_VBox_Base fill_tint="20.000000" fill_color="White" fill_name="_solid_fill" bottom_margin="22860" top_margin="22860" x_position="-2019970" y_position="786421" width="1905000" height="shrinkwrap" display_order="11" v_align_contents="top" h_align_contents="left" border_name="_none" border_simple_thickness="0">';
	xat_body += '<PF_TextFrame_Base x_position="-1968818" y_position="-288662" display_order="15" width="1905000" height="shrinkwrap" left_margin="25400" right_margin="25400" top_margin="0">';
	xat_body += '<_text_column min_width="0" max_width="1905000">';
	xat_body += '<table_cell_leftHeading_tight>';
	xat_body += '<_char>Emergency Room for Injury</_char>';
	xat_body += '</table_cell_leftHeading_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="14" height="shrinkwrap" width="1905000" y_position="-236599" x_position="-1968818" fill_name="_none" fill_color="Kemper_Orange" fill_tint="20.000000" min_height="7620" top_margin="5080" bottom_margin="0">';
	xat_body += '<PF_TextFrame_Base bottom_margin="0" height="maximize" width="666750" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="25400" right_margin="25400" top_margin="0" min_height="7620">';
	xat_body += '<_text_column max_width="615950" min_width="0" v_align_contents="bottom" runaround="false">';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Benefit Amount</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Maximum per Benefit Period</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	for (i = 0; i < plansLen; i++) {
		xat_body += '<PF_TextFrame_Base bottom_margin="0" x_position="1039747" y_position="-805169" display_order="10" width="maximize" height="maximize" runaround="false" left_margin="25400" right_margin="25400" top_margin="0">';
		xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="bottom" runaround="false" width="maximize">';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].erInjury.benefitAmount, true) + '</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].erInjury.maxDaysPerPeriod) + '</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
	}

	xat_body += '</PF_HBox_Base>';

	// erInjury footnote
	xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="12" height="shrinkwrap" width="1905000" y_position="-129236" x_position="-1968818" fill_name="_none" fill_color="Kemper_Orange" fill_tint="20.000000" min_height="7620" top_margin="5080" bottom_margin="0">';
	xat_body += '<PF_TextFrame_Base bottom_margin="0" height="maximize" width="666750" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="25400" right_margin="25400" top_margin="0" min_height="7620">';
	xat_body += '<_text_column max_width="615950" min_width="0" v_align_contents="bottom" runaround="false">';
	xat_body += '<table_cell_right_light>';
	xat_body += '<_char>Treatment must be within 72 hours of the</_char>';
	xat_body += '</table_cell_right_light>';
	xat_body += '<table_cell_right_light>';
	xat_body += '<_char>Accident.</_char>';
	xat_body += '</table_cell_right_light>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	xat_body += '<PF_TextFrame_Base bottom_margin="0" x_position="1039747" y_position="-805169" display_order="10" width="maximize" height="maximize" runaround="false" left_margin="25400" right_margin="25400" top_margin="0">';
	xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="bottom" runaround="false" width="maximize">';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char></_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	xat_body += '</PF_HBox_Base>';

	xat_body += '</PF_VBox_Base>';

	// er for Sickness
	xat_body += '<PF_VBox_Base fill_tint="20.000000" fill_color="Kemper_Orange" fill_name="_solid_fill" border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="12" height="shrinkwrap" width="1905000" y_position="1075083" x_position="-2019970" top_margin="22860" bottom_margin="22860">';
	xat_body += '<PF_TextFrame_Base top_margin="0" right_margin="25400" left_margin="25400" height="shrinkwrap" width="1905000" display_order="13" y_position="453044" x_position="-1968818">';
	xat_body += '<_text_column max_width="1905000" min_width="0">';
	xat_body += '<table_cell_leftHeading_tight>';
	xat_body += '<_char>Emergency Room for Sickness</_char>';
	xat_body += '</table_cell_leftHeading_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	xat_body += '<PF_HBox_Base bottom_margin="0" top_margin="5080" min_height="7620" fill_tint="20.000000" fill_color="Kemper_Orange" fill_name="_none" x_position="-1968818" y_position="510549" width="1905000" height="shrinkwrap" display_order="12" v_align_contents="top" h_align_contents="left" border_name="_none" border_simple_thickness="0">';
	xat_body += '<PF_TextFrame_Base min_height="7620" top_margin="0" right_margin="25400" left_margin="25400" runaround="false" x_position="126338" y_position="-805169" display_order="1" width="666750" height="maximize" bottom_margin="0">';
	xat_body += '<_text_column runaround="false" v_align_contents="bottom" min_width="0" max_width="615950">';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Benefit Amount</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Maximum per Benefit Period</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	for (i = 0; i < plansLen; i++) {
		xat_body += '<PF_TextFrame_Base top_margin="0" right_margin="25400" left_margin="25400" runaround="false" height="maximize" width="maximize" display_order="10" y_position="-805169" x_position="1039747" bottom_margin="0">';
		xat_body += '<_text_column width="maximize" runaround="false" v_align_contents="bottom" max_width="2743200" min_width="0">';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].erSickness.benefitAmount, true) + '</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].erSickness.maxDaysPerPeriod) + '</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
	}

	xat_body += '</PF_HBox_Base>';
	xat_body += '</PF_VBox_Base>';

	// outpatient accident
	xat_body += '<PF_VBox_Base fill_tint="20.000000" fill_color="White" fill_name="_solid_fill" border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="13" height="shrinkwrap" width="1905000" y_position="1259909" x_position="-2019970" top_margin="22860" bottom_margin="22860">';
	xat_body += '<PF_TextFrame_Base top_margin="0" right_margin="25400" left_margin="25400" height="shrinkwrap" width="1905000" display_order="13" y_position="453044" x_position="-1968818">';
	xat_body += '<_text_column max_width="1905000" min_width="0">';
	xat_body += '<table_cell_leftHeading_tight>';
	xat_body += '<_char>Outpatient Accident</_char>';
	xat_body += '</table_cell_leftHeading_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	xat_body += '<PF_HBox_Base bottom_margin="0" top_margin="5080" min_height="7620" fill_tint="20.000000" fill_color="Kemper_Orange" fill_name="_none" x_position="-1968818" y_position="510549" width="1905000" height="shrinkwrap" display_order="12" v_align_contents="top" h_align_contents="left" border_name="_none" border_simple_thickness="0">';
	xat_body += '<PF_TextFrame_Base min_height="7620" top_margin="0" right_margin="25400" left_margin="25400" runaround="false" x_position="126338" y_position="-805169" display_order="1" width="666750" height="maximize" bottom_margin="0">';
	xat_body += '<_text_column runaround="false" v_align_contents="bottom" min_width="0" max_width="615950">';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Benefit Amount</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Maximum per Accident</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Maximum per Benefit Period</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	for (i = 0; i < plansLen; i++) {
		xat_body += '<PF_TextFrame_Base top_margin="0" right_margin="25400" left_margin="25400" runaround="false" height="maximize" width="maximize" display_order="10" y_position="-805169" x_position="1039747" bottom_margin="0">';
		xat_body += '<_text_column width="maximize" runaround="false" v_align_contents="bottom" max_width="2743200" min_width="0">';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].outpatientAccident.benefitAmount, true) + '</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].outpatientAccident.maxDaysPerAccident) + '</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + scope[plans[i]].outpatientAccident.maxAccidents + '</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
	}

	xat_body += '</PF_HBox_Base>';
	xat_body += '</PF_VBox_Base>';

	// Wellness
	xat_body += '<PF_VBox_Base fill_tint="20.000000" fill_color="Kemper_Orange" fill_name="_solid_fill" bottom_margin="22860" top_margin="22860" x_position="-2019970" y_position="1444735" width="1905000" height="shrinkwrap" display_order="14" v_align_contents="top" h_align_contents="left" border_name="_none" border_simple_thickness="0">';
	xat_body += '<PF_TextFrame_Base x_position="-1968818" y_position="-288662" display_order="15" width="1905000" height="shrinkwrap" left_margin="25400" right_margin="25400" top_margin="0">';
	xat_body += '<_text_column min_width="0" max_width="1905000">';
	xat_body += '<table_cell_leftHeading_tight>';
	xat_body += '<_char>Wellness</_char>';
	xat_body += '</table_cell_leftHeading_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="14" height="shrinkwrap" width="1905000" y_position="-236599" x_position="-1968818" fill_name="_none" fill_color="Kemper_Orange" fill_tint="20.000000" min_height="7620" top_margin="5080" bottom_margin="0">';
	xat_body += '<PF_TextFrame_Base bottom_margin="0" height="maximize" width="666750" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="25400" right_margin="25400" top_margin="0" min_height="7620">';
	xat_body += '<_text_column max_width="615950" min_width="0" v_align_contents="bottom" runaround="false">';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Benefit Amount</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Maximum per Benefit Period</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>&NDtab;Insured Persons age 1 and older</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>&NDtab;Insured Persons under age 1</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	for (i = 0; i < plansLen; i++) {
		xat_body += '<PF_TextFrame_Base bottom_margin="0" x_position="1039747" y_position="-805169" display_order="10" width="maximize" height="maximize" runaround="false" left_margin="25400" right_margin="25400" top_margin="0">';
		xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="bottom" runaround="false" width="maximize">';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].wellness.benefitAmount, true) + '</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char></_char>'; // empty line
		xat_body += '</table_cell_tight>';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].wellness['maxDaysPerPeriodPersonsAge1+']) + '</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + dayFormat(scope[plans[i]].wellness.maxDaysPerPeriodUnderAge1) +'</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
	}

	xat_body += '</PF_HBox_Base>';
	
	xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="12" height="shrinkwrap" width="1905000" y_position="-129236" x_position="-1968818" fill_name="_none" fill_color="Kemper_Orange" fill_tint="20.000000" min_height="7620" top_margin="5080" bottom_margin="0">';
	xat_body += '<PF_TextFrame_Base bottom_margin="0" height="maximize" width="666750" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="25400" right_margin="25400" top_margin="0" min_height="7620">';
	xat_body += '<_text_column max_width="615950" min_width="0" v_align_contents="bottom" runaround="false">';
	xat_body += '<table_cell_right_light>';
	xat_body += '<_char>Benefit is payable for each day an Insured person</_char>';
	xat_body += '</table_cell_right_light>';
	xat_body += '<table_cell_right_light>';
	xat_body += '<_char>has any one of the health screenings, exams or</_char>';
	xat_body += '</table_cell_right_light>';
	xat_body += '<table_cell_right_light>';
	xat_body += '<_char>tests listed in the policy.</_char>';
	xat_body += '</table_cell_right_light>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	xat_body += '<PF_TextFrame_Base bottom_margin="0" x_position="1039747" y_position="-805169" display_order="10" width="maximize" height="maximize" runaround="false" left_margin="25400" right_margin="25400" top_margin="0">';
	xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="bottom" runaround="false" width="maximize">';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char></_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	xat_body += '</PF_HBox_Base>';

	xat_body += '</PF_VBox_Base>'; // end wellness

	// additional benefits header
	xat_body += '<PF_HBox_Base border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="15" height="shrinkwrap" width="1905000" y_position="1733397" x_position="-2019970">';
	xat_body += '<PF_TextFrame_Base fill_color="Kemper_Orange" fill_name="_solid_fill" bottom_margin="20320" height="maximize" width="maximize" display_order="1" y_position="-805169" x_position="126338" runaround="false" left_margin="25400" right_margin="25400" top_margin="20320">';
	xat_body += '<_text_column width="maximize" max_width="2743200" min_width="0" v_align_contents="center" runaround="false">';
	xat_body += '<table_header>';
	xat_body += '<_char>Additional Insurance Product Benefits</_char>';
	xat_body += '</table_header>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';
	xat_body += '</PF_HBox_Base>';

	// benefit amount
	xat_body += '<PF_HBox_Base bottom_margin="22860" top_margin="22860" min_height="7620" fill_tint="20.000000" fill_color="Kemper_Orange" fill_name="_solid_fill" x_position="-2019970" y_position="1809307" width="1905000" height="shrinkwrap" display_order="16" v_align_contents="top" h_align_contents="left" border_name="_none" border_simple_thickness="0">';
	xat_body += '<PF_TextFrame_Base min_height="7620" top_margin="0" right_margin="25400" left_margin="25400" runaround="false" x_position="126338" y_position="-805169" display_order="1" width="666750" height="maximize" bottom_margin="0">';
	xat_body += '<_text_column runaround="false" v_align_contents="bottom" min_width="0" max_width="615950">';
	xat_body += '<table_cell_leftHeading_tight>';
	xat_body += '<_char>Benefit Amount</_char>';
	xat_body += '</table_cell_leftHeading_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	for (i = 0; i < plansLen; i++) {
		xat_body += '<PF_TextFrame_Base top_margin="0" right_margin="25400" left_margin="25400" runaround="false" height="maximize" width="maximize" display_order="10" y_position="-805169" x_position="1039747" bottom_margin="0">';
		xat_body += '<_text_column width="maximize" runaround="false" v_align_contents="bottom" max_width="2743200" min_width="0">';
		xat_body += '<table_cell_tight>';
		
		xat_body += '<_char>' + f_money(scope.additionalBenefits.eeOnlyTermLifeADD.benefitAmount) + '</_char>';
		
		xat_body += '</table_cell_tight>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
	}

	// xat_body += '<PF_TextFrame_Base top_margin="0" right_margin="25400" left_margin="25400" runaround="false" height="maximize" width="maximize" display_order="11" y_position="-805169" x_position="1367508" bottom_margin="0">';
	// xat_body += '<_text_column width="maximize" runaround="false" v_align_contents="bottom" max_width="2743200" min_width="0">';
	// xat_body += '<table_cell_tight>';
	// xat_body += '<_char>$5000</_char>';
	// xat_body += '</table_cell_tight>';
	// xat_body += '</_text_column>';
	// xat_body += '</PF_TextFrame_Base>';
	// xat_body += '<PF_TextFrame_Base top_margin="0" right_margin="25400" left_margin="25400" x_position="1695269" y_position="-805169" display_order="12" width="maximize" height="maximize" runaround="false" bottom_margin="0">';
	// xat_body += '<_text_column min_width="0" max_width="2743200" v_align_contents="bottom" runaround="false" width="maximize">';
	// xat_body += '<table_cell_tight>';
	// xat_body += '<_char>$5000</_char>';
	// xat_body += '</table_cell_tight>';
	// xat_body += '</_text_column>';
	// xat_body += '</PF_TextFrame_Base>';
	xat_body += '</PF_HBox_Base>';

	xat_body += '<PF_VBox_Base fill_tint="20.000000" fill_color="White" fill_name="_solid_fill" border_simple_thickness="0" border_name="_none" h_align_contents="left" v_align_contents="top" display_order="17" height="shrinkwrap" width="1905000" y_position="1886770" x_position="-2019970" top_margin="22860" bottom_margin="22860">';
	
	xat_body += '<PF_TextFrame_Base top_margin="0" right_margin="25400" left_margin="25400" height="shrinkwrap" width="1905000" display_order="13" y_position="453044" x_position="-1968818">';
	xat_body += '<_text_column max_width="1905000" min_width="0">';
	xat_body += '<table_cell_leftHeading_tight>';
	xat_body += '<_char>Outpatient Indemnity</_char>';
	xat_body += '</table_cell_leftHeading_tight>';
	xat_body += '<table_cell_leftHeading_tight>';
	xat_body += '<_char>Prescription Drug Benefit</_char>';
	xat_body += '</table_cell_leftHeading_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	xat_body += '<PF_HBox_Base bottom_margin="0" top_margin="5080" min_height="7620" fill_tint="20.000000" fill_color="Kemper_Orange" fill_name="_none" x_position="-1968818" y_position="510549" width="1905000" height="shrinkwrap" display_order="12" v_align_contents="top" h_align_contents="left" border_name="_none" border_simple_thickness="0">';
	xat_body += '<PF_TextFrame_Base min_height="7620" top_margin="0" right_margin="25400" left_margin="25400" runaround="false" x_position="126338" y_position="-805169" display_order="1" width="666750" height="maximize" bottom_margin="0">';
	xat_body += '<_text_column runaround="false" v_align_contents="bottom" min_width="0" max_width="615950">';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Generic Only or Generic/Brand</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '<table_cell_tight>';
	xat_body += '<_char>Annual Benefit Maximum</_char>';
	xat_body += '</table_cell_tight>';
	xat_body += '</_text_column>';
	xat_body += '</PF_TextFrame_Base>';

	for (i = 0; i < plansLen; i++) {

		clearOutpatientDrug();
		
		xat_body += '<PF_TextFrame_Base top_margin="0" right_margin="25400" left_margin="25400" runaround="false" height="maximize" width="maximize" display_order="10" y_position="-805169" x_position="1039747" bottom_margin="0">';
		xat_body += '<_text_column width="maximize" runaround="false" v_align_contents="bottom" max_width="2743200" min_width="0">';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + scope.additionalBenefits.outpatientIndemnityPrescriptionDrugBenefit.prescriptionBenefit + '</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '<table_cell_tight>';
		xat_body += '<_char>' + f_money(scope.additionalBenefits.outpatientIndemnityPrescriptionDrugBenefit.prescriptionAnnualBenefitMax) + '</_char>';
		xat_body += '</table_cell_tight>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
	}

	xat_body += '</PF_HBox_Base>';
	xat_body += '</PF_VBox_Base>';

	xat_body += '</PF_VBox_Base>';

	return xat_start + xat_body;
}

function buildRateTable(){

	var planRates = pf.planRates(), // get plan rates array
	scope = lmPlanData.rates,
	planNames = pf.listPlanNames(), // get array of plan names
	payroll = pf.lmPayroll, // get the payroll value
	fillColor = 'White'; // init fillColor

	var xat_start = '<!--ATModel:PF_Area_Template_Box-->';
	xat_start += '<!--size:1905815,272739-->';
	xat_start += '<?Pageflex pf_xat_ver="1"?>';

	var xat_body;

	var xat_end = '</PF_VBox_Base>';

	var i = 0;

	
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

	for (i = 0; i < planRates.length; i++) {

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
		xat_body += '<_char>$' + scope[planRates[i]][payroll][0].toLocaleString() + '</_char>'; // planRates[i][0]
		xat_body += '</table_cell>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
		xat_body += '<PF_TextFrame_Base bottom_margin="17780" top_margin="17780" right_margin="25400" left_margin="25400" fill_color="' + fillColor + '" fill_name="_solid_fill" runaround="false" height="maximize" width="386080" display_order="8" y_position="2057517" x_position="853593" fill_tint="20.000000">';
		xat_body += '<_text_column runaround="false" v_align_contents="center" max_width="335280" min_width="0">';
		xat_body += '<table_cell>';
		xat_body += '<_char>$' + scope[planRates[i]][payroll][1].toLocaleString() + '</_char>';
		xat_body += '</table_cell>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
		xat_body += '<PF_TextFrame_Base x_position="1239673" y_position="2057517" display_order="9" width="396240" height="maximize" runaround="false" fill_name="_solid_fill" fill_color="' + fillColor + '" left_margin="25400" right_margin="25400" top_margin="17780" bottom_margin="17780" fill_tint="20.000000">';
		xat_body += '<_text_column min_width="0" max_width="345440" v_align_contents="center" runaround="false">';
		xat_body += '<table_cell>';
		xat_body += '<_char>$' + scope[planRates[i]][payroll][2].toLocaleString() + '</_char>';
		xat_body += '</table_cell>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
		xat_body += '<PF_TextFrame_Base x_position="1635913" y_position="2057517" display_order="10" width="396240" height="maximize" runaround="false" fill_name="_solid_fill" fill_color="' + fillColor + '" left_margin="25400" right_margin="25400" top_margin="17780" bottom_margin="17780" fill_tint="20.000000">';
		xat_body += '<_text_column min_width="0" max_width="345440" v_align_contents="center" runaround="false">';
		xat_body += '<table_cell>';
		xat_body += '<_char>$' + scope[planRates[i]][payroll][3].toLocaleString() + '</_char>';
		xat_body += '</table_cell>';
		xat_body += '</_text_column>';
		xat_body += '</PF_TextFrame_Base>';
		xat_body += '</PF_HBox_Base>';
	}


	var table = xat_start + xat_body +  xat_end;
	return table;

}
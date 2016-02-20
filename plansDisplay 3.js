function chartBGVisible(plan1, plan2) {
	// returns boolean value if selected or not: 0 or 1
	plan1 = (plan1 != '');
	plan2 = (plan2 != '');
	// add boolean values
	var total = plan1 + plan2;
	// return appropriate area template
	if (total == 2) {
		return "chart-bar-2plans.xat";
	} else {
		return "chart-bar-1plan.xat";
	} 
};

function findRates(freq, cont, level, dex) {
	//evaluate rate frequency - if it has a dash, replace with underscore for proper rate table.
	switch (freq) {
		case "Semi-Monthly":
			freq = "Semi_Monthly";
		break;
		case "Bi-Weekly":
			freq = "Bi_Weekly";
		break;
		default:
			freq = freq;
	}
	// below are all assigned rates for vision rate sheet
	//monthly rates:
	var MonthlyVolPlus = [8.41, 15.88, 17.34, 22.38];
	var MonthlyVolEnha = [6.83, 12.87, 14.07, 18.17];

	var MonthlyEmpPlus = [6.41, 11.20, 13.45, 16.74];
	var MonthlyEmpEnha = [5.21, 9.91, 10.93, 13.62];
	
	//semi-monthly rates:
	var Semi_MonthlyVolPlus = [4.20, 7.94, 8.67, 11.19];
	var Semi_MonthlyVolEnha = [3.42, 6.44, 7.04, 9.08];

	var Semi_MonthlyEmpPlus = [3.20, 5.60, 6.72, 8.37];
	var Semi_MonthlyEmpEnha = [2.60, 4.96, 5.46, 6.81];
	
	//bi-Weekly rates:
	var Bi_WeeklyVolPlus = [3.88, 7.33, 8.00, 10.33];
	var Bi_WeeklyVolEnha = [3.15, 5.94, 6.49, 8.39];

	var Bi_WeeklyEmpPlus = [2.96, 5.17, 6.21, 7.73];
	var Bi_WeeklyEmpEnha = [2.40, 4.57, 5.04, 6.29];
	
	//Weekly rates:
	var WeeklyVolPlus = [1.94, 3.66, 4.00, 5.16];
	var WeeklyVolEnha = [1.58, 2.97, 3.25, 4.19];

	var WeeklyEmpPlus = [1.48, 2.58, 3.10, 3.86];
	var WeeklyEmpEnha = [1.20, 2.29, 2.52, 3.14];

	var assemble = eval(freq + cont + level);
	var output = assemble[dex];
	
	return '$' + output.toLocaleString();
};
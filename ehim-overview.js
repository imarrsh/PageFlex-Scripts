function qText(rowIndex, fsaType) {
	rowIndex = parseInt(rowIndex); // push content to rows based on selection
	
	questions = []; // dont declare 'var' to make available global
	
	if (fsaType != "MFSA") {
		questions.push("qa-q7.xft");
	}
	questions.push("qa-q8.xft");
	questions.push("qa-q9.xft");
	questions.push("qa-q10.xft");
	if (fsaType != "MFSA") {
		questions.push("qa-q11.xft");
	}
	questions.push("qa-q12.xft");
	
	if (questions[rowIndex] != null) {
		return questions[rowIndex];
	} else {
		return "";
	}
}

function aText(rowIndex, fsaType) { // push content to rows based on selection
	rowIndex = parseInt(rowIndex);
	
	var answers = [];
	
	if (fsaType != "MFSA") {
		answers.push("qa-a7.xft");
	}
	answers.push("qa-a8.xft");
	answers.push("qa-a9.xft");
	answers.push("qa-a10.xft");
	if (fsaType != "MFSA") {
		answers.push("qa-a11.xft");
	}
	answers.push("qa-a12.xft");
	
	if (answers[rowIndex] != null){
		return answers[rowIndex];
	} else {
		return "";
	}
}

function planName (fsaType) { // plan title
	if (fsaType == "MFSA") {
		return "Medical Flexible Spending Account";
	} else if (fsaType == "MDCFSA") {
		return "Medical and Dependent Care Flexible Spending Accounts";
	} else {
		return "Dependent Care Flexible Spending Account";
	}
}

function planPaysFor (fsaType) { // what plan pays for
	if (fsaType == "MFSA") {
		return "medical expenses";
	} else if (fsaType == "MDCFSA") {
		return "medical and dependent care expenses";
	} else {
		return "dependent care expenses";
	}
}

function qalength() { // how many questions?
	var getLen = questions.length.toString();
	return getLen;
}

function rowSet (currentRow) { // call row contatiners
	var rowsNeeded = questions.length;
	currentRow = parseInt(currentRow);
	
	if (currentRow <= rowsNeeded){
		var actualRow = currentRow + 6;
		var template = "row"+actualRow+".xat";
		return template;
	} else {
		return "";
	}
}
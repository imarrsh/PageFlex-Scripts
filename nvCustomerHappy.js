// Script for storing and comparing two different string lengths
// Written by: Marshall Thompson
// Date: July 2015
// Project: Nova Health Care Brochures

// object constructor for the quotee 
function Quotee(name, company, speak){
	this.name = name;
	this.company = company;
	this.speak = speak;
	this.charcount = function(){
		var letterCount = this.speak.length;
		return letterCount;
	}
}

// add quotes here //
var testimonials = {
"knowledge-KrisT" : new Quotee("Kris T.", "Okland Construction", "Nova’s team members are experts in their field, they are passionate about self-funding and really brings us the information we need. Nova has definitely lived up to our expectations."),
"selfFunding-KrisT" : new Quotee("Kris T.", "Okland Construction", "The biggest benefit of working with Nova is that we have been able to switch from fully insured to self-funding. We are now working with a TPA who is willing to partner with us to develop and design a plan that not only offers cost savings, but also benefits our employees and offers the largest network we’ve ever had."),
"customization-PattiB" : new Quotee("Patti B.", "Starpoint Central School District", "Nova’s willingness to personalize our plan has been great. They give us a bit of leeway as far as getting exceptions or getting something looked into deeper, through another company we wouldn’t have this option. They’ve also helped us to save money."),
"eeHealth-ChristinaS" : new Quotee("Christina S.", "Coke Corporation", "Our employees have seen first hand the benefits of working with Nova and having a wellness initiative. We’ve had health coaches reach out to employees after the biometric screenings and, in turn, saved the employee’s life. We’ve seen a huge improvement in wellness program enrollment with Nova and are very excited about the participation this year."),
"bobWorlds-KrisT" : new Quotee("Kris T.", "Okland Construction", "With Nova, we are more than just a number or a cog on a wheel. They are just the right size organization that we receive personalized service for our company."),
"custService-KrisT" : new Quotee("Kris T.", "Okland Construction", "Nova’s willingness to engage their whole team in our self-funded process was important to us. We really feel like we have an army that handles our cases. They’re always very responsive if we have questions or concerns and have definitely lived up to our expectations."),
"custService-ChristinaS" : new Quotee("Christina S.", "Coke Corporation", "Our experience with Nova has been great. Everything that we’ve ever needed or requested from them, they’ve provided in a very timely manner."),
"custService-AngieT" : new Quotee("Angie T.", "Inscape Walls", "The biggest benefit of working with Nova is their customized service and responsiveness when there’s something out of the ordinary. I have seen them jump through hoops for very out of the ordinary cases to try to achieve what the employee wants within our plan design. They really, really work with us and our employees. They’ll call the employee directly when they’re upset. That’s what really sets them apart. The routine claims that are covered and go through without a hitch, that’s not what you remember – you remember the problem."),
"custService-PattiL" : new Quotee("Patti L.", "Certo Brothers", "The best thing is that when I have a question, they’re right there to take care of it and answer it immediately."),
"custService-PattiL-long" : new Quotee("Patti L.", "Certo Brothers", "The best thing about working with Nova is that they are right there to take care of and answer any questions immediately. We don’t have to go through several organizational levels to get something done and have a dedicated account representative with Nova who is always right on top of everything."),
"enroll-KrisT" : new Quotee("Kris T.", "Okland Construction", "Nova was extremely responsive to meeting our needs and strategic in working through the enrollment process. Our team knew that Nova jumped through hoops for us, but enrollment was seamless for our employees."),
"enroll-AngieT" : new Quotee("Angie T.", "Inscape Walls", "Everyone says their enrollment is seamless, and it usually never is. With Nova it wasn’t painful at all. They handled things very professionally and expeditiously. Our employees were also very happy."),
"enroll-PattiL" : new Quotee("Patti L.", "Certo Brothers", "Our experience with Nova has been wonderful - from a smooth enrollment process to providing engaging materials for our employees."),
"network-AngieT" : new Quotee("Angie T.", "Inscape Walls", "We love Nova’s versatility and ability to customize their services for our needs. Their network options are great for us as well since we have employees all over the US, and Nova is able to accommodate network participation.")
// "" : new Quotee("", "", ""),
}
// end quotes //

function quoteGrabCompare(sayer, sayer2, pos, key) {
	// container for objects
	var quoteList = [];
	// go grab objects
	var sayer = testimonials[sayer];
	var sayer2 = testimonials[sayer2];
	// check the "postition"(pos) hard literal from PF var and then compare the length of the quotes
	// and then pushes the objects in, object with longest quote should always display first
	if (pos == "1") { // always either 1 or 2
		if (sayer.charcount() > sayer2.charcount()) {
			quoteList.push(sayer, sayer2);
		} else {
			quoteList.push(sayer2, sayer);
		}
	} else {
		if (sayer.charcount() < sayer2.charcount()) {
			quoteList.push(sayer, sayer2);
		} else {
			quoteList.push(sayer2, sayer);
		}

	}
	// the "key" literal gets the value of object key that we want to display in PF
	// so this function can be reused by a few script variable in the document
	switch (key){
	case "speak":
		return quoteList[0].speak;
		break;
	case "name":
		return quoteList[0].name;
		break;
	case "co":
		return quoteList[0].company;
		break;
	default:
		return "error";
	}
}

function justGrabQuote(sayer, key) { // not comparing anything here
	// grab object
	var sayer = testimonials[sayer][key];

	return sayer;
}
// end program
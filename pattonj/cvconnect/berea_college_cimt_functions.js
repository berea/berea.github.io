
//----------------------------------------------
//Used for Berea College Hobsons Connect to populate various fields
//Created by Jacob Patton (C) 2017,2018
//----------------------------------------------

//variables
var feeDate;			//What date mm/dd/yyyy was the deposit paid? (Dec of Intent View)
var proofOfResDate;		//What date was proof of residency recorded?

//--------------
//Communication and Information Managment Team (Processing) Function
//--------------

//-----------//Evaluation and Endorsements View//-----------//

//create the listeners for the text boxes
function createEEListeners(){
	if(checkViewFields(["text219","date6485Date","text3985","text695","text3283","date7661Date"])){
		//set listener for name 1
		document.getElementById("text219").addEventListener("input", function(){setEEDate("text219","date6485Date","text3985");});
		document.getElementById("text3985").readOnly = true;

		//run function to verify GED & Home School Recomendations
		modifyRecomendationRequirements();

	} else{
		recheckViewFields();
	}
}

//if updated, check to see if date is empty, and if not, insert todays date when the name field is updated.
function setEEDate(EEName,EEDate,EEShadowName){

	if(document.getElementById(EEName).value!==""){
		if(document.getElementById(EEDate).value === ""){
			setDateField(EEDate);
		}
	}
	//Copy to the "shadow" attribute
	document.getElementById(EEShadowName).value = document.getElementById(EEName).value;
}

//Used to alert about GED or Homeschool requirment being different. 
function modifyRecomendationRequirements(){
	document.getElementById("text695").disabled = true;
	document.getElementById("text695").style.color = "#000000";
	document.getElementById("text3283").disabled = true;
	document.getElementById("text3283").style.color = "#000000";
	//show alert if it's either GED or Homeschool is Yes (and E&E 1 is empty). 
	//Looks for changes
	if( document.getElementById("date6485Date").value == ""){
		generalRecDate = document.getElementById("date7661Date").value;
		//Looks for start of action. 
		document.getElementById("date7661Date").addEventListener("click",recomendationAlert);
		document.getElementById("date7661Date").addEventListener("input",recomendationAlert);
		setViewTimer(checkRecomendationDateChange); 
	}
	
	}

//show alert from modifyRecomendationRequirements function. 
function recomendationAlert(){
	//check to make sure EE1 is empty and is homeschooled or GED.  
	if((document.getElementById("text695").value =="GEDX" || document.getElementById("text3283").value=="Y")&& (document.getElementById("text219").value =="" ) ){
		alert("GED OR HOME SCHOOLED\n ----Core Teacher not Required--- \n\nIf recomendation form was used, please enter on right side in Recomendation 1."); 
		//clear timers and listeners so we don't continue to show message. 
		stopViewTimer = true;
		clearTimeout(viewTimer);
		document.getElementById("date7661Date").removeEventListener("click",recomendationAlert);
		document.getElementById("date7661Date").removeEventListener("input",recomendationAlert);
		
		
		
	}
	else{
		return;
	}
}	

// Start the timer to look for Add'l E&E or Rec date change. 
function checkRecomendationDateChange(){
	if(generalRecDate !== document.getElementById("date7661Date").value ){
		recomendationAlert();
	}
}

	
//-----------//High School Transcript and Guidance Counselor View//-----------//
function createHSTranscriptAndPercentListeners(){
	if(checkViewFields(["text3703", "date7349Date","numeric273","numeric277","text3265","hsname","text1501","numeric7963","date7349Date","hscode","hsstate","text1503"])){

		//GED% Field
		document.getElementById("text3265").addEventListener("input",setGEDField);
		//Class Rank Field
		document.getElementById("numeric273").addEventListener("input",setClassRankPercentile);
		//Class Size Field
		document.getElementById("numeric277").addEventListener("input",setClassRankPercentile);
		//Academic Initiative
		document.getElementById("text3703").addEventListener("input", setAcademicInitiativeDate);
		//Adjust Adcademic Intitiave List
		adjustAcademicInitiativeDropdown();
		//Create button to copy HS Transcript
		createHSTranscriptButton();
		

	} else{
		recheckViewFields();
	}
}

//-----------//Guidance Counselor View//-----------//
function createPercentListeners(){
	if(checkViewFields(["text3703", "date7349Date","numeric273","numeric277","numeric7963"])){

		//Class Rank Field
		document.getElementById("numeric273").addEventListener("input",setClassRankPercentile);
		//Class Size Field
		document.getElementById("numeric277").addEventListener("input",setClassRankPercentile);
		//Academic Initiative
		document.getElementById("text3703").addEventListener("input", setAcademicInitiativeDate);
		//Adjust Adcademic Intitiave List
		adjustAcademicInitiativeDropdown();
	} else{
		recheckViewFields();
	}
}

function setAcademicInitiativeDate(){
	var dropdownOption=document.getElementById('text3703').value;
	if (dropdownOption == ""){
		clearDateField("date7349Date",false);
	}else{
		setDateField("date7349Date");
	}
}

function adjustAcademicInitiativeDropdown(){
	//Get the visit type dropdown.
	var dropdown=document.getElementById('text3703');
	var dropdownOption;

	for (var i=0;i<dropdown.length;	 i++) {
		//Get the value of i for visit type;
		dropdownOption = dropdown.options[i].value;
		//Make sure what we are removing isn't the current one selected.
		if (dropdownOption !== dropdown.value){
			//If it isn't, then we can remove it.
			switch (dropdownOption){
				case "Never":
					dropdown.remove(i);
					i--;
					break;
				case "Almost Never":
					dropdown.remove(i);
					i--;
					break;
				case "Sometimes":
					dropdown.remove(i);
					i--;
					break;
				case "Almost Always":
					dropdown.remove(i);
					i--;
					break;
				case "Always":
					dropdown.remove(i);
					i--;
					break;
				default:
					//do nothing
					break;
			}
		}

	}



}

function createHSTranscriptButton(){

	//Create button to copy HS name.
	//I removed the function that would auto copy by setInterval function.
	var bereaButton = document.createElement("div");
	bereaButton.style = "float:right";
	bereaButton.id = "bereaButton";
	bereaButton.innerHTML = "<div class='BereaDropdown'>"+
		"<input ID='Berea_Menu_Button' value='Copy HS Info' class='BereaBlue bigbutton smallbutton new' type='button' onclick='return false;'>"+
	  "</div>";
	var buttonRow = document.getElementById('text1501');
	buttonRow.parentNode.insertBefore(bereaButton, buttonRow.nextSibling);

	document.getElementById("Berea_Menu_Button").addEventListener("click",function(){
		document.getElementById("text1501").value = document.getElementById("hsname").value;
		document.getElementById("text1503").value = document.getElementById("hsstate").value;
		});

}

//sets and checks the class rank percentile.
function setClassRankPercentile(){

	var classRank = document.getElementById("numeric273").value;
	var classSize = document.getElementById("numeric277").value;

	if(classRank !=="" && classSize !=="" && classSize < 15 && Number(classRank) <= Number(classSize) ){
		//if class size is less than 15, we don't want to give a percentile. 
		document.getElementById("numeric7963").value = "";
		document.getElementById("numeric7963").style.backgroundColor = "";
	
	} else if(classRank !=="" && classSize !==""){
		document.getElementById("numeric7963").value = Math.round(100*(1-(classRank/classSize)));
		 if( Math.round(100*(1-(classRank/classSize))) < 0){
			document.getElementById("numeric7963").style.backgroundColor = "#FFFF00";
		 }else{
			document.getElementById("numeric7963").style.backgroundColor = "";
		 }
		
		 document.getElementById("numeric277").style.backgroundColor = "";
		
	} else if((classRank =="" && classSize !=="")||(classRank !=="" && classSize =="")){
		document.getElementById("numeric7963").style.backgroundColor = "#FFFF00";
		document.getElementById("numeric277").style.backgroundColor = "";
		document.getElementById("numeric7963").value = "";
		
	} else if(classRank =="" && classSize ==""){
		document.getElementById("numeric7963").style.backgroundColor = "";
	}
}

function setGEDField(){
	//If the HS Transcript Name is GED (So we don't accidentally overwrite data. )
	if(document.getElementById("text1501").value ==="GED"){
		//class rank
		document.getElementById("numeric273").value = "";
		//class size
		document.getElementById("numeric277").value = "";
		//class percentile (and in case it was red)
		document.getElementById("numeric7963").value = "";
		document.getElementById("numeric7963").style.backgroundColor = "";
		//Set percentile Recorded Date - UPDATE
		//setDateField("date7349Date");

	}

}


//-----------//Dec of Intent / Ent Fee / Non-Enrolling View//-----------//
function createFeeDateListener(){

	if(checkViewFields(["date2951Date","numeric2821"])){
		
		feeDate = document.getElementById("date2951Date").value;
		//Replaced focusout or keydown with timer. 
		setViewTimer(checkFeeDateChange); 
	} else{
		recheckViewFields();
	}
}

//Set fee amount, or clear the amount if the date is removed.
function checkFeeDateChange(){
	if(feeDate == document.getElementById("date2951Date").value){
		//needed for when the date doesn't change. 
		return;
	}else if(document.getElementById("numeric2821").value !== "" && document.getElementById("date2951Date").value ==""){
		feeDate = document.getElementById("date2951Date").value;
		document.getElementById("numeric2821").value = "";
		console.log("Deposit amount removed");
	}else if(document.getElementById("numeric2821").value !== "" && document.getElementById("date2951Date").value !==""){
		feeDate = document.getElementById("date2951Date").value;
		console.log("Already has deposit amount");
	}else if(document.getElementById("numeric2821").value == "" && document.getElementById("date2951Date").value !==""){
		feeDate = document.getElementById("date2951Date").value;
		document.getElementById("numeric2821").value = "50";
		console.log ("$50 added to deposit field");
	}
}

//-----------//International Apps Processing View//-----------//
function createInternationalAppListener(){
	if(checkViewFields(["text2961","date2959Date"])){
			document.getElementById("text2961").addEventListener("change",setIntlAppProcDate);
	} else{
		recheckViewFields();
	}
}

function setIntlAppProcDate(){
	if(document.getElementById("date2959Date").value === ""){
		setDateField("date2959Date");
	}
}

//-----------//Fall Checklist - Transfer View//-----------//
// createFallChecklistTransferListener
function createFallChecklistTransferListener(){
	if(checkViewFields(["date209Date","text7923","text6133","text6131","text6129","text6127","text1525","date2925Date"])){
		fallChecklistProofOfResidencyListener();
		if(!(document.getElementById("date2925Date").value == "")){
			var	collegeSemesterHours = ["text6133","text6131","text6129","text6127"];
			var totalSemesterHours = 0;
				
			for (var i = 0; i < collegeSemesterHours.length; i++){
				if( !isNaN(document.getElementById(collegeSemesterHours[i]).value)){
				totalSemesterHours = totalSemesterHours + Number(document.getElementById(collegeSemesterHours[i]).value);
				}
			}

			if (totalSemesterHours >= 36) {
				document.getElementById("text1525").value = "W";
			}
		}
	}
}

//after loading, check that semseter hours are a number
//If they are, add them together, otherwise, show alert with "invalid input". 
// If they are >= 36, then set test score as waived automatically. 


//-----------//Fall Checklist - New View//-----------//
function createFallChecklistNewListener(){
	if(checkViewFields(["date209Date","text7923"])){
		fallChecklistProofOfResidencyListener();
		// if value hours 1 is a numb, 
	} else{
		recheckViewFields();
	}

}

function fallChecklistProofOfResidencyListener(){
	proofOfResDate = document.getElementById("date209Date").value;
	document.getElementById("date209Date").readOnly = true;
	setViewTimer(fallChecklistProofOfResidencyAlert);
	document.getElementById("date209Date").addEventListener("click",function(){document.activeElement.blur();fallChecklistProofOfResidencyAlert(true);});
	document.getElementById("date209Date").addEventListener("keydown",function(e){if( e.which == 9 ) {return;}document.activeElement.blur();fallChecklistProofOfResidencyAlert(true);});
}

function fallChecklistProofOfResidencyAlert(alertOnly){
	if(alertOnly === true){
			document.getElementById("date209Date").value = proofOfResDate;
			alert("Please use the Proof of Residency view.");
	}
	else{
		if(proofOfResDate == document.getElementById("date209Date").value){
			//needed for when the date doesn't change.
			return;
		}else {
			document.getElementById("date209Date").value = proofOfResDate;
			alert("Please use the Proof of Residency view.");
		}
	}
}


//-----------//Proof of Residency View//-----------//
function createProofofResidencyListener(){
if(checkViewFields(["date209Date","text7923"])){
		proofOfResDate = document.getElementById("date209Date").value;
		setViewTimer(proofOfResidencyAlert);
		document.getElementById("date209Date").addEventListener("click",function(){clearDateField("date209Date");});
		document.getElementById("date209Date").addEventListener("keydown",function(e){if( e.which == 9 ) {return;} else{ e.preventDefault(); alert("Please use your date picker to set the date.");}});

	} else{
		recheckViewFields();
	}

}

function proofOfResidencyAlert(){
	if(proofOfResDate == document.getElementById("date209Date").value){
		//needed for when the date doesn't change.
		return;
	}else if(document.getElementById("text7923").value === "DACA" && document.getElementById("date209Date").value !==""){
		proofOfResDate = document.getElementById("date209Date").value;
		alert("DACA APPLICANT\n \nPlease confirm that:\n\n The Category is C33 \n The expiration date is after the fall start date\n");
	}else if(document.getElementById("text7923").value !== "" && document.getElementById("date209Date").value !==""){
		proofOfResDate = document.getElementById("date209Date").value;
		alert("Please confirm that:\n\n The expiration date is after 8/15/2020 \n");
	}else if (document.getElementById("text7923").value == "" && document.getElementById("date209Date").value !==""){
		document.getElementById("date209Date").value = "";
		alert("Please select immigrant status type first.");
	}
}

//--------------
//Recruitment And Outreach Functions
//--------------

//None currently. 
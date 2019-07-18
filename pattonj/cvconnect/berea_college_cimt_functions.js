
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
	if(checkViewFields(["text219","date6485Date","text3985","text223","date6487Date","text3987"])){
		//set listener for name 1
		document.getElementById("text219").addEventListener("input", function(){setEEDate("text219","date6485Date","text3985");});
		document.getElementById("text3985").readOnly = true;

		//set listener for name 2
		document.getElementById("text223").addEventListener("input", function(){setEEDate("text223","date6487Date","text3987");});
		document.getElementById("text3987").readOnly = true;

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


//-----------//High School Transcript and Guidance Counselor View//-----------//
function createHSTranscriptAndPercentListeners(){
	if(checkViewFields(["text3703", "date7349Date","numeric273","numeric277","text3265","hsname","text1501","numeric7963","date7349Date","hscode","hsstate","text1503"])){

		//Class Rank Field
		document.getElementById("numeric273").addEventListener("input",setClassRankPercentile);
		//Class Size Field
		document.getElementById("numeric277").addEventListener("input",setClassRankPercentile);
		//GED% Field
		document.getElementById("text3265").addEventListener("input",setGEDField);
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

	
	if(classRank !=="" && classSize !==""){
		document.getElementById("numeric7963").value = Math.round(100*(1-(classRank/classSize)));
		 if( Math.round(100*(1-(classRank/classSize))) < 0){
			document.getElementById("numeric7963").style.backgroundColor = "#FFFF00";
		 }else{
			document.getElementById("numeric7963").style.backgroundColor = "";
		 }
		
		 document.getElementById("numeric277").style.backgroundColor = "";
		//setDateField("date7349Date");
		
	} else if((classRank =="" && classSize !=="")||(classRank !=="" && classSize =="")){
		document.getElementById("numeric7963").style.backgroundColor = "#FFFF00";
		document.getElementById("numeric277").style.backgroundColor = "";
		document.getElementById("numeric7963").value = "";
		//clearDateField("date7349Date",false);
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
		console.log(feeDate);
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

//-----------//Fall Checklist - New View//-----------//
//-----------//Fall Checklist - Transfer View//-----------//
function createFallChecklistNewListener(){
if(checkViewFields(["date209Date","text7923"])){
		proofOfResDate = document.getElementById("date209Date").value;
		document.getElementById("date209Date").readOnly = true;
		setViewTimer(fallChecklistProofOfResidencyAlert);
		document.getElementById("date209Date").addEventListener("click",function(){document.activeElement.blur();fallChecklistProofOfResidencyAlert(true);});
		document.getElementById("date209Date").addEventListener("keydown",function(e){if( e.which == 9 ) {return;}document.activeElement.blur();fallChecklistProofOfResidencyAlert(true);});
	} else{
		recheckViewFields();
	}

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
		alert("DACA APPLICANT\n \nPlease confirm that:\n\n The Category is C33 \n The expiration date is after 8/15/2019 \n");
	}else if(document.getElementById("text7923").value !== "" && document.getElementById("date209Date").value !==""){
		proofOfResDate = document.getElementById("date209Date").value;
		alert("Please confirm that:\n\n The expiration date is after 8/15/2019 \n");
	}else if (document.getElementById("text7923").value == "" && document.getElementById("date209Date").value !==""){
		document.getElementById("date209Date").value = "";
		alert("Please select immigrant status type first.");
	}
}

//--------------
//Recruitment And Outreach Functions
//--------------

//None currently. 
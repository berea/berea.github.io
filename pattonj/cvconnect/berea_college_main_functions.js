
//----------------------------------------------
//Used for Berea College Hobsons Connect to populate various fields
//Created by Jacob Patton (C) 2017,2018
//----------------------------------------------
autoUpdateRowCount();
setListener();


//variables
var currentLocation;	//What's my URL?
var viewDropDownValue;	//What's the view?
var fieldWatchTimer;	//Loop for watching field
var currentTime;		//Used to set date fields.
var attempts = 0;		//Used to check how many attempts to load a view. Assumes that not all views are broken.
var failSafeTimer;		//Used to clear the timer when needed
var failSafeTimerValue = 300;	//Used to set the time for the timer.
var failSafeTimerNum = 0; 		//Used to keep track of the number of times. 
var viewTimer;			//Used to replace focusout for date fields as calendar icon doesn't always work. 
var stopViewTimer = false;		//Used to end the timerloop when needed. 


//on load, set main listener for dropdown view.
function setListener() {
	
	currentLocation = window.location.pathname;
	if(currentLocation === "/admin/Contacts/Search" || currentLocation === "/admin/Contacts/View" || currentLocation === "/admin/Contacts/Edit"){
	
		//Run viewUpdate first.
		viewUpdate();

		//Replaced "contactViews", "editMode" and "newMode" event listeners with mutationObserver
		//The "Loading" screen generally runs, but if you click "edit" or "view" from the search screen, I'm not sure if it always does.
		//Since the mutation observer wouldn't do any good, we run viewUpdate above.
		 loadingScreenMutationObserver();
	}
}

//
function loadingScreenMutationObserver(){
	//With the mutation observer, Connect loads the "Loading..." BlockUI box, removed the elements and HTML
	//then once ready, removes the "Loading... block" ("blockUI blockOverlay" and "blockUI blockMsg blockElement" and adds the new fields.
	//Example for Mutaion Observer - https://www.javascripture.com/MutationObserver
		var LSmutationObserver = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				for (var i = 0; i < mutation.removedNodes.length; i++) {
					if (mutation.removedNodes[i].className =="blockUI blockMsg blockElement"){
					console.log("Loading Block Removed - Running viewUpdate");
					viewUpdate();
					}
				}

			});
		});

		//Starts listening for changes in the searchField HTML element of the page.
		LSmutationObserver.observe(document.getElementById("searchFields"), {
			attributes: false,
			characterData: false,
			childList: true,
			subtree: true,
			attributeOldValue: false,
			characterDataOldValue: false
		});

}

//Double checking to see if plugin functions still working. 
//Sometimes the screen refreshes, and the listeners I set are lost (not sure why), but it happens right after loading. 
//I've seen it with the blue button for HS Transcript showing up and then disapearing on a slower computer. 
//Occasionally on my computer listeners aren't added/disapear even if it says they are added. 
function failSafe(){
	if (document.contains(document.getElementById('addonWorking'))){
		if(document.getElementById('addonWorking').innerHTML == "BC Plugin Working"){
			failSafeTimerNum++;
			if(failSafeTimerNum > 15 && failSafeTimerValue == 300){
				failSafeTimerValue = 2000;
			} else if(failSafeTimerNum > 50){
				clearTimeout(failSafeTimer);
				return;
			}
			failSafeTimer = setTimeout(function(){ failSafe(); }, failSafeTimerValue);
			return;
		}
		else{
			console.log("BC Plugin Working not found, reloading plugin");
			viewUpdate();
		}
		
	} else{
		console.log("ID not found, reloading plugin");
		viewUpdate();
	}
}

//view change function
function viewUpdate(reloaded){
	console.log("View Update starting");
	
	//Make sure we clear intervals for the field if we are watching for a change.
	clearInterval(fieldWatchTimer);
	clearTimeout(viewTimer);
	clearTimeout (failSafeTimer);
	stopViewTimer = false;	
	failSafeTimerNum = 0; 
	failSafeTimerValue = 300; 
	
	//Used to reset attempts to zero since we are not just retrying the viewUpdate function.
	if(reloaded !== true){
		attempts = 0;
	}

	//Remove the BereaButton so we can recreate it if needed.
	if (document.contains(document.getElementById('bereaButton'))){
		var oldButton = document.getElementById("bereaButton");
		oldButton.remove();
	}
	
	//Remove the BereaButton so we can recreate it if needed.
	if (document.contains(document.getElementById('bereaNameButton'))){
		var oldButton = document.getElementById("bereaNameButton");
		oldButton.remove();
	}
	
	//Remove plugin Status
	if (document.contains(document.getElementById('addonWorking'))){
		var failSafeText = document.getElementById("addonWorking");
		failSafeText.remove();
	}
	
	//The only advantage to the plugin status here, is it would show up on ALL screens. 
	//the other place to put it is under fieldwatch before the function runs. 
	//But, it should stay once added to the screen until viewupdate is run again. 
	var bereaAddonWorking = document.createElement("div");
	bereaAddonWorking.style = "clear:both;float:right";
	bereaAddonWorking.id = "addonWorking";
	bereaAddonWorking.innerHTML = "BC Plugin Working";
		
	var searchFieldChild = document.querySelectorAll('#searchFields>.contactAttributes')[0] ;
	searchFieldChild.appendChild(bereaAddonWorking);

	//Get the title of the selected dropdown value and remove * (default view symbol if needed.
	viewDropDownValue = document.getElementById("contactViews").options[document.getElementById("contactViews").selectedIndex].title;
	if( viewDropDownValue.slice(-1)==="*"){
		viewDropDownValue = viewDropDownValue.slice(0, -1);
	}

	//Rewrote as a switch instead of if/else to be able to easily expand
	switch (viewDropDownValue){
		case "Campus Visit Itinerary":
			fieldWatch("text598",createCVItineraryButton);
			break;
		case "Campus Visit Reservation":
			visitIndicatorChecks(1);
			fieldWatch("date602Date",createCVReservationDateListener);
			break;
		case "HS Transcript / Counselor Evaluation Form":
			fieldWatch("hsname",createHSTranscriptAndPercentListeners);
			break;
		case "Counselor Evaluation Form":
			fieldWatch("numeric7963",createPercentListeners);
			break;
		case "Evaluations and Endorsements":
			fieldWatch("text219",createEEListeners);
			break;
		case "Dec of Intent / Ent Fee / Non-Enrolling Form":
			fieldWatch ("date2951Date",createFeeDateListener);
			break;
		case "International Apps Processing":
			fieldWatch ("text2961",createInternationalAppListener);
			break;
		case "Fall Checklist - New":
			fieldWatch ("date209Date",createFallChecklistNewListener);
			break;
		case "Fall Checklist - Transfer":
			fieldWatch ("date209Date",createFallChecklistTransferListener);
			break;
		case "Proof Of Residency":
			fieldWatch ("date209Date",createProofofResidencyListener);
			break;
		default:
			fieldWatch ("firstname", doNothingFunction);
			break;
	}
	
	console.log("View Update completed");

}

//look for the field I need to edit to exist.
function fieldWatch(myField,myFunction){
	console.log("fieldwatch start");
	//set loop looking for the field I passed to exist and be editable.
	fieldWatchTimer = setTimeout(function () {
		if(document.contains(document.getElementById(myField))){
			if (document.getElementById(myField).disabled === false) {

				//Once available and editable, stop looking and run the passed function.
				clearTimeout(fieldWatchTimer);
				console.log("Watched Field Found, running " + myFunction.name);
				myFunction();
				console.log("function was run");
				//start failSafe to see if the screen changes. 
				failSafe();

			}
			else{
				//since it exists and isn't edible, stop watching.
				clearTimeout(fieldWatchTimer);
				console.log("Watched field, but can't edit. ");
			}
		}
		else{
			console.log("Watched field not found");
			fieldWatch(myField,myFunction);
		}
	}, 100);
}


//-----------//Multi-use functions//-----------//

//Clear date if they select OK from the confirm box on click.
function clearDateField(myDateField,warning){

	if(warning === false){
		document.getElementById(myDateField).value = "";
	}

	else{if(document.getElementById(myDateField).value == ""){
			alert("Please use date picker to set the date.");
			return;
		}else{
			if (confirm("Would you like to clear the date?\n \n (Please use date picker to set the date.)")){
				document.getElementById(myDateField).value = "";
			}else{
				document.getElementById(myDateField).value = document.getElementById(myDateField).value;
				return;
			}
		}
	}

}

//Sets the current date for the passed date field.
function setDateField(myDateField){
	currentTime = new Date();
	document.getElementById(myDateField).value = (currentTime.getMonth() + 1) +"/"+currentTime.getDate()+"/"+currentTime.getFullYear();

}

//Checking to see if the fields that are modified exist.
function checkViewFields(viewFields){
		var i;
		var len = viewFields.length;
		for (i = 0; i < len;i++){
			if(document.getElementById(viewFields[i]) === null){
				attempts++;
				console.log("Error:failed to find field " + viewFields[i] + "Attempt: " + attempts);
				return false;
			}
		}
		console.log("checkViewFields complete");
		attempts = 0;
		//It's here because I only want it to run if the other fields are found, isntead of under myFuction() in fieldWatch. 
		//This way won't confuse the user. 
		fixNameButton();
		return true;
}

function recheckViewFields(){
	//15 (*150 for the field watch timer is 3 seconds) should be long enough to it to try several times.
	if(attempts >= 15){
		alert("The Berea Connect add-on has encountered an error. Please refresh the view. \n\n If you continue to see this message, please email jacob_patton@berea.edu");
	}else{
		//run the viewUpdate again since we assume the field wasn't ready yet.
		viewUpdate(true);
	}
}

//Used to track date fields (or possible others) on views. 
function setViewTimer(myFunction,runOnce){
	if(runOnce === true){
		viewTimer = setTimeout(function(){myFunction();
		}, 100);
	}
	else{
		viewTimer = setTimeout(function(){myFunction(); if (stopViewTimer !== true){ setViewTimer(myFunction);}
		}, 400);
	}
}

function doNothingFunction(){
//Does nothing else but checks for first, middle, last name on every screen. 
fixNameButton();
return;
}

//Used to fix name values
function fixNameButton(){
	
	//Use null instead of checkViewFields as not to mess with the attempts tracker. Also, no error message this way if a name field isn't found. 
	if(document.getElementById("lastname") !== null && document.getElementById("firstname") !== null && document.getElementById("saveTop").style.display !== "none" && ((currentLocation === "/admin/Contacts/Search" && document.getElementById("searchTop").style.display !== ''  ) || currentLocation === "/admin/Contacts/View" || currentLocation === "/admin/Contacts/Edit") ){
		//Create button to copy fix name.
		//Only one button as the viewUpdate function looks for the ID to remove it when refreshing. 
		var bereaButton = document.createElement("div");
		bereaButton.style = "float:right";
		bereaButton.id = "bereaNameButton";
		bereaButton.innerHTML = "<div class='BereaDropdown'>"+
			"<input ID='Berea_Name_Button' value='Fix Name' class='BereaBlue bigbutton smallbutton new' type='button' onclick='return false;'>"+
		  "</div>";
		
		var buttonRow = document.getElementById('lastname');
		buttonRow.parentNode.insertBefore(bereaButton, buttonRow.nextSibling);
		document.getElementById("Berea_Name_Button").addEventListener("click",function(){
			document.getElementById("lastname").value = titleCase(document.getElementById("lastname").value,true);
			document.getElementById("firstname").value = titleCase(document.getElementById("firstname").value,false);
			});
		
		if(document.getElementById("middlename") !== null){
		document.getElementById("Berea_Name_Button").addEventListener("click",function(){
			document.getElementById("middlename").value = titleCase(document.getElementById("middlename").value);
			});
		}	
	}	
	
}

function titleCase(str,lastname) {
	if(lastname){
		str = str.toLowerCase();
		str = str.replace(/(?:^|\s)mc./g, function(a){return "Mc"+ a.charAt(2).toUpperCase(); });
		return str.replace(/(?:^|\s|-|')\S/g, function(a) { return a.toUpperCase(); });
	}
	else{
		str = str.toLowerCase();
		return str.replace(/(?:^|\s|-|')\S/g, function(a) { return a.toUpperCase(); });
	}

}


function autoUpdateRowCount(){
	currentLocation = window.location.pathname;
	
	if(currentLocation === "/admin/TeleCenter/CallJobsNew.aspx" || "/admin/Telecenter/CallJobsNew.aspx"){
		
		if(checkViewFields(["ctl00_ContentPlaceHolder1_ucSelector_txtRowsPerRage","ctl00_ContentPlaceHolder1_ucSelector_btngo"])){
			if(document.getElementById('ctl00_ContentPlaceHolder1_ucSelector_txtRowsPerRage').value !=="5000"){
			document.getElementById('ctl00_ContentPlaceHolder1_ucSelector_txtRowsPerRage').value ="5000"
			document.getElementById('ctl00_ContentPlaceHolder1_ucSelector_btngo').click();
			}
		}
		
	}
	
}

//--------------
//Please see seperate function files. 
//--------------


//----------------------------------------------
//Used for Berea College Hobsons Connect to populate various fields
//Created by Jacob Patton (C) 2017,2018
//----------------------------------------------

setListener();


//variables
var currentLocation;	//What's my URL?
var viewDropDownValue;	//What's the view?
var visitDate;			//What date mm/dd/yyyy am I visiting? (CV Registration View)
var feeDate;			//What date mm/dd/yyyy was the deposit paid? (Dec of Intent View)
var fieldInterval;		//Loop for watching field
var currentTime;		//Used to set date fields.
var attempts = 0;		//Used to check how many attempts to load a view. Assumes that not all views are broken.

//on load, set main listener for dropdown view.
function setListener() {

	currentLocation = window.location.pathname;
	if(currentLocation === "/admin/Contacts/Search" || currentLocation === "/admin/Contacts/View" || currentLocation === "/admin/Contacts/Edit"){

		//Run viewUpdate first. 
		viewUpdate();
		
		//Replaced "contactViews", "editMode" and "newMode" event listeners with mutationObserver
		//The "Loading" screen generally runs, but if you click "edit" or "view" from the search screen, it doesn't.
		//Since the mutation observer wouldn't do any good, we need to ran viewUpdate above.
		 loadingScreenMutationObserver();
	}
}

function loadingScreenMutationObserver(){
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
//With the mutation observer, it loads the "Loading..." BlockUI box, removed the elements and HTML
//then once ready, removes the "Loading... block" ("blockUI blockOverlay" and "blockUI blockMsg blockElement" and adds the new fields.
}

//view change function
function viewUpdate(reloaded){
	console.log("View Update starting");
	//Make sure we clear interval for the field if we are watching for a change.
	clearInterval(fieldInterval);

	//Used to reset attempts to zero since we are not just retrying the viewUpdate function.
	if(reloaded !== true){
		attempts = 0;
	}

	//Remove the BereaButton so we can recreate it if needed.
	if (document.contains(document.getElementById('bereaButton'))){
		var oldButton = document.getElementById("bereaButton");
		oldButton.remove();
	}

	//Get the title of the selected dropdown value and remove * (default view symbol if needed.
	viewDropDownValue = document.getElementById("contactViews").options[document.getElementById("contactViews").selectedIndex].title;
	if( viewDropDownValue.slice(-1)==="*"){
		viewDropDownValue = viewDropDownValue.slice(0, -1);
	}

	//Rewrote as a switch instead of if/else since I added actions.
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
		case "Evaluations and Endorsements":
			fieldWatch("text219",createEEListeners);
			break;
		case "Dec of Intent / Ent Fee / Non-Enrolling Form":
			fieldWatch ("date2951Date",createFeeDateListener);
			break;
		case "International Apps Processing":
			fieldWatch ("text2961",createInternationalAppListener);
			break;
		default:
			break;

	}
	console.log("View Update completed");

}

//look for the field I need to edit to exist.
function fieldWatch(myField,myFunction){
	console.log("fieldwatch start");
	//set loop looking for the field I passed to exist and be editable.
	fieldInterval = setInterval(function () {
		if(document.contains(document.getElementById(myField))){
			if (document.getElementById(myField).disabled === false) {

				//Once available and editable, stop looking and run the passed function.
				clearInterval(fieldInterval);

				console.log("Watched Field Found, running " + myFunction.name);
				myFunction();
				console.log("function was run");

			}
			else{
				//since it exists and isn't edible, stop watching.
				clearInterval(fieldInterval);
			}

		}
		else{
			console.log("Watched field not found");

		}


	}, 100);
}


//-----------//Multi-use functions//-----------//

//Clear if they select OK from the confirm box on click.
function clearDateField(myDateField,warning){
	if(warning === false){
		document.getElementById(myDateField).value = "";
	}
	
	else{if(myDateField.value === ""){
		alert("Please use date picker to set the date.");
		}else{
			if (confirm("Would you like to clear the date?\n \n (Please use date picker to set the date.)")){
				document.getElementById(myDateField).value = "";
			}else{
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
				console.log("Error:failed to find field " + viewFields[i]);
				return false;
			}
		}
		console.log("checkViewFields complete");
		attempts = 0;
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


//--------------
//Campus Visit Functions
//--------------
//https://stackoverflow.com/questions/7601691/remove-item-from-dropdown-list-on-page-load-no-jquery
//Used on multiple screens to reduce the visit type list.
function adjustVisitTypeDropdown(){
	//Get the visit type dropdown.
	var dropdown=document.getElementById('text598');
	var dropdownOption;

	for (var i=0;i<dropdown.length;	 i++) {
		//Get the value of i for visit type;
		dropdownOption = dropdown.options[i].value;
		//Make sure what we are removing isn't the current one selected.
		if (dropdownOption !== dropdown.value){
			//If it isn't, then we can remove it.
			switch (dropdownOption){
				case "Carter G. Woodson":
					dropdown.remove(i);
					i--;
					break;
				case "Interview Only":
					dropdown.remove(i);
					i--;
					break;
				case "Group Visit":
					dropdown.remove(i);
					i--;
					break;
				case "Group Visit Interview":
					dropdown.remove(i);
					i--;
					break;
				case "Pinnacle Scholar":
					dropdown.remove(i);
					i--;
					break;
				case "Red Carpet":
					dropdown.remove(i);
					i--;
					break;
				case "Weekday Morning Session":
					dropdown.remove(i);
					i--;
					break;
				case "Weekday Midday Session":
					dropdown.remove(i);
					i--;
					break;
				case "Weekday Afternoon Session":
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

//-----------//Campus Visits Itinerary View//-----------//

//Creates the main button.
function createCVItineraryButton() {
	if(checkViewFields(["text697_0","text598","text598","text3381","text3321","text3341","text4581","text4541","text4681","text4627","text4589","text4543","text4683","text4629","text4591","text4545","text4685","text4631","text4593","text4547","text4687","text4633","text4595","text4549","text4689","text4635","text4597","text4551","text4691","text4637","text4599","text4553","text4693","text4639","text4601","text4555","text4695","text4641","text4603","text4557","text4697","text4643","text4605","text4559"])){

	/*Dropdown menu from here https://www.w3schools.com/howto/howto_js_dropdown.asp*/
	//Create our HTML to inject.
	//Just as a side note incase I ever need to insert a script code
	//https://www.danielcrabtree.com/blog/25/gotchas-with-dynamically-adding-script-tags-to-html
	var bereaButton = document.createElement("div");
	bereaButton.style = "float:right";
	bereaButton.id = "bereaButton";
	bereaButton.innerHTML = "<div class='BereaDropdown'>"+
		"<input ID='Berea_Menu_Button' value='Berea Visits' class='BereaBlue bigbutton new' type='button' onclick='return false;'>"+
	  "<div id='BereaMenu' class='BereaDropdown-content'>"+
		"<a href='#' ID='MWF_No_Class' onclick='return false;'>MWF - NO Class</a>"+
		"<a href='#' ID='MWF_Yes_Class' onclick='return false;'>MWF - YES Class</a>"+
		"<a href='#' ID='MWF_PM' onclick='return false;'>MWF - PM Class</a>"+
		"<a href='#' ID='TR_AM' onclick='return false;'>TR - AM</a>"+
		"<a href='#' ID='T_PM' onclick='return false;'>T - PM</a>"+
		"<hr>"+
		"<a href='#' ID='Group_AM' onclick='return false;'>Group AM</a>"+
		"<a href='#' ID='Group_PM' onclick='return false;'>Group PM</a>"+
		"<hr id='Event_Break_Line'>"+
		"<a href='#' ID='Legacy_Preview18' onclick='return false;'>Legacy Preview</a>"+
		"<hr>"+
		"<a href='#' ID='Clear_Session'onclick='return false;' >Clear Sessions</a>"+
	  "</div></div>";

	var buttonRow = document.getElementsByClassName('triggerBtnsTop');

	buttonRow[0].appendChild(bereaButton);


	//Set even listeners "click" for the buttons above.
	document.getElementById("Berea_Menu_Button").addEventListener("click",showCVItineraryMenu);
	document.getElementById("MWF_No_Class").addEventListener("click",function(){creatCVItinerary(1);});
	document.getElementById("MWF_Yes_Class").addEventListener("click",function(){creatCVItinerary(2);});
	document.getElementById("TR_AM").addEventListener("click",function(){creatCVItinerary(3);});
	document.getElementById("T_PM").addEventListener("click",function(){creatCVItinerary(4);});
	document.getElementById("Group_AM").addEventListener("click",function(){creatCVItinerary(5);});
	document.getElementById("Group_PM").addEventListener("click",function(){creatCVItinerary(6);});
	//7 is legacy preview below. 
	document.getElementById("MWF_PM").addEventListener("click",function(){creatCVItinerary(8);});
	
	//Before creating the event button, check for event date.
	var EventDate = new Date('2018-10-06');
	var CurrentDate = new Date();
	if(EventDate > CurrentDate){
		document.getElementById("Legacy_Preview18").addEventListener("click",function(){creatCVItinerary(7);});
	}else {
		var element = document.getElementById("Legacy_Preview18");
		element.parentNode.removeChild(element);
		element = document.getElementById("Event_Break_Line");
		element.parentNode.removeChild(element);
	}

	document.getElementById("Clear_Session").addEventListener("click",clearCVItinerary);
	adjustVisitTypeDropdown();




	} else{
		recheckViewFields();
	}

}

//Shows the dropdown menu
function showCVItineraryMenu() {

			document.getElementById('BereaMenu').classList.toggle('show');

			window.onclick = function(event) {
				//Close the dropdown menu if the user clicks outside of it
			  if (!event.target.matches('.BereaBlue')) {

				var dropdowns = document.getElementsByClassName("BereaDropdown-content");
				var i;
				for (i = 0; i < dropdowns.length; i++) {
				  var openDropdown = dropdowns[i];
				  if (openDropdown.classList.contains('show')) {
					openDropdown.classList.remove('show');
				  }
				}
			  } else{
				  return ;
			  }
			};




}

//Creates the itinerary and fills in the fields
function creatCVItinerary(x){

		//Clear Counselor Plug-in
		var len = 1;
		for (var i = 0; i < len;i++){
			if(document.getElementById('text7481_'+i) != null){
				if (document.getElementById('text7481_'+i).checked == true){
					document.getElementById('text7481_'+i).checked = false;
				}
				len++;
			}

		}


		//Clear Sent Itinerary.
		document.getElementById('text697_0').checked = true;
	switch(x){
		//With Class sit-in
		case 1:

			//Visit Type
			document.getElementById('text598').value ="MWF - NO class";
			//Arrival Time
			document.getElementById('text3381').value ="11:30 a.m.";
			//activity 1 (Activity, time, location, detail)
			document.getElementById('text3321').value ="Arrive on Campus";
			document.getElementById('text3341').value ="11:30 a.m.";
			document.getElementById('text4581').value ="Haaga House";
			document.getElementById('text4541').value ="- Lobby";
			//activity 2
			document.getElementById('text4681').value ="Admissions Video";
			document.getElementById('text4627').value ="11:45 a.m.";
			document.getElementById('text4589').value ="Haaga House";
			document.getElementById('text4543').value ="- Presentation Room";
			//activity 3
			document.getElementById('text4683').value ="Information Session";
			document.getElementById('text4629').value ="12:00 p.m.";
			document.getElementById('text4591').value ="Haaga House";
			document.getElementById('text4545').value ="- Presentation Room";
			//activity 4
			document.getElementById('text4685').value ="Lunch";
			document.getElementById('text4631').value ="12:30 p.m.";
			document.getElementById('text4593').value ="Dining Services";
			document.getElementById('text4547').value ="- Mountaineer Dining Hall";
			//activity 5
			document.getElementById('text4687').value ="Tour and Swag Session";
			document.getElementById('text4633').value ="1:45 p.m.";
			document.getElementById('text4595').value ="";
			document.getElementById('text4549').value ="With Student Ambassador";
			//activity 6
			document.getElementById('text4689').value ="Specialized Visit";
			document.getElementById('text4635').value ="3:40 p.m.";
			document.getElementById('text4597').value ="";
			document.getElementById('text4551').value ="";
			//activity 7
			document.getElementById('text4691').value ="Parent Mixer";
			document.getElementById('text4637').value ="3:40 p.m.";
			document.getElementById('text4599').value ="Haaga House";
			document.getElementById('text4553').value ="";
			//activity 8
			document.getElementById('text4693').value ="Optional Counselor Meeting";
			document.getElementById('text4639').value ="4:30 p.m.";
			document.getElementById('text4601').value ="Haaga House";
			document.getElementById('text4555').value ="";
			//Activity 9
			document.getElementById('text4695').value ="Depart from Campus";
			document.getElementById('text4641').value ="5:00 p.m.";
			document.getElementById('text4603').value ="";
			document.getElementById('text4557').value ="";

		break;
		
		//Without  Class sit-in	
		case 2:

			//Visit Type
			document.getElementById('text598').value ="MWF - YES class";
			//Arrival Time
			document.getElementById('text3381').value ="10:00 a.m.";
			//activity 1 (Activity, time, location, detail)
			document.getElementById('text3321').value ="Arrive on Campus";
			document.getElementById('text3341').value ="10:00 a.m.";
			document.getElementById('text4581').value ="Haaga House";
			document.getElementById('text4541').value ="- Lobby";
			//activity 2
			document.getElementById('text4681').value ="Admissions Video";
			document.getElementById('text4627').value ="10:10 a.m.";
			document.getElementById('text4589').value ="Haaga House";
			document.getElementById('text4543').value ="- Presentation Room";
			//activity 3
			document.getElementById('text4683').value ="Attend a Class";
			document.getElementById('text4629').value ="10:40 a.m.";
			document.getElementById('text4591').value ="";
			document.getElementById('text4545').value ="";
			//activity 4
			document.getElementById('text4685').value ="Information Session";
			document.getElementById('text4631').value ="12:00 p.m.";
			document.getElementById('text4593').value ="Haaga House";
			document.getElementById('text4547').value ="- Presentation Room";
			//activity 5
			document.getElementById('text4687').value ="Lunch";
			document.getElementById('text4633').value ="12:30 p.m.";
			document.getElementById('text4595').value ="Dining Services";
			document.getElementById('text4549').value ="- Mountaineer Dining Hall";
			//activity 6
			document.getElementById('text4689').value ="Tour and Swag Session";
			document.getElementById('text4635').value ="1:45 p.m.";
			document.getElementById('text4597').value ="";
			document.getElementById('text4551').value ="With Student Ambassador";
			//activity 7
			document.getElementById('text4691').value ="Specialized Visit";
			document.getElementById('text4637').value ="3:40 p.m.";
			document.getElementById('text4599').value ="";
			document.getElementById('text4553').value ="";
			//activity 8
			document.getElementById('text4693').value ="Parent Mixer";
			document.getElementById('text4639').value ="3:40 p.m.";
			document.getElementById('text4601').value ="Haaga House";
			document.getElementById('text4555').value ="";
			//Activity 9
			document.getElementById('text4695').value ="Optional Counselor Meeting";
			document.getElementById('text4641').value ="4:30 p.m.";
			document.getElementById('text4603').value ="Haaga House";
			document.getElementById('text4557').value ="";
			//activity 10
			document.getElementById('text4697').value ="Depart from Campus";
			document.getElementById('text4643').value ="5:00 p.m.";
			document.getElementById('text4605').value ="";
			document.getElementById('text4559').value ="";

		break;
		
		case 3:
			//Visit Type
			document.getElementById('text598').value ="TR - AM";
			//Arrival Time
			document.getElementById('text3381').value ="8:45 a.m.";
			//activity 1 (Activity, time, location, detail)
			document.getElementById('text3321').value ="Arrive on Campus";
			document.getElementById('text3341').value ="8:45 a.m.";
			document.getElementById('text4581').value ="Haaga House";
			document.getElementById('text4541').value ="- Lobby";
			//activity 2
			document.getElementById('text4681').value ="Admissions Video";
			document.getElementById('text4627').value ="9:00 a.m.";
			document.getElementById('text4589').value ="Haaga House";
			document.getElementById('text4543').value ="- Presentation Room";
			//activity 3
			document.getElementById('text4683').value ="Information Session";
			document.getElementById('text4629').value ="9:10 a.m.";
			document.getElementById('text4591').value ="Haaga House";
			document.getElementById('text4545').value ="- Presentation Room";
			//activity 4
			document.getElementById('text4685').value ="Tour of Campus";
			document.getElementById('text4631').value ="9:40 a.m.";
			document.getElementById('text4593').value ="";
			document.getElementById('text4547').value ="With Student Ambassador";
			//activity 5
			document.getElementById('text4687').value ="Depart from Campus";
			document.getElementById('text4633').value ="10:40 a.m.";
			document.getElementById('text4595').value ="";
			document.getElementById('text4549').value ="";
			//activity 6
			document.getElementById('text4689').value ="";
			document.getElementById('text4635').value ="";
			document.getElementById('text4597').value ="";
			document.getElementById('text4551').value ="";
			//activity 7
			document.getElementById('text4691').value ="";
			document.getElementById('text4637').value ="";
			document.getElementById('text4599').value ="";
			document.getElementById('text4553').value ="";
			//clear activity 8
			document.getElementById('text4693').value ="";
			document.getElementById('text4639').value ="";
			document.getElementById('text4601').value ="";
			document.getElementById('text4555').value ="";
			//activity 9
			document.getElementById('text4695').value ="";
			document.getElementById('text4641').value ="";
			document.getElementById('text4603').value ="";
			document.getElementById('text4557').value ="";
			//activity 10
			document.getElementById('text4697').value ="";
			document.getElementById('text4643').value ="";
			document.getElementById('text4605').value ="";
			document.getElementById('text4559').value ="";
		break;
	
		case 4:
			//Visit Type
			document.getElementById('text598').value ="T - PM";
			//Arrival Time
			document.getElementById('text3381').value ="1:00 p.m.";
			//activity 1 (Activity, time, location, detail)
			document.getElementById('text3321').value ="Arrive on Campus";
			document.getElementById('text3341').value ="1:00 p.m.";
			document.getElementById('text4581').value ="Haaga House";
			document.getElementById('text4541').value ="- Lobby";
			//activity 2
			document.getElementById('text4681').value ="Admissions Video";
			document.getElementById('text4627').value ="1:15 p.m.";
			document.getElementById('text4589').value ="Haaga House";
			document.getElementById('text4543').value ="- Presentation Room";
			//activity 3
			document.getElementById('text4683').value ="Information Session";
			document.getElementById('text4629').value ="1:25 p.m.";
			document.getElementById('text4591').value ="Haaga House";
			document.getElementById('text4545').value ="- Presentation Room";
			//activity 4
			document.getElementById('text4685').value ="Tour of Campus";
			document.getElementById('text4631').value ="1:55 p.m.";
			document.getElementById('text4593').value ="";
			document.getElementById('text4547').value ="With Student Ambassador";
			//activity 5
			document.getElementById('text4687').value ="Depart from Campus";
			document.getElementById('text4633').value ="2:55 p.m.";
			document.getElementById('text4595').value ="";
			document.getElementById('text4549').value ="";
			//activity 6
			document.getElementById('text4689').value ="";
			document.getElementById('text4635').value ="";
			document.getElementById('text4597').value ="";
			document.getElementById('text4551').value ="";
			//activity 7
			document.getElementById('text4691').value ="";
			document.getElementById('text4637').value ="";
			document.getElementById('text4599').value ="";
			document.getElementById('text4553').value ="";
			//clear activity 8
			document.getElementById('text4693').value ="";
			document.getElementById('text4639').value ="";
			document.getElementById('text4601').value ="";
			document.getElementById('text4555').value ="";
			//activity 9
			document.getElementById('text4695').value ="";
			document.getElementById('text4641').value ="";
			document.getElementById('text4603').value ="";
			document.getElementById('text4557').value ="";
			//activity 10
			document.getElementById('text4697').value ="";
			document.getElementById('text4643').value ="";
			document.getElementById('text4605').value ="";
			document.getElementById('text4559').value ="";
		break;
		
		case 6:
			//Visit Type
			document.getElementById('text598').value ="Group Visit - AM";
			//Arrival Time
			document.getElementById('text3381').value ="10:00 a.m.";
			//activity 1 (Activity, time, location, detail)
			document.getElementById('text3321').value ="Arrive on Campus";
			document.getElementById('text3341').value ="10:00 a.m.";
			document.getElementById('text4581').value ="Haaga House";
			document.getElementById('text4541').value ="- Lobby";
			//activity 2
			document.getElementById('text4681').value ="Tour of Campus";
			document.getElementById('text4627').value ="10:10 a.m.";
			document.getElementById('text4589').value ="";
			document.getElementById('text4543').value ="With Student Ambassador";
			//activity 3
			document.getElementById('text4683').value ="Registration";
			document.getElementById('text4629').value ="11:10 a.m.";
			document.getElementById('text4591').value ="Haaga House";
			document.getElementById('text4545').value ="- Presentation Room";
			//activity 4
			document.getElementById('text4685').value ="Admissions Video";
			document.getElementById('text4631').value ="11:15 a.m.";
			document.getElementById('text4593').value ="Haaga House";
			document.getElementById('text4547').value ="- Presentation Room";
			//activity 5
			document.getElementById('text4687').value ="Information Session";
			document.getElementById('text4633').value ="11:25 a.m.";
			document.getElementById('text4595').value ="Haaga House";
			document.getElementById('text4549').value ="- Presentation Room";
			//activity 6
			document.getElementById('text4689').value ="Depart from Campus";
			document.getElementById('text4635').value ="12:00 p.m.";
			document.getElementById('text4597').value ="";
			document.getElementById('text4551').value ="";
			//activity 7
			document.getElementById('text4691').value ="";
			document.getElementById('text4637').value ="";
			document.getElementById('text4599').value ="";
			document.getElementById('text4553').value ="";
			//clear activity 8
			document.getElementById('text4693').value ="";
			document.getElementById('text4639').value ="";
			document.getElementById('text4601').value ="";
			document.getElementById('text4555').value ="";
			//activity 9
			document.getElementById('text4695').value ="";
			document.getElementById('text4641').value ="";
			document.getElementById('text4603').value ="";
			document.getElementById('text4557').value ="";
			//activity 10
			document.getElementById('text4697').value ="";
			document.getElementById('text4643').value ="";
			document.getElementById('text4605').value ="";
			document.getElementById('text4559').value ="";
		break;
		
		case 6:
			//Visit Type
			document.getElementById('text598').value ="Group Visit - PM";
			//Arrival Time
			document.getElementById('text3381').value ="1:30 p.m.";
			//activity 1 (Activity, time, location, detail)
			document.getElementById('text3321').value ="Arrive on Campus";
			document.getElementById('text3341').value ="1:30 p.m.";
			document.getElementById('text4581').value ="Haaga House";
			document.getElementById('text4541').value ="- Lobby";
			//activity 2
			document.getElementById('text4681').value ="Tour of Campus";
			document.getElementById('text4627').value ="1:40 p.m.";
			document.getElementById('text4589').value ="";
			document.getElementById('text4543').value ="With Student Ambassador";
			//activity 3
			document.getElementById('text4683').value ="Registration";
			document.getElementById('text4629').value ="2:40 p.m.";
			document.getElementById('text4591').value ="Haaga House";
			document.getElementById('text4545').value ="- Presentation Room";
			//activity 4
			document.getElementById('text4685').value ="Admissions Video";
			document.getElementById('text4631').value ="2:50 p.m.";
			document.getElementById('text4593').value ="Haaga House";
			document.getElementById('text4547').value ="- Presentation Room";
			//activity 5
			document.getElementById('text4687').value ="Information Session";
			document.getElementById('text4633').value ="3:00 p.m.";
			document.getElementById('text4595').value ="Haaga House";
			document.getElementById('text4549').value ="- Presentation Room";
			//activity 6
			document.getElementById('text4689').value ="Depart from Campus";
			document.getElementById('text4635').value ="3:30 p.m.";
			document.getElementById('text4597').value ="";
			document.getElementById('text4551').value ="";
			//activity 7
			document.getElementById('text4691').value ="";
			document.getElementById('text4637').value ="";
			document.getElementById('text4599').value ="";
			document.getElementById('text4553').value ="";
			//clear activity 8
			document.getElementById('text4693').value ="";
			document.getElementById('text4639').value ="";
			document.getElementById('text4601').value ="";
			document.getElementById('text4555').value ="";
			//activity 9
			document.getElementById('text4695').value ="";
			document.getElementById('text4641').value ="";
			document.getElementById('text4603').value ="";
			document.getElementById('text4557').value ="";
			//activity 10
			document.getElementById('text4697').value ="";
			document.getElementById('text4643').value ="";
			document.getElementById('text4605').value ="";
			document.getElementById('text4559').value ="";
			break;
		
		//For Events		
		case 7:
			//Visit Type
			document.getElementById('text598').value ="Legacy Preview";
			//Arrival Time
			document.getElementById('text3381').value ="9:15 a.m.";
			//activity 1 (Activity, time, location, detail)
			document.getElementById('text3321').value ="Registration";
			document.getElementById('text3341').value ="9:15 a.m.";
			document.getElementById('text4581').value ="Haaga House";
			document.getElementById('text4541').value ="- Lobby";
			//activity 2
			document.getElementById('text4681').value ="Welcome";
			document.getElementById('text4627').value ="10:00 a.m.";
			document.getElementById('text4589').value ="Cargill Natural Sciences and Health Building";
			document.getElementById('text4543').value ="- Digital Theatre";
			//activity 3
			document.getElementById('text4683').value ="Attend a Class";
			document.getElementById('text4629').value ="10:40 a.m.";
			document.getElementById('text4591').value ="";
			document.getElementById('text4545').value ="";
			//activity 4
			document.getElementById('text4685').value ="Information Session";
			document.getElementById('text4631').value ="12:00 p.m.";
			document.getElementById('text4593').value ="Woods-Penniman";
			document.getElementById('text4547').value ="- Commons";
			//activity 5
			document.getElementById('text4687').value ="Lunch";
			document.getElementById('text4633').value ="12:30 p.m.";
			document.getElementById('text4595').value ="Dining Services";
			document.getElementById('text4549').value ="";
			//activity 6
			document.getElementById('text4689').value ="Tour and Swag Session";
			document.getElementById('text4635').value ="1:45 p.m.";
			document.getElementById('text4597').value ="";
			document.getElementById('text4551').value ="With Student Ambassador";
			//activity 7
			document.getElementById('text4691').value ="Specialized Visit";
			document.getElementById('text4637').value ="3:40 p.m.";
			document.getElementById('text4599').value ="";
			document.getElementById('text4553').value ="";
			//activity 8
			document.getElementById('text4693').value ="Meet with Counselor";
			document.getElementById('text4639').value ="4:30 p.m.";
			document.getElementById('text4601').value ="Haaga House";
			document.getElementById('text4555').value ="";
			//activity 9
			document.getElementById('text4695').value ="Dinner";
			document.getElementById('text4641').value ="5:30 p.m.";
			document.getElementById('text4603').value ="Haaga House";
			document.getElementById('text4557').value ="";
			//activity 10
			document.getElementById('text4697').value ="Depart from Campus";
			document.getElementById('text4643').value ="8:00 p.m.";
			document.getElementById('text4605').value ="";
			document.getElementById('text4559').value ="";
		break;
		
		case 8:
			//visit type
			document.getElementById('text598').value ="MWF - NO class";
			//Arrival Time
			document.getElementById('text3381').value ="1:15 p.m.";
			//activity 1 (Activity, time, location, detail)
			document.getElementById('text3321').value ="Arrive on Campus";
			document.getElementById('text3341').value ="1:15 p.m.";
			document.getElementById('text4581').value ="Haaga House";
			document.getElementById('text4541').value ="- Lobby";
			//activity 2
			document.getElementById('text4681').value ="Admissions Video";
			document.getElementById('text4627').value ="1:30 p.m.";
			document.getElementById('text4589').value ="Haaga House";
			document.getElementById('text4543').value ="- Presentation Room";
			//activity 3
			document.getElementById('text4683').value ="Tour of Campus";
			document.getElementById('text4629').value ="1:45 p.m.";
			document.getElementById('text4591').value ="";
			document.getElementById('text4545').value ="With Student Ambassador";
			//activity 4
			document.getElementById('text4685').value ="Information Session";
			document.getElementById('text4631').value ="3:15 p.m.";
			document.getElementById('text4593').value ="Haaga House";
			document.getElementById('text4547').value ="- Presentation Room";
			//activity 5
			document.getElementById('text4687').value ="Specialized Visit";
			document.getElementById('text4633').value ="3:45 p.m.";
			document.getElementById('text4595').value ="Haaga House";
			document.getElementById('text4549').value ="";
			//activity 6
			document.getElementById('text4689').value ="Parent Mixer";
			document.getElementById('text4635').value ="3:45 p.m.";
			document.getElementById('text4597').value ="Haaga House";
			document.getElementById('text4551').value ="";
			//activity 7
			document.getElementById('text4691').value ="Optional Counselor Meeting";
			document.getElementById('text4637').value ="4:30 p.m.";
			document.getElementById('text4599').value ="Haaga House";
			document.getElementById('text4553').value ="";
			//clear activity 8
			document.getElementById('text4693').value ="Depart from Campus";
			document.getElementById('text4639').value ="5:00 p.m.";
			document.getElementById('text4601').value ="";
			document.getElementById('text4555').value ="";
			//activity 9
			document.getElementById('text4695').value ="";
			document.getElementById('text4641').value ="";
			document.getElementById('text4603').value ="";
			document.getElementById('text4557').value ="";
			//activity 10
			document.getElementById('text4697').value ="";
			document.getElementById('text4643').value ="";
			document.getElementById('text4605').value ="";
			document.getElementById('text4559').value ="";
			break;
			
		default:
			//do nothing
			break;
		
	}
}

//Clears all itinerary fields
function clearCVItinerary(){
	//Visit Type
		document.getElementById('text598').value ="";
		//Arrival Time
		document.getElementById('text3381').value ="";
		//activity 1 (Activity, time, location, detail)
		document.getElementById('text3321').value ="";
		document.getElementById('text3341').value ="";
		document.getElementById('text4581').value ="";
		document.getElementById('text4541').value ="";
		//activity 2
		document.getElementById('text4681').value ="";
		document.getElementById('text4627').value ="";
		document.getElementById('text4589').value ="";
		document.getElementById('text4543').value ="";
		//activity 3
		document.getElementById('text4683').value ="";
		document.getElementById('text4629').value ="";
		document.getElementById('text4591').value ="";
		document.getElementById('text4545').value ="";
		//activity 4
		document.getElementById('text4685').value ="";
		document.getElementById('text4631').value ="";
		document.getElementById('text4593').value ="";
		document.getElementById('text4547').value ="";
		//activity 5
		document.getElementById('text4687').value ="";
		document.getElementById('text4633').value ="";
		document.getElementById('text4595').value ="";
		document.getElementById('text4549').value ="";
		//activity 6
		document.getElementById('text4689').value ="";
		document.getElementById('text4635').value ="";
		document.getElementById('text4597').value ="";
		document.getElementById('text4551').value ="";
		//activity 7
		document.getElementById('text4691').value ="";
		document.getElementById('text4637').value ="";
		document.getElementById('text4599').value ="";
		document.getElementById('text4553').value ="";
		//clear activity 8
		document.getElementById('text4693').value ="";
		document.getElementById('text4639').value ="";
		document.getElementById('text4601').value ="";
		document.getElementById('text4555').value ="";
		//activity 9
		document.getElementById('text4695').value ="";
		document.getElementById('text4641').value ="";
		document.getElementById('text4603').value ="";
		document.getElementById('text4557').value ="";
		//activity 10
		document.getElementById('text4697').value ="";
		document.getElementById('text4643').value ="";
		document.getElementById('text4605').value ="";
		document.getElementById('text4559').value ="";
}


//-----------//Campus Visit Reservation View//-----------//

function createCVReservationDateListener(){
	if(checkViewFields(["date602Date","text598","text4421","text3381","text4061","text3983"])){
		visitDate = document.getElementById("date602Date").value;
		//Blank ability set through confirm box yes/no.
		document.getElementById("date602Date").addEventListener("click",function(){clearDateField(document.getElementById("date602Date"));});
		document.getElementById("date602Date").addEventListener("keydown",function(e){e.preventDefault(); alert("Please use date picker to set the date.");});
		document.getElementById("date602Date").addEventListener("focusout",checkCVResDateChange);
		document.getElementById("text598").addEventListener("change",setArrivalTime);
		document.getElementById("text3983").addEventListener("change",function(){visitIndicatorChecks(2);});
		document.getElementById("text4061").addEventListener("change",function(){visitIndicatorChecks(2);});
		visitIndicatorChecks(2);

		adjustVisitTypeDropdown();
	} else{
		recheckViewFields();
	}
}

//highlights contacts that are not financially eligible or not allowed to visit
//Could be rewritten as a multi-use function.
//Would need to pass inner text value and then I guess an array with negative values. Could also pass background color.
function visitIndicatorChecks(x){
	var checkInnerText;
	var checkInnerLabel;
	var rowLength;
	//1 is used view is changed/updated to highlight the fields in view mode.
	if(x==1){
		//check to see if the text field exists
		if(document.querySelectorAll('.col2 .formtable > tbody > tr .text')[0] !== undefined){
			//get the number of rows in the table
			 rowLength = document.querySelector('.col2 .formtable > tbody').rows.length;
			//check the labels cell, if it matches, then see what the coresponding text is (innertext), and then highlight if needed.
			for (var i = 0; i < rowLength; i++) {
				checkInnerLabel = document.querySelectorAll('.col2 .formtable > tbody > tr .fieldlable-mid')[i].innerText;
				if (checkInnerLabel === "Financially Qualify Indicator:"){
					checkInnerText = document.querySelectorAll('.col2 .formtable > tbody > tr .text')[i].innerText;
					if(checkInnerText == "No (No)" || checkInnerText== "FEC - Flag (FEC - Flag)" || checkInnerText== "FEC - Removed (FEC - Removed)"){
						document.querySelectorAll('.col2 .formtable > tbody > tr .text')[i].style.backgroundColor = "#ff717a";
					}
				}else if(checkInnerLabel === "Visit Allowed?:"){
						checkInnerText = document.querySelectorAll('.col2 .formtable > tbody > tr .text')[i].innerText;
					if(checkInnerText == "No (No)"){
						document.querySelectorAll('.col2 .formtable > tbody > tr .text')[i].style.backgroundColor = "#ff717a";
					}
				}
			}
		}
	}
	//2 is used when in edit mode.
	if (x==2){
		//check the values to see if they need highlighed.
		 checkInnerText=document.getElementById("text3983").value;
		if(checkInnerText == "No" || checkInnerText== "FEC - Flag" || checkInnerText== "FEC - Removed"){
			document.getElementById("text3983").style.backgroundColor = "#ff717a";

		}else{
			document.getElementById("text3983").style.backgroundColor = "#ffffff";
			}
		if(document.getElementById("text4061").value == "No"){
			document.getElementById("text4061").style.backgroundColor = "#ff717a";
		}else{
			document.getElementById("text4061").style.backgroundColor = "#ffffff";
			}
	}
}




//pauses long enough wait for the date to be populated and then compare, and if needed set day.
function checkCVResDateChange(){
	console.log("Focused out");
	setTimeout( function(){
	console.log("timeout set");
	if(document.getElementById("date602Date").value !==""){
	console.log("not empty");
		var newVal = document.getElementById("date602Date").value;
		//set loop looking for the field to exist and be editable.
		if (visitDate === newVal) {
			console.log("no change");
			return;
		 } else{
			console.log("change");
			visitDate = newVal;
			//Grab date and update the field.
			switch(new Date(document.getElementById("date602Date").value).getDay()){
				case 0:
					document.getElementById("text4421").value = "Sunday";
					break;
				case 1:
					document.getElementById("text4421").value = "Monday";
					break;
				case 2:
					document.getElementById("text4421").value = "Tuesday";
					break;
				case 3:
					document.getElementById("text4421").value = "Wednesday";
					break;
				case 4:
					document.getElementById("text4421").value = "Thursday";
					break;
				case 5:
					document.getElementById("text4421").value = "Friday";
					break;
				case 6:
					document.getElementById("text4421").value = "Saturday";
					break;
				default:
					document.getElementById("text4421").value = "";
			}
		}
	}else{
		console.log("empty");
		document.getElementById("text4421").value = "";
		visitDate="";
	}
	},100);
}

//used to set the arrival time when session type is selected
function setArrivalTime(){
	switch (document.getElementById("text598").value){
		case "MWF - NO class":
			document.getElementById("text3381").value = "11:15 a.m.";
			break;
		case "MWF - YES class":
			document.getElementById("text3381").value = "10:00 a.m.";
			break;
		case "TR - AM":
			document.getElementById("text3381").value = "8:45 a.m.";
			break;
		case "T - PM":
			document.getElementById("text3381").value = "1:00 p.m.";
			break;
		case "Group Visit - AM":
			document.getElementById("text3381").value = "10:00 a.m.";
			break;
		case "Group Visit - PM":
			document.getElementById("text3381").value = "1:30 p.m.";
			break;
		case "": //If they return to "select one", which is really blank.
			document.getElementById("text3381").value = "";
			break;
		default:
			//do nothing
			break;
	}

}

//--------------
//Processing Function
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
	if(checkViewFields(["text3703","numeric273","numeric277","text1415","text3265","hsname","text1501","numeric7963","date7349Date","hscode","hsstate","text1503"])){

		//Class Rank Field
		document.getElementById("numeric273").addEventListener("input",setClassRankPercentile);
		//Class Size Field
		document.getElementById("numeric277").addEventListener("input",setClassRankPercentile);
		//Class Percentile Field
		document.getElementById("text1415").addEventListener("change",setClassRankPercentile);
		//GED% Field
		document.getElementById("text3265").addEventListener("input",setGEDField);
		adjustAcademicInitiativeDropdown();
		//This is causing issues!
		createHSTranscriptButton();

	} else{
		recheckViewFields();
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
	var percentileRequired = document.getElementById("text1415").value;
	
	if(percentileRequired !== "N"){
		if(classRank !=="" && classSize !=="" && classSize >= 15){
			document.getElementById("numeric7963").value = Math.round(100*(1-(classRank/classSize)));
			 if( Math.round(100*(1-(classRank/classSize))) < 0){
				document.getElementById("numeric7963").style.backgroundColor = "#FFFF00";
			 }else{
				document.getElementById("numeric7963").style.backgroundColor = "";
			 }
			 document.getElementById("text1415").style.backgroundColor = "";
			 document.getElementById("numeric277").style.backgroundColor = "";
			setDateField("date7349Date");
			
		}else if (classSize <15 && classSize !=""){
			document.getElementById("text1415").style.backgroundColor = "#FFFF00";
			document.getElementById("numeric277").style.backgroundColor = "#FFFF00";
			document.getElementById("numeric7963").value = "";
			
		} else if((classRank =="" && classSize !=="" && classSize >= 15)||(classRank !=="" && classSize =="")){
			document.getElementById("numeric7963").style.backgroundColor = "#FFFF00";
			document.getElementById("numeric277").style.backgroundColor = "";
			document.getElementById("text1415").style.backgroundColor = "";
			document.getElementById("numeric7963").value = "";
			clearDateField("date7349Date",false);
		}
		
		
	} else if(percentileRequired === "N"){
		
		if(classSize === ""){
			document.getElementById("numeric7963").style.backgroundColor = "";
			document.getElementById("numeric7963").value = "";
			document.getElementById("numeric7963").value = "";
			clearDateField("date7349Date",false);
		}else if(classSize < 15){
			document.getElementById("numeric7963").value = "";
			document.getElementById("numeric7963").style.backgroundColor = "";
			document.getElementById("numeric277").style.backgroundColor = "";
			document.getElementById("text1415").style.backgroundColor = "";
			document.getElementById("numeric7963").value = "";
			setDateField("date7349Date");
		
		}  else if(classSize >= 15){
			document.getElementById("text1415").style.backgroundColor = "##FFFF00";
			document.getElementById("numeric277").style.backgroundColor = "#FFFF00";
			document.getElementById("numeric7963").value = "";
		}	
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
		//percentile required
		document.getElementById("text1415").value = "N";
		//Set percentile Recorded Date
		setDateField("date7349Date");

	}

}

//-----------//Dec of Intent / Ent Fee / Non-Enrolling View//-----------//
function createFeeDateListener(){

	if(checkViewFields(["date2951Date","numeric2821"])){
		console.log("dec starting");
		feeDate = document.getElementById("date2951Date").value;
		document.getElementById("date2951Date").addEventListener("click",function(){clearDateField("date2951Date");});
		document.getElementById("date2951Date").addEventListener("keydown",function(e){e.preventDefault(); alert("Please use your date picker to set the date.");});
		document.getElementById("date2951Date").addEventListener("focusout",checkFeeDateChange);
		console.log("dec ending");
	} else{
		recheckViewFields();
	}
}

//Set fee amount, or clear the amount if the date is removed.
//Not working when starting at view, then click edit on contact, then click calendar icon. How to fix this?
function checkFeeDateChange(){

	setTimeout( function(){
	if(document.getElementById("date2951Date").value !==""){
		var newVal = document.getElementById("date2951Date").value;
		//set loop looking for the field to exist and be editable.
		if (feeDate === newVal) {
			console.log("No change");
		 } else{
			feeDate = newVal;
			console.log("Fee date needed");
			//set fee amount field
			document.getElementById("numeric2821").value = "50";
		}
	}else{
		//clear fee amount field
		document.getElementById("numeric2821").value = "";
		feeDate = "";
	}
	},100);
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

//--------------
//Recruitment And Outreach Functions
//--------------




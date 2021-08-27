
//----------------------------------------------
//Used for Berea College Hobsons Connect to populate various fields
//Created by Jacob Patton (C) 2017,2018
//----------------------------------------------

//variables
var visitDate;			//What date mm/dd/yyyy am I visiting? (CV Registration View)


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
					
				case "MWF - YES class":
					dropdown.remove(i);
					i--;
					break;
				case "MWF - NO class":
					dropdown.remove(i);
					i--;
					break;
				case "TR - AM":
					dropdown.remove(i);
					i--;
					break;
				case "T - PM":
					dropdown.remove(i);
					i--;
					break;
				case "Holiday Yield Event":
					dropdown.remove(i);
					i--;
					break;
				case "Dine With The Dean":
					dropdown.remove(i);
					i--;
					break;
				case "Summer Session":
					dropdown.remove(i);
					i--;
					break;
				case "STEM Showcase Day":
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
	//Just as a side note in case I ever need to insert a script code
	//https://www.danielcrabtree.com/blog/25/gotchas-with-dynamically-adding-script-tags-to-html
	var bereaButton = document.createElement("div");
	bereaButton.style = "float:right";
	bereaButton.id = "bereaButton";
	bereaButton.innerHTML = "<div class='BereaDropdown'>"+
		"<input ID='Berea_Menu_Button' value='Berea Visits' class='BereaBlue bigbutton new' type='button' onclick='return false;'>"+
		"<div id='BereaMenu' class='BereaDropdown-content'>"+
		"<a href='#' class='showSubmenu' onclick='return false;'>4*<span style='float:right;'>&#x25B8; </span></a>"+
			"<div class='BereaSubmenu' style='position: relative; width: 0; height: 0'>"+
				"<div>"+
					"<a href='#' ID='4star_AM' onclick='return false;'>4* AM</a>"+	
					"<a href='#' ID='4star_PM' onclick='return false;'>4* PM</a>"+	
					"<a href='#' ID='4star_AM_Meet' onclick='return false;'>4* AM with Meet</a>"+	
					"<a href='#' ID='4star_PM_Meet' onclick='return false;'>4* PM with Meet</a>"+	
				"</div>"+
			"</div>"+ 
					"<a href='#' ID='General_AM' onclick='return false;'>1-3* AM</a>"+
					"<a href='#' ID='General_PM' onclick='return false;'>1-3* PM</a>"+
					"<a href='#' ID='Early_Bird' onclick='return false;'>Early Bird</a>"+
					"<a href='#' ID='TT_Friday' onclick='return false;'>Third Tour Friday</a>"+
					"<a href='#' ID='Twilight' onclick='return false;'>Twilight Tour</a>"+
							
		"<a href='#' class='showSubmenu' onclick='return false;'>Group<span style='float:right;'>&#x25B8; </span></a>"+
			"<div class='BereaSubmenu' style='position: relative; width: 0; height: 0'>"+
				"<div>"+
					"<a href='#' ID='Group_AM' onclick='return false;'>Group AM</a>"+
					"<a href='#' ID='Group_PM' onclick='return false;'>Group PM</a>"+
				"</div>"+
			"</div>"+ 
				
		"<hr>"+
		"<a href='#' ID='Clear_Session'onclick='return false;' >Clear Sessions</a>"+
	  "</div></div>";

	var buttonRow = document.getElementsByClassName('triggerBtnsTop');

	buttonRow[0].appendChild(bereaButton);


	//Set even listeners "click" for the buttons above.
	document.getElementById("Berea_Menu_Button").addEventListener("click",showCVItineraryMenu);
	//assigns event to submenu buttons
	var submenus = document.getElementsByClassName('showSubmenu');
	for (var i = 0; i < submenus.length; i++) {
		submenus[i].addEventListener("click",function(event){toggleCVSubmenu(event);});
	}
	document.getElementById("4star_AM").addEventListener("click",function(){creatCVItinerary(1);});
	document.getElementById("4star_PM").addEventListener("click",function(){creatCVItinerary(2);});
	document.getElementById("General_AM").addEventListener("click",function(){creatCVItinerary(3);});
	document.getElementById("General_PM").addEventListener("click",function(){creatCVItinerary(4);});
	document.getElementById("Early_Bird").addEventListener("click",function(){creatCVItinerary(5);});
	document.getElementById("TT_Friday").addEventListener("click",function(){creatCVItinerary(6);});
	document.getElementById("Group_AM").addEventListener("click",function(){creatCVItinerary(7);});
	document.getElementById("Group_PM").addEventListener("click",function(){creatCVItinerary(8);});
	document.getElementById("4star_AM_Meet").addEventListener("click",function(){creatCVItinerary(9);});
	document.getElementById("4star_PM_Meet").addEventListener("click",function(){creatCVItinerary(10);});
	document.getElementById("Twilight").addEventListener("click",function(){creatCVItinerary(11);});
	document.getElementById("Clear_Session").addEventListener("click",clearCVItinerary);
	adjustVisitTypeDropdown();

	} else{
		recheckViewFields();
	}

}



//show submenu
function toggleCVSubmenu(e){
		if (e.target.nextSibling.classList.contains('show')){
			e.target.nextSibling.classList.toggle('show');
		}
		else{
			var submenus = document.getElementsByClassName('showSubmenu');
			for (var i = 0; i < submenus.length; i++) {
				if (submenus[i].nextSibling.classList.contains('show')){
					submenus[i].nextSibling.classList.toggle('show');

				}	
			}
			
			if ((e.target.nextSibling.style.right == "") && (e.target.nextSibling.style.bottom == "")){
				console.log(e.target);
				e.target.nextSibling.style.right = e.target.offsetWidth + "px";
				e.target.nextSibling.style.bottom = e.target.offsetHeight + "px";
			}
			
			
			
			if(!e.target.parentElement.classList.contains("showSubmenu")){
				e.target.nextSibling.classList.toggle('show');
			}
		}
}	

//Shows the dropdown menu or submenu
function showCVItineraryMenu() {
			//shows the dropdown menu
			document.getElementById('BereaMenu').classList.toggle('show');
			//gets a list of submenus. 
			var submenus = document.getElementsByClassName('showSubmenu');
			
			window.onclick = function(event) {
				//Close the dropdown menu if the user clicks on something, unless it is the submenu of it
				if ((!event.target.matches('.BereaBlue')) && !(event.target.classList.contains("showSubmenu")) ){

					var dropdowns = document.getElementsByClassName("BereaDropdown-content");
					var i;
					//Hide the submenus
					for (i = 0; i < submenus.length; i++) {
						if (submenus[i].nextSibling.classList.contains('show')){
							submenus[i].nextSibling.classList.toggle('show');
						}	
					}
					
					//hide the main menu
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
			
		case 1:
			//Visit Type
			document.getElementById('text598').value ="4* - AM";
			//Arrival Time
			document.getElementById('text3381').value ="9:30 a.m.";
			//activity 1 (Activity, time, location, detail)
			document.getElementById('text3321').value ="Arrive on Campus";
			document.getElementById('text3341').value ="9:30 a.m.";
			document.getElementById('text4581').value ="Haaga House";
			document.getElementById('text4541').value ="- Lobby";
			//activity 2
			document.getElementById('text4681').value ="Information Session";
			document.getElementById('text4627').value ="9:40 a.m.";
			document.getElementById('text4589').value ="Haaga House";
			document.getElementById('text4543').value ="- Presentation Room";
			//activity 3
			document.getElementById('text4683').value ="Family FAQ Session";
			document.getElementById('text4629').value ="10:00 a.m.";
			document.getElementById('text4591').value ="Haaga House";
			document.getElementById('text4545').value ="- Presentation Room";
			//activity 4
			document.getElementById('text4685').value ="Student Panel";
			document.getElementById('text4631').value ="10:00 a.m.";
			document.getElementById('text4593').value ="Haaga House"
			document.getElementById('text4547').value ="- Lobby";
			//activity 5
			document.getElementById('text4687').value ="Tour of Campus";
			document.getElementById('text4633').value ="10:30 a.m.";
			document.getElementById('text4595').value ="";
			document.getElementById('text4549').value ="- with Student Ambassador";
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
			//activity 8
			document.getElementById('text4693').value ="";
			document.getElementById('text4639').value ="";
			document.getElementById('text4601').value ="";
			document.getElementById('text4555').value ="";
			//Activity 9
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

		case 2:
			//Visit Type
			document.getElementById('text598').value ="4* - PM";
			//Arrival Time
			document.getElementById('text3381').value ="2:00 p.m.";
			//activity 1 (Activity, time, location, detail)
			document.getElementById('text3321').value ="Arrive on Campus";
			document.getElementById('text3341').value ="2:00 p.m.";
			document.getElementById('text4581').value ="Haaga House";
			document.getElementById('text4541').value ="- Lobby";
			//activity 2
			document.getElementById('text4681').value ="Information Session";
			document.getElementById('text4627').value ="2:10 p.m.";
			document.getElementById('text4589').value ="Haaga House";
			document.getElementById('text4543').value ="- Presentation Room";
			//activity 3
			document.getElementById('text4683').value ="Family FAQ Session";
			document.getElementById('text4629').value ="2:30 p.m.";
			document.getElementById('text4591').value ="Haaga House";
			document.getElementById('text4545').value ="- Presentation Room";
			//activity 4
			document.getElementById('text4685').value ="Student Panel";
			document.getElementById('text4631').value ="2:30 p.m.";
			document.getElementById('text4593').value ="Haaga House"
			document.getElementById('text4547').value ="- Lobby";
			//activity 5
			document.getElementById('text4687').value ="Tour of Campus";
			document.getElementById('text4633').value ="3:00 p.m.";
			document.getElementById('text4595').value ="";
			document.getElementById('text4549').value ="- with Student Ambassador";
			//activity 6
			document.getElementById('text4689').value ="Depart from Campus";
			document.getElementById('text4635').value ="4:30 p.m.";
			document.getElementById('text4597').value ="";
			document.getElementById('text4551').value ="";
			//activity 7
			document.getElementById('text4691').value ="";
			document.getElementById('text4637').value ="";
			document.getElementById('text4599').value ="";
			document.getElementById('text4553').value ="";
			//activity 8
			document.getElementById('text4693').value ="";
			document.getElementById('text4639').value ="";
			document.getElementById('text4601').value ="";
			document.getElementById('text4555').value ="";
			//Activity 9
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
		
		case 3:
			//Visit Type
			document.getElementById('text598').value ="General - AM";
			//Arrival Time
			document.getElementById('text3381').value ="9:45 a.m.";
			//activity 1 (Activity, time, location, detail)
			document.getElementById('text3321').value ="Arrive on Campus";
			document.getElementById('text3341').value ="9:45 a.m.";
			document.getElementById('text4581').value ="Haaga House";
			document.getElementById('text4541').value ="- Lobby";
			//activity 2
			document.getElementById('text4681').value ="Information Session";
			document.getElementById('text4627').value ="10:00 a.m.";
			document.getElementById('text4589').value ="Haaga House";
			document.getElementById('text4543').value ="- Presentation Room";
			//activity 3
			document.getElementById('text4683').value ="Tour of Campus";
			document.getElementById('text4629').value ="10:30 a.m.";
			document.getElementById('text4591').value ="";
			document.getElementById('text4545').value ="- with Student Ambassador";
			//activity 4
			document.getElementById('text4685').value ="Depart from Campus";
			document.getElementById('text4631').value ="12:00 p.m.";
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
			//activity 8
			document.getElementById('text4693').value ="";
			document.getElementById('text4639').value ="";
			document.getElementById('text4601').value ="";
			document.getElementById('text4555').value ="";
			//Activity 9
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
			document.getElementById('text598').value ="General - PM";
			//Arrival Time
			document.getElementById('text3381').value ="2:15 p.m.";
			//activity 1 (Activity, time, location, detail)
			document.getElementById('text3321').value ="Arrive on Campus";
			document.getElementById('text3341').value ="2:15 p.m.";
			document.getElementById('text4581').value ="Haaga House";
			document.getElementById('text4541').value ="- Lobby";
			//activity 2
			document.getElementById('text4681').value ="Information Session";
			document.getElementById('text4627').value ="2:30 p.m.";
			document.getElementById('text4589').value ="Haaga House";
			document.getElementById('text4543').value ="- Presentation Room";
			//activity 3
			document.getElementById('text4683').value ="Tour of Campus";
			document.getElementById('text4629').value ="3:00 p.m.";
			document.getElementById('text4591').value ="";
			document.getElementById('text4545').value ="- with Student Ambassador";
			//activity 4
			document.getElementById('text4685').value ="Depart from Campus";
			document.getElementById('text4631').value ="4:30 p.m.";
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
			//activity 8
			document.getElementById('text4693').value ="";
			document.getElementById('text4639').value ="";
			document.getElementById('text4601').value ="";
			document.getElementById('text4555').value ="";
			//Activity 9
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
			

		case 5:
			//Visit Type
			document.getElementById('text598').value ="Early Bird";
			//Arrival Time
			document.getElementById('text3381').value ="7:45 a.m.";
			//activity 1 (Activity, time, location, detail)
			document.getElementById('text3321').value ="Arrive on Campus";
			document.getElementById('text3341').value ="7:45 a.m.";
			document.getElementById('text4581').value ="Haaga House";
			document.getElementById('text4541').value ="- Lobby";
			//activity 2
			document.getElementById('text4681').value ="Information Session";
			document.getElementById('text4627').value ="8:00 a.m.";
			document.getElementById('text4589').value ="Haaga House";
			document.getElementById('text4543').value ="- Presentation Room";
			//activity 3
			document.getElementById('text4683').value ="Tour of Campus";
			document.getElementById('text4629').value ="8:30 a.m.";
			document.getElementById('text4591').value ="";
			document.getElementById('text4545').value ="- with Student Ambassador";
			//activity 4
			document.getElementById('text4685').value ="Depart from Campus";
			document.getElementById('text4631').value ="10:00 a.m.";
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
			//activity 8
			document.getElementById('text4693').value ="";
			document.getElementById('text4639').value ="";
			document.getElementById('text4601').value ="";
			document.getElementById('text4555').value ="";
			//Activity 9
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
			document.getElementById('text598').value ="Third Tour Friday";
			//Arrival Time
			document.getElementById('text3381').value ="3:15 p.m.";
			//activity 1 (Activity, time, location, detail)
			document.getElementById('text3321').value ="Arrive on Campus";
			document.getElementById('text3341').value ="3:15 p.m.";
			document.getElementById('text4581').value ="Haaga House";
			document.getElementById('text4541').value ="- Lobby";
			//activity 2
			document.getElementById('text4681').value ="Information Session";
			document.getElementById('text4627').value ="3:20 p.m.";
			document.getElementById('text4589').value ="Haaga House";
			document.getElementById('text4543').value ="- Presentation Room";
			//activity 3
			document.getElementById('text4683').value ="Tour of Campus";
			document.getElementById('text4629').value ="3:50 p.m.";
			document.getElementById('text4591').value ="";
			document.getElementById('text4545').value ="- with Student Ambassador";
			//activity 4
			document.getElementById('text4685').value ="Depart from Campus";
			document.getElementById('text4631').value ="5:00 p.m.";
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
			//activity 8
			document.getElementById('text4693').value ="";
			document.getElementById('text4639').value ="";
			document.getElementById('text4601').value ="";
			document.getElementById('text4555').value ="";
			//Activity 9
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
		
		case 7:
			//Visit Type
			document.getElementById('text598').value ="Group Visit - AM";
			//Arrival Time
			document.getElementById('text3381').value ="9:45 a.m.";
			//activity 1 (Activity, time, location, detail)
			document.getElementById('text3321').value ="Arrive on Campus";
			document.getElementById('text3341').value ="9:45 a.m.";
			document.getElementById('text4581').value ="Haaga House";
			document.getElementById('text4541').value ="- Lobby";
			//activity 2
			document.getElementById('text4681').value ="Information Session";
			document.getElementById('text4627').value ="10:00 a.m.";
			document.getElementById('text4589').value ="Haaga House";
			document.getElementById('text4543').value ="- Presentation Room";
			//activity 3
			document.getElementById('text4683').value ="Tour of Campus";
			document.getElementById('text4629').value ="10:30 a.m.";
			document.getElementById('text4591').value ="";
			document.getElementById('text4545').value ="- with Student Ambassador";
			//activity 4
			document.getElementById('text4685').value ="Depart from Campus";
			document.getElementById('text4631').value ="12:00 p.m.";
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
			//activity 8
			document.getElementById('text4693').value ="";
			document.getElementById('text4639').value ="";
			document.getElementById('text4601').value ="";
			document.getElementById('text4555').value ="";
			//Activity 9
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
		
		case 8:
			//Visit Type
			document.getElementById('text598').value ="Group Visit - PM";
			//Arrival Time
			document.getElementById('text3381').value ="2:15 p.m.";
			//activity 1 (Activity, time, location, detail)
			document.getElementById('text3321').value ="Arrive on Campus";
			document.getElementById('text3341').value ="2:15 p.m.";
			document.getElementById('text4581').value ="Haaga House";
			document.getElementById('text4541').value ="- Lobby";
			//activity 2
			document.getElementById('text4681').value ="Information Session";
			document.getElementById('text4627').value ="2:30 p.m.";
			document.getElementById('text4589').value ="Haaga House";
			document.getElementById('text4543').value ="- Presentation Room";
			//activity 3
			document.getElementById('text4683').value ="Tour of Campus";
			document.getElementById('text4629').value ="3:00 p.m.";
			document.getElementById('text4591').value ="";
			document.getElementById('text4545').value ="- with Student Ambassador";
			//activity 4
			document.getElementById('text4685').value ="Depart from Campus";
			document.getElementById('text4631').value ="4:30 p.m.";
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
			//activity 8
			document.getElementById('text4693').value ="";
			document.getElementById('text4639').value ="";
			document.getElementById('text4601').value ="";
			document.getElementById('text4555').value ="";
			//Activity 9
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
		
		case 9:
			//Visit Type
			document.getElementById('text598').value ="4* - AM";
			//Arrival Time
			document.getElementById('text3381').value ="8:30 a.m.";
			//Arrival Time
			document.getElementById('text3381').value ="8:30 a.m.";
			//activity 1 (Activity, time, location, detail)
			document.getElementById('text3321').value ="Arrive on Campus";
			document.getElementById('text3341').value ="8:30 a.m.";
			document.getElementById('text4581').value ="Haaga House";
			document.getElementById('text4541').value ="- Lobby";
			//activity 2
			document.getElementById('text4681').value ="Optional Meeting";
			document.getElementById('text4627').value ="8:35 a.m.";
			document.getElementById('text4589').value ="";
			document.getElementById('text4543').value ="- with";
			//activity 3
			document.getElementById('text4683').value ="Return to Admissions Office";
			document.getElementById('text4629').value ="9:15 a.m.";
			document.getElementById('text4591').value ="Haaga House";
			document.getElementById('text4545').value ="- Lobby";
			//activity 4
			document.getElementById('text4685').value ="Information Session";
			document.getElementById('text4631').value ="9:40 a.m.";
			document.getElementById('text4593').value ="Haaga House"
			document.getElementById('text4547').value ="- Presentation Room";
			//activity 5
			document.getElementById('text4687').value ="Family FAQ Session";
			document.getElementById('text4633').value ="10:00 a.m.";
			document.getElementById('text4595').value ="Haaga House";
			document.getElementById('text4549').value ="- Presentation Room";
			//activity 6
			document.getElementById('text4689').value ="Student Panel";
			document.getElementById('text4635').value ="10:00 a.m.";
			document.getElementById('text4597').value ="Haaga House";
			document.getElementById('text4551').value ="- Lobby";
			//activity 7
			document.getElementById('text4691').value ="Tour of Campus";
			document.getElementById('text4637').value ="10:30 a.m.";
			document.getElementById('text4599').value ="";
			document.getElementById('text4553').value ="- with Student Ambassador";
			//activity 8
			document.getElementById('text4693').value ="Depart from Campus";
			document.getElementById('text4639').value ="12:00 p.m.";
			document.getElementById('text4601').value ="";
			document.getElementById('text4555').value ="";
			//Activity 9
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
		
		case 10:
			//Visit Type
			document.getElementById('text598').value ="4* - PM";
			//Arrival Time
			document.getElementById('text3381').value ="1:30 p.m.";
			//activity 1 (Activity, time, location, detail)
			document.getElementById('text3321').value ="Arrive on Campus";
			document.getElementById('text3341').value ="1:30 p.m.";
			document.getElementById('text4581').value ="Haaga House";
			document.getElementById('text4541').value ="- Lobby";
			//activity 2
			document.getElementById('text4681').value ="Optional Meeting";
			document.getElementById('text4627').value ="1:35 p.m.";
			document.getElementById('text4589').value ="";
			document.getElementById('text4543').value ="- with";
			//activity 3
			document.getElementById('text4683').value ="Information Session";
			document.getElementById('text4629').value ="2:10 p.m.";
			document.getElementById('text4591').value ="Haaga House";
			document.getElementById('text4545').value ="- Presentation Room";
			//activity 4
			document.getElementById('text4685').value ="Family FAQ Session";
			document.getElementById('text4631').value ="2:30 p.m.";
			document.getElementById('text4593').value ="Haaga House"
			document.getElementById('text4547').value ="- Presentation Room";
			//activity 5
			document.getElementById('text4687').value ="Student Panel";
			document.getElementById('text4633').value ="2:30 p.m.";
			document.getElementById('text4595').value ="Haaga House";
			document.getElementById('text4549').value ="- Lobby";
			//activity 6
			document.getElementById('text4689').value ="Tour of Campus";
			document.getElementById('text4635').value ="3:00 p.m.";
			document.getElementById('text4597').value ="";
			document.getElementById('text4551').value ="- with Student Ambassador";
			//activity 7
			document.getElementById('text4691').value ="Depart from Campus";
			document.getElementById('text4637').value ="4:30 p.m.";
			document.getElementById('text4599').value ="";
			document.getElementById('text4553').value ="";
			//activity 8
			document.getElementById('text4693').value ="";
			document.getElementById('text4639').value ="";
			document.getElementById('text4601').value ="";
			document.getElementById('text4555').value ="";
			//Activity 9
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
		
		case 11:
			//Visit Type
			document.getElementById('text598').value ="Twilight Tour";
			//Arrival Time
			document.getElementById('text3381').value ="5:00 p.m.";
			//activity 1 (Activity, time, location, detail)
			document.getElementById('text3321').value ="Arrive on Campus";
			document.getElementById('text3341').value ="5:00 p.m.";
			document.getElementById('text4581').value ="Haaga House";
			document.getElementById('text4541').value ="- Lobby";
			//activity 2
			document.getElementById('text4681').value ="Information Session";
			document.getElementById('text4627').value ="5:15 p.m.";
			document.getElementById('text4589').value ="Haaga House";
			document.getElementById('text4543').value ="- Presentation Room";
			//activity 3
			document.getElementById('text4683').value ="Tour of Campus";
			document.getElementById('text4629').value ="5:45 p.m.";
			document.getElementById('text4591').value ="";
			document.getElementById('text4545').value ="- with Student Ambassador";
			//activity 4
			document.getElementById('text4685').value ="Depart from Campus";
			document.getElementById('text4631').value ="7:00 p.m.";
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
			//activity 8
			document.getElementById('text4693').value ="";
			document.getElementById('text4639').value ="";
			document.getElementById('text4601').value ="";
			document.getElementById('text4555').value ="";
			//Activity 9
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
		document.getElementById('text4593').value =""
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
		setViewTimer(checkCVResDateChange);
		document.getElementById("date602Date").addEventListener("click",function(){clearDateField("date602Date");});
		document.getElementById("date602Date").addEventListener("keydown",function(e){if( e.which == 9 ) {return;} else{ e.preventDefault(); alert("Please use date picker to set the date.");}});
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
	if(document.getElementById("date602Date").value !==""){
		var newVal = document.getElementById("date602Date").value;
		//set loop looking for the field to exist and be editable.
		if (visitDate === newVal) {
			return;
		 } else{
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
		document.getElementById("text4421").value = "";
		visitDate="";
	}

}

//used to set the arrival time when session type is selected
function setArrivalTime(){
	switch (document.getElementById("text598").value){
		case "Summer - AM":
			document.getElementById("text3381").value = "9:45 a.m.";
			break;
		case "Summer - PM":
			document.getElementById("text3381").value = "1:45 p.m.";
			break;
		case "4* - AM":
			document.getElementById("text3381").value = "9:30 a.m.";
			break;
		case "4* - PM":
			document.getElementById("text3381").value = "2:00 p.m.";
			break;
		case "General - AM":
			document.getElementById("text3381").value = "9:45 a.m.";
			break;
		case "General - PM":
			document.getElementById("text3381").value = "2:15 p.m.";
			break;	
		case "Group Visit - AM":
			document.getElementById("text3381").value = "9:45 a.m.";
			break;
		case "Group Visit - PM":
			document.getElementById("text3381").value = "2:15 p.m.";
			break;
		case "Early Bird":
			document.getElementById("text3381").value = "7:45 a.m.";
			break;
		case "Third Tour Friday":
			document.getElementById("text3381").value = "3:15 p.m.";
			break;
		case "Twilight Tour":
			document.getElementById("text3381").value = "5:00 p.m.";
			break;
		case "": //If they return to "select one", which is really blank.
			document.getElementById("text3381").value = "";
			break;
		default:
			//do nothing
			break;
	}

}

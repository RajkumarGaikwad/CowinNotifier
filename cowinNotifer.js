 let punePinCodes = [
 "411001",
 "744301",
 "411026",
 "413102",
 "411041",
 "411027",
 "411045"
 ];

(function(pincodes) {


   getAreaInfo = () => {
	   
	   let centerlist = [];
	   let htmlcollection = document.getElementsByClassName('center-name-text');

	   for (i = 0; i < htmlcollection.length; i++) {
  			centerlist.push(htmlcollection[i]);
		}

	   return centerlist;
   
   };

   getCenter = (areas, pincode) => {

   		   	let selectedCenter = areas.filter(function(center){
	   			console.log(center.innerText);
		   		console.log(pincode);
				let description  = center.innerText || '';
				return description.includes(pincode);
	   	}); 

	   return selectedCenter;
   };

   getSelectedAreas = (areas = []) =>{

   		let selectedCenters = [];

   		for (var idx = 0; idx < pincodes.length; idx++) {
	   		selectedCenters.push (getCenter(areas, pincodes[idx]));
	   	}
	   	return selectedCenters;
   }

   let showAlert = async function (vaccinationAvailPincodes) {
	    				let message = 'Vaccination available for : ' ;
				      	var beepsound = new Audio( 'https://www.soundjay.com/button/sounds/beep-01a.mp3'); 
						await beepsound.play(); 
				   		alert(message + vaccinationAvailPincodes);
  	}



   checkStatus = () => {
	   	
	   	let vaccinationAvailPincodes = [];
		
		let areas = getAreaInfo();

		let shortlistedAreas = getSelectedAreas(areas);

  		for (var idx = 0; idx < shortlistedAreas.length; idx++) {

  			var shortlistedCenters = shortlistedAreas[idx] || [];

  			for (var i = 0; i < shortlistedCenters.length; i++) {
  				
	  			var actualparent = shortlistedCenters[idx];

	  			if (actualparent) {
	  				var placstr = actualparent.innerText;

			        let parent = actualparent.parentElement.parentElement.parentElement;
				    let allplaces = parent.getElementsByClassName('vaccine-box') || [];

				    let allplacesarr = [];

				    for (var i = 0; i < allplaces.length; i++) {
			  			allplacesarr.push(allplaces[i]);
					}

					for(var place of allplacesarr) {
				      var placename = (place.firstChild.innerText || "").toLowerCase();
				      if(!(placename == "booked" || placename == "na") ){
				      	vaccinationAvailPincodes.push(placstr);
				      	break;
				      }
		     		}

	  			}
  			}
 	} 

	 if (vaccinationAvailPincodes.length > 0) {
	 	 showAlert(vaccinationAvailPincodes);
	 }
   		//click search
	let searchbtn = document.getElementsByClassName('pin-search-btn');
	searchbtn[0].click();

  }

window.intervalid = setInterval(checkStatus, 10000);

})(punePinCodes);

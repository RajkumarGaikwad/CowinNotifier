(function() {


   getAreaInfo = () => {
	   
	   let centerlist = [];
	   let htmlcollection = document.getElementsByClassName('center-name-text');

	   for (i = 0; i < htmlcollection.length; i++) {
  			centerlist.push(htmlcollection[i]);
		}

	   return centerlist;
   
   };

   let showAlert = async function (vaccinationAvailPincodes) {
	    				let message = 'Vaccination available for : ' ;
				      	var beepsound = new Audio( 'https://www.soundjay.com/button/sounds/beep-01a.mp3'); 
						await beepsound.play(); 
				   		alert(message + vaccinationAvailPincodes);
  	}



   checkStatus = () => {

	   	
	   	let vaccinationAvailPincodes = [];
		
		let areas = getAreaInfo();

      	if(areas.length > 1){

      		for (var idx = 0; idx < areas.length; idx++) {
      			var actualparent = areas[idx];
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
	 if (vaccinationAvailPincodes.length > 1) {
	 	 showAlert(vaccinationAvailPincodes);
	 }
	
   		//click search
	let searchbtn = document.getElementsByClassName('pin-search-btn');
	searchbtn[0].click();


  }

 
   


window.intervalid = setInterval(checkStatus, 3000);

})();

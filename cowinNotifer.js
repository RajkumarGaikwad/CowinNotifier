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


   getAreaInfo = (pincode) => {

	   	getCenter = (center) => {
	   		console.log(center.innerText);
	   		console.log(pincode);
			let description  = center.innerText || '';
			return description.includes(pincode);
		};
	   
	   let centerlist = [];

	   let htmlcollection = document.getElementsByClassName('center-name-text');

	   for (i = 0; i < htmlcollection.length; i++) {
  			centerlist.push(htmlcollection[i]);
		}


	   let center = centerlist.filter(getCenter) || [];
	   
	   return center;
   
   };


   checkStatus = () => {

   	let message = 'Vaccination available for : ' ;
   	let vaccinationAvailPincodes = [];
   	let vaccinationNotAvailPincodes = [];

   	for (var pincode of pincodes) {

   			let area = getAreaInfo(pincode);

	      	if(area.length > 1){
		   		area = area[0];
		   	} else{
		   		console.log("Didn't find area");
		   		vaccinationNotAvailPincodes.push(pincode);
		   		continue;
		   	}

		   let parent = area.parentElement.parentElement.parentElement;
		   let allplaces = parent.getElementsByClassName('vaccine-box') || [];

		   let allplacesarr = [];

		   for (var i = 0; i < allplaces.length; i++) {
	  			allplacesarr.push(allplaces[i]);
			}
	   
		   for(var place of allplacesarr) {
		      var placename = (place.firstChild.innerText || "").toLowerCase();
		      if(placename != "booked"){
		      	vaccinationAvailPincodes.push(pincode);
		      	break;
		      }
	     }

   	}

   	if(vaccinationAvailPincodes.length > 1) {
   		//clearInterval(this.intervalid);
   		alert(message + vaccinationAvailPincodes.toString());
   		window.open('/.');
	 	
   	}
	//confirm(vaccinationNotAvailPincodes.toString());
	console.log(vaccinationNotAvailPincodes);
  
   }

   	//click search
	let searchbtn = document.getElementsByClassName('pin-search-btn');
	searchbtn[0].click();



window.intervalid = setInterval(checkStatus, 5000);

})(punePinCodes);

  
   
  


  
  
  

 
  
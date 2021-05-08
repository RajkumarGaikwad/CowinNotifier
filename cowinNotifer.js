let punePinCodes = ["411001", "744301", "411026", "413102", "411041", "411027", "413110", "411023", "411045", "415101", "411014", "411006", "411005", "412207", "412108", "412115", "411024", "411017", "411044", "411030", "411034", "411018", "411019", "411002", "411029", "411004", "411013", "411003", "412201", "411028", "411007", "411037", "411035", "411038", "411039", "412109", "411033", "412216"]

let InputRequest = {
    alertOnly18_44: true,
    alertOnly45Plus: false
}



function checkVaccineStatus() {


    let showAlert = async function(vaccinationAvailPincodes) {
        let message = 'Vaccination available for : ';
        var beepsound = new Audio('https://www.soundjay.com/button/sounds/beep-01a.mp3');
        await beepsound.play();
        alert(message + vaccinationAvailPincodes);
        console.info(message + vaccinationAvailPincodes);
    }


    getAreaInfo = () => {

        let centerlist = [];
        let htmlcollection = document.getElementsByClassName('center-name-text');

        for (i = 0; i < htmlcollection.length; i++) {
            centerlist.push(htmlcollection[i]);
        }

        return centerlist;

    }

    getCenter = (areas, pincode) => {

        let selectedCenter = areas.filter(function(center) {

            let description = center.innerText || '';
            return description.includes(pincode);
        });

        return selectedCenter;
    }

    getSelectedAreas = (areas = []) => {

        let selectedCenters = [];

        for (var idx = 0; idx < punePinCodes.length; idx++) {
            selectedCenters.push(getCenter(areas, punePinCodes[idx]));
        }
        return selectedCenters;
    }

    getSlot = (address, place) => {
        return {
            address,
            place
        }
    }

    filterBasedOnAgeLimit = (center, ageLimit) => {

        var shortlistedSlots = [];

        if (center) {

            var placeAddress = center.innerText;

            let parent = center.parentElement.parentElement.parentElement;
            let allplaces = parent.getElementsByClassName('vaccine-box') || [];


            let allplacesarr = [];

            for (let cdi = 0; cdi < allplaces.length; cdi++) {
                allplacesarr.push(allplaces[cdi]);
            }

            for (let place of allplacesarr) {
                var ageLimitEl = place.getElementsByClassName("age-limit")[0] || {};
                if (ageLimitEl.innerText && ageLimitEl.innerText.includes(ageLimit)) {
                    shortlistedSlots.push(getSlot(placeAddress, place));
                }
            }

        }

        return shortlistedSlots;
    }



    checkStatus = () => {

        let vaccinationAvailPincodes = [];

        let areas = getAreaInfo();

        let shortlistedAreas = getSelectedAreas(areas);

        let shortlistedAllSlots = [];

        for (let centers of shortlistedAreas) {

            centers = centers || [];

            for (let center of centers) {

                //get only 18-44 age booking slots
                if (InputRequest.alertOnly18_44) {
                    shortlistedAllSlots = shortlistedAllSlots.concat(filterBasedOnAgeLimit(center, "18+"));
                }
                //get only 45+ age booking slots
                if (InputRequest.alertOnly45Plus) {
                    shortlistedAllSlots = shortlistedAllSlots.concat(filterBasedOnAgeLimit(center, "45+"));
                }
            }
        }

        for (let slot of shortlistedAllSlots) {
            var placename = (slot.place.firstChild.innerText || "").toLowerCase();
            if (!(placename == "booked" || placename == "na")) {
                vaccinationAvailPincodes.push(slot.address);
                break;
            }
        }

        if (vaccinationAvailPincodes.length > 0) {
            showAlert(vaccinationAvailPincodes);
        }
        //click search
        let searchbtn = document.getElementsByClassName('pin-search-btn');
        searchbtn[0].click();

    }

    checkStatus();


}

window.intervalid = setInterval(checkVaccineStatus, 5000);

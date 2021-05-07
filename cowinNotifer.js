let punePinCodes = [
    "411001",
    "744301",
    "411026",
    "413102",
    "411041",
    "411027",
    "411045"
];

function checkVaccineStatus() {


    let showAlert = async function(vaccinationAvailPincodes) {
        let message = 'Vaccination available for : ';
        var beepsound = new Audio('https://www.soundjay.com/button/sounds/beep-01a.mp3');
        await beepsound.play();
        console.alert(message + vaccinationAvailPincodes);
        console.info(message + vaccinationAvailPincodes);
    }


    getAreaInfo = () => {

        let centerlist = [];
        let htmlcollection = document.getElementsByClassName('center-name-text');

        for (i = 0; i < htmlcollection.length; i++) {
            centerlist.push(htmlcollection[i]);
        }

        return centerlist;

    };

    getCenter = (areas, pincode) => {
        console.log(pincode);

        let selectedCenter = areas.filter(function(center) {
            console.log(center.innerText);


            let description = center.innerText || '';
            return description.includes(pincode);
        });

        return selectedCenter;
    };

    getSelectedAreas = (areas = []) => {

        let selectedCenters = [];

        for (var idx = 0; idx < punePinCodes.length; idx++) {
            selectedCenters.push(getCenter(areas, punePinCodes[idx]));
        }
        return selectedCenters;
    }


    checkStatus = () => {

        let vaccinationAvailPincodes = [];

        let areas = getAreaInfo();

        let shortlistedAreas = getSelectedAreas(areas);

        for (let idx = 0; idx < shortlistedAreas.length; idx++) {

            var shortlistedCenters = shortlistedAreas[idx] || [];

            for (let ci = 0; ci < shortlistedCenters.length; ci++) {

                var actualparent = shortlistedCenters[ci];

                if (actualparent) {
                    var placstr = actualparent.innerText;

                    let parent = actualparent.parentElement.parentElement.parentElement;
                    let allplaces = parent.getElementsByClassName('vaccine-box') || [];

                    let allplacesarr = [];

                    for (let cdi = 0; cdi < allplaces.length; cdi++) {
                        allplacesarr.push(allplaces[cdi]);
                    }

                    for (let place of allplacesarr) {
                        var placename = (place.firstChild.innerText || "").toLowerCase();
                        if (!(placename == "booked" || placename == "na")) {
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

    checkStatus();


}

window.intervalid = setInterval(checkVaccineStatus, 5000);

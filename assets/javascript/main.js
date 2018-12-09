// global variables
var user_longitude;
var user_latitude;
var time_latlon_updated = 0;

// initialize the map 
var mymap = L.map('mapid').setView([59.9139, 10.7522], 20);

$(document).ready(function() {

fine valid file types
var file_types = new Array('.jpeg');

// track the state of the website
var site_state;  // the current state that our script is in
var next_state;  // during each run of the event loop, we will update
                 // which new state we will want to enter. Conditional
                 // logic shall be used in the run loop to control the
                 // flow of the program


// state that we will track.
var WAITING_FOR_UPLOAD = 0;
var FILE_SELECTED = 1;
var LOCATION_WAITING = 2;
var APPLYING_TAG = 3;
var DISPLAY_RESULT = 4;
var ERROR_STATE = 5;

// string that we can add to when we want to track errors that will
// eventually be communicated to the user
var err_str = "";

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
}).addTo(mymap);

// run loop
site_state = WAITING_FOR_UPLOAD; // starting with the waiting state

while (true){
    switch(site_state){
        case WAITING_FOR_UPLOAD:
            console.log("waiting for user to upload a file");
            // make sure that the map is not ready to set an upload
            mymap.on('click', no_file_click); 

            // check if the user has uploaded a new file
            var myFile = $('#uploadedJPEG').prop('files');
            var file_status = 0;
            var valid_file = false;

            for (i=0; i<file_types.length; i++){
                if (myFile.endswith(file_types[i])){
                    valid_file = true;
                    break;
                }
            }

            // let a user know why they are entering an error state
            if (!valid_file){
                err_str += "You tried to upload an invalid file type! You must enter one of:\n");
                for (i=0; i<file_types.length; i++){
                    err_str += "${file_types[i]}\n";
                } 
                err_str += "\n";
            }
            else if (valid_file && myFile != null){
                var reader = new FileReader();
                reader.readAsDataURL(myFile);
                file_status = reader.readyState;
            }

            if (file_status < 2){ // upload failed
                err_str += "The file failed to upload. Try again!";
                next_state = ERROR_STATE;
            } else {
                next_state = LOCATION_WAITING;
            }
            break;
        case LOCATION_WAITING:
            console.log("waiting for user to select a file");
            // render the photo on the website
            // render the map on the website for the user to scroll around
            // place a button on the website for the user to click when they're
            // happy with the location
            var time_now = new Date().getTime();
            if (time_now - time_latlon_updated > 120) // provide a 2 minute timeout
                next_state = APPLYING_TAG
            else
                next_state = LOCATION_WAITING
            break;
        case APPLYING_TAG:
            console.log("waiting for user to select a file");
            // attempt to rewrite EXIF data
            // if (success)
            //    next_state = DISPLAY_RESULT
            // else
            //      next_state = ERROR_STATE
            break;
        case DISPLAY_RESULT:
            console.log("waiting for user to select a file");
            // render the photo and a map with the tag
            // provide a button to download the new photo with
            // add photo to sidebar showing other recent photo uploads
            // add a comments section?
            break;
        case ERROR_STATE:
            console.log("you've entered an error state that we don't\
                         know how to recover.");
            // print out previous state or some error message that's meaningful
            alert(err_str);
            // reset all of the input and prepare to return to the beginning
            next_state = WAITING_FOR_UPLOAD;
            time_latlon_updated = 0;
            break;
    }

    site_state = next_state;

}



// make calls to the classes to do things when the page is loaded





});

// functions to actually work with things go in here
function onMapClick(e) {
    // remove previous popups
    mymap.closePopup()

    // add a new one at the location
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);

    // update the global variables
    user_longitude;
    user_latitude;
    time_latlon_updated = new Date().getTime();
}

function no_file_click(e) {
    // remove previous popups
    mymap.closePopup()

    // add a new one at the location
    popup
        .setLatLng(e.latlng)
        .setContent("Add a photo to tag it here:  " + e.latlng.toString())
        .openOn(mymap);

    // update the global variables
    user_longitude;
    user_latitude;
    time_latlon_updated = new Date().getTime();
}
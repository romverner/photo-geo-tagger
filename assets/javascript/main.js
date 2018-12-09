$(document).ready(function() {
    
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

// run loop
while (true){
    switch(site_state){
        case WAITING_FOR_UPLOAD:
            console.log("waiting for user to upload a file");
            // check if the user has uploaded a new file
            var myFile = $('#uploadedJPEG').prop('files');

            // if the myFile var is a valid file name then move to the
            // next state
            if (false){
                next_state = FILE_SELECTED;
            } else {
                next_state = WAITING_FOR_UPLOAD;
            }
            break;
        case FILE_SELECTED:
            console.log("waiting for user to select a file");
            // save the value locally on the server
            // TODO
            // resize the file to something smaller that we can easily 
            // display on the site
            // if upload is successful:
            //      next_state = LOCATION_WAITING;
            // else
            //      next_state = ERROR_STATE;
            break;
        case LOCATION_WAITING:
            console.log("waiting for user to select a file");
            // render the photo on the website
            // render the map on the website for the user to scroll around
            // place a button on the website for the user to click when they're
            // happy with the location
            // if button_clicked
            //     next_state = APPLYING_TAG
            // else
            //      next_state = LOCATION_WAITING
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
            break;
    }

    site_state = next_state;

}



// make calls to the classes to do things when the page is loaded





});

// functions to actually work with things go in here
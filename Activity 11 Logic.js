// Initialize Firebase (YOUR OWN APP)
// Make sure that your configuration matches your firebase script version
// (Ex. 3.0 != 3.7.1)

var config = {
  apiKey: "AIzaSyDqpdfFeica589OwegH2fxyIHai5Wqool4",
  authDomain: "test-677c5.firebaseapp.com",
  databaseURL: "https://test-677c5.firebaseio.com",
  projectId: "test-677c5",
  storageBucket: "test-677c5.appspot.com",
  messagingSenderId: "945283508396"
};
firebase.initializeApp(config);
// This var is used for all firebase interactions.
var database = firebase.database()

// This is the initial value used by the reset and on the very first load.
var initialValue = 100;

// Counter is set to the initial value at start
var clickCounter = initialValue;

// --------------------------------------------------------------

// This function here is all the database intereactions in one spot, on load the value is pulled from firebase, whenever a value changes the on page counter is updated as well.
database.ref().on("value", function (snapshot) {
  clickCounter = snapshot.val().clickCount;
  $("#click-value").text(clickCounter);
}, function (errorObject) {
  // This is an error log built using firebase js error reporting, it tells the user what went wrong. 
  console.log("The read failed: " + errorObject.code);
});


// This is the on click function that reduces the counter by one, it will also update that value in firebase.
$("#click-button").on("click", function () {

  // SImply reduces the counter by one
  clickCounter--;

  // This if statement covers when the counter reaches 0 and what happens if it is not at 0
  if (clickCounter === 0) {

    alert("Phew! You made it! That sure was a lot of clicking.");

    clickCounter = initialValue;

  }

  // This uploads the updated value into firebase.
  database.ref().set({
    clickCount: clickCounter
  });

});

//This is the on click line for the reset button
$("#restart-button").on("click", function () {

  // This sets the click counter to the value stated above
  clickCounter = initialValue;

  // Sends the new value to firebase
  database.ref().set({
    clickCount: clickCounter
  });

  // Sets the visibile counter to the new value
  $("#click-value").text(clickCounter);


});

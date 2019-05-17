var config = {
  apiKey: "AIzaSyDqpdfFeica589OwegH2fxyIHai5Wqool4",
  authDomain: "test-677c5.firebaseapp.com",
  databaseURL: "https://test-677c5.firebaseio.com",
  projectId: "test-677c5",
  storageBucket: "test-677c5.appspot.com",
  messagingSenderId: "945283508396"
};
firebase.initializeApp(config);
var database = firebase.database(

)
// Initial Values
var initialBid = 0;
var initialBidder = "No one :-(";
var highPrice = initialBid;
var highBidder = initialBidder;

// --------------------------------------------------------------

//This funciton runs on load and whenever a value changes in firebase
database.ref().on("value", function (snapshot) {

  // This if statement checks if there is already a high bidder stored in firebase.
  if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {



    // Since the if statment prevents this from running if theres nothing there, this line will always load the highbidder and their bid from friebase.
    highPrice = snapshot.val().highPrice
    highBidder = snapshot.val().highBidder


    // This displays what was just pulled from fierebase
    $("#highest-bidder").text(highBidder);
    $("#highest-price").text(highPrice);
  }

  // If there is no highbidder or bid in firebase then this runs
  else {
    // This displays hte initial bidder and bid we created earlier
    $("#highest-bidder").text(highBidder);
    $("#highest-price").text(highPrice);
  }


  // This is the standard error logging block that uses firebase js object errorObject to get the error code to display. 
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// --------------------------------------------------------------

// This is the on click for the submit bid button
$("#submit-bid").on("click", function (event) {
  //SUPER IMPORTANT LINE that prevents the button from reloading the page (thus wiping out everything we just did.)
  event.preventDefault();

  // This captures what the user inputted
  var bidderName = $("#bidder-name").val()
  var bidderPrice = $("#bidder-price").val()

  // This if statement checks to see if the new bid is higher then the old one
  if (bidderPrice > highPrice) {

    // if its a new high bid it alerts the user of this
    alert("You are now the highest bidder.");

    // This sets the new bid into firebase
    database.ref().set({
      highBidder: bidderName,
      highPrice: bidderPrice,
    })

    // This sets the local var versions of the high bid to be the new ones...
    highPrice = bidderPrice
    highBidder = bidderName

    // ... and displays them here
    $("#highest-bidder").text(highBidder);
    $("#highest-price").text(highPrice);
  }

  else {
    // this is an alert if the bid inputted is too low.
    alert("Sorry that bid is too low. Try again.");
  }

});
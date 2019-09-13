$(document).ready(function (){

    // Your web app's Firebase configuration
 var config = {
   apiKey: "AIzaSyDKub0Uyq7SZJWEwmnNKeRJ7Ba7okHBsLs",
   authDomain: "trainhw-22f18.firebaseapp.com",
   databaseURL: "https://trainhw-22f18.firebaseio.com",
   projectId: "trainhw-22f18",
   storageBucket: "trainhw-22f18.appspot.com",
   messagingSenderId: "385043582868",
   appId: "1:385043582868:web:9da22f573cd406c0a8c981"
 };
 // Initialize Firebase
 firebase.initializeApp(config);
 console.log(firebase);

 var database = firebase.database();

 // Capture Button Click
 $("#add-train").on("click", function(event) {
  event.preventDefault();
 
  // Get values from text boxes
      var trainName = $("#train-input").val().trim();
      var destination = $("#destination-input").val().trim();
      var firstTrain = $("#time-input").val().trim();
      var freq = $("#frequency-input").val().trim();
  
      // Push to firebase
      database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: freq
      });
    });

    database.ref().on("child_added", function (childSnapshot) {
  
      var newTrain = childSnapshot.val().trainName;
      var newLocation = childSnapshot.val().destination;
      var newFirstTrain = childSnapshot.val().firstTrain;
      var newFreq = childSnapshot.val().frequency;
  
  
      // Current Time
      var currentTime = moment();
      
      // Difference between the times
      var diffTime = moment().diff(moment(startTimeConverted), "minutes");
  
      // Remainder Time
      var tRemainder = diffTime % newFreq;
  
      // Minute(s) Until Train
      var tMinutesTillTrain = newFreq - tRemainder;
  
      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      var catchTrain = moment(nextTrain).format("HH:mm");
  
      // Display On Page ---NOT WORKING!!
      $("#trainTable").append(
        ' <tr><td>' + newTrain +
        ' </td><td>' + newLocation +
        ' </td><td>' + newFreq +
        ' </td><td>' + catchTrain +
        ' </td><td>' + tMinutesTillTrain + ' </td></tr>');
  
      // Clear input fields
      $("#train-input, #destination-input, #time-input, #frequency-input").val("");
      return false;
  });
  });
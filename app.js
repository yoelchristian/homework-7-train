var config = {
    apiKey: "AIzaSyDYs9KuLRe7Q7-G-AWDolZKeN1-F4-NyNg",
    authDomain: "homework-7-train-e846a.firebaseapp.com",
    databaseURL: "https://homework-7-train-e846a.firebaseio.com",
    projectId: "homework-7-train-e846a",
    storageBucket: "homework-7-train-e846a.appspot.com",
    messagingSenderId: "355147315168"
    };

firebase.initializeApp(config);
var database = firebase.database();

var name = "";
var destination = "";
var startTime = "";
var frequency = "";
var currentTime = moment();

$(".time-now").text("Time Now: " + moment().format("hh:mm A"));

$("#add-train").on("click", function(event){
    event.preventDefault();

    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    startTime = $("#first-train-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    database.ref().push({
        name: name,
        destination: destination,
        startTime: startTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });    
});

database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val().name);

    var databaseName = childSnapshot.val().name;
    var databaseDestination = childSnapshot.val().destination;
    var databaseStartTime = childSnapshot.val().startTime;
    var databaseFrequency = childSnapshot.val().frequency;

    var tFrequency = databaseFrequency;
    var firstTime = databaseStartTime;
    var firstTimePushedBackOneYear = moment(firstTime, "hh:mm").subtract(1, "years");
    var timeDifference = moment().diff(moment(firstTimePushedBackOneYear), "minutes");
    var tRemainder = timeDifference % tFrequency;
    var tMinutesUntilNextTrain = tFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesUntilNextTrain, "minutes").format("hh:mm A")

    console.log(tFrequency);

    $("#data-table").append("<tr><td>" + databaseName + "</td><td>" + databaseDestination + "</td><td>"
    + databaseFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesUntilNextTrain +"</td></tr>");

});
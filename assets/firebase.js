// // var config = {
// //     apiKey: "AIzaSyCqPruP8kRj2y1irRPFnY3OFFhYKxXl6qA",
// //     authDomain: "gabe-s-project.firebaseapp.com",
// //     databaseURL: "https://gabe-s-project.firebaseio.com",
// //     projectId: "gabe-s-project",
// //     storageBucket: "gabe-s-project.appspot.com",
// //     messagingSenderId: "349072546650"
//   };
var config = {
    apiKey: "AIzaSyBXGh0uvTjyFmOxjyjKIqmZE12ol_vx9E0",
    authDomain: "train-project-be2dc.firebaseapp.com",
    databaseURL: "https://train-project-be2dc.firebaseio.com",
    projectId: "train-project-be2dc",
    storageBucket: "train-project-be2dc.appspot.com",
    messagingSenderId: "256790154753"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  $("#submit").on("click", function(event){
      console.log("this button says things");
      event.preventDefault();
      var train = $("#trainName").val().trim();
      var destination = $("#destination").val().trim();
      var firstTrain = $("#firstTrainTime").val().trim();
      var frequency = $("#frequency").val().trim();
      var nextTrain = $("#minutesAway").val().trim();

      var newTrain = {
          train: train,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency,
          nextTrain: nextTrain
        
      };
      database.ref().push(newTrain);
      console.log(newTrain.train);
      console.log(newTrain.destination);
      console.log(newTrain.firstTrain);
      console.log(newTrain.frequency);
      console.log(newTrain.nextTrain)

  });
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
      console.log(childSnapshot.val());
      var trainName = childSnapshot.val().train;
      var trainDestination = childSnapshot.val().destination;
      var trainFirst = childSnapshot.val().firstTrain;
      var trainFrequency = childSnapshot.val().frequency;
      var nextTrain = childSnapshot.val().nextTrain;

      console.log(trainName);
      console.log(trainDestination);
      console.log(trainFirst);
      console.log(trainFrequency);
      console.log(nextTrain);

      var tFrequency = trainFrequency;
    //   var firstTrain = "03:30";
      var firstTrainConverted = moment(trainFirst, "hh:mm").subtract(1, "years");
      console.log(firstTrainConverted);
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
      var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);
      //This is a modulus that finds the remainder of the equation that's put in
      var tRemainder = diffTime % tFrequency;
      console.log(tRemainder);
      var tMinutesTillTrain = tFrequency - tRemainder;
      console.log("Minutes till train: " + tMinutesTillTrain);
      var trainNext = moment().add(tMinutesTillTrain, "minutes");
      console.log("Arrival Time: " + moment(trainNext).format("hh:mm"));
      var trainStartPretty = moment.unix(trainFirst).format("MM/DD/YY")
     $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination +"</td><td>" + trainFirst + "</td><td>" + trainFrequency + "</td><td>" + trainNext + "</td></tr>");
  });
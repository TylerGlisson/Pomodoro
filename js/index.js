$(document).ready(function($) {
  var timerSecs = 0;
  // will probably need to math.floor or modulo to avoid decimals
  var timerMins = 2;
  var totalSecs = Math.floor(timerMins * 60) + timerSecs;
  var breakMins = 2;
  var workMins = 2;
  var running = false;
  var phase = "Start Timer";
  var myTimer;

  function timerFunc() {
    //todo: retrieve work min & sec variables
    //todo: convert mins to secs & find total amount of seconds
    totalSecs = Math.floor(timerMins * 60) + timerSecs;
    // subtract 1 from total
    totalSecs -= 1;
    //if total seconds is = 0 and current phase is over:
    //change phase, load new phase's duration, start timer
    if (totalSecs >= 0){
      // convert back to mins and seconds
      timerMins = Math.floor(totalSecs / 60);
      timerSecs = totalSecs % 60;
      //print current values to tMins and tSecs
      if (timerMins<10){
        var formatedNum = "0"+timerMins;
        $("#tMins").html(formatedNum);
      }
      else if(timerMins > 10){
        $("#tMins").html(timerMins);
      }
      if (timerSecs<10){
        var formatedNum = "0"+timerSecs;
        $("#tSecs").html(formatedNum);
      }
      else if(timerSecs > 10){
        $("#tSecs").html(timerSecs);
      }
      totalSecs = Math.floor(timerMins * 60) + timerSecs;

      console.log(totalSecs);
    }
    else if(totalSecs < 0){
      clearInterval(myTimer);
      if(phase==="Work Now"){
        phase = "Break Now";
        $("#currentPhase").html(phase);
        timerMins = breakMins;
        timerSecs = 0;
        console.log(phase);
        startBreakTimer();
      }
      else if(phase ==="Break Now"){
        phase = "Work Now";
        $("#currentPhase").html(phase);
        timerMins = workMins;
        timerSecs = 0;
        startWorkTimer();
      }
    }
  }

  function updateTimer() {
    /*no need to check if running since this function is
    embeded into parent function that checks for that.
    Only update timer if adjusting current phase 
    */
    if (phase === "Start Timer" || phase === "Work Paused") {
      //allow update of Work during these phases
      timerMins = workMins;
      timerSecs = 0;
      if(timerMins<10){
        var formated = "0"+timerMins;
        $("#tMins").html(formated);
      }
      else{
        $("#tMins").html(timerMins);
      }
      $("#tSecs").html("00");
    } 
    else if (phase === "Break Paused") {
      //allow update of Break during this phase
      timerMins = breakMins;
      timerSecs = 0;
      //todo: style with leading zer if <10
      if(timerMins<10){
        var formated = "0"+timerMins;
        $("#tMins").html(formated);
      }else{
        $("#tMins").html(timerMins);
      }
      $("#tSecs").html("00");
    }
  }
  function startWorkTimer() {
    //start timer
    myTimer = setInterval(timerFunc, 1000);
    // change running
    running = true;
  }
  function startBreakTimer() {
    //start timer
    myTimer = setInterval(timerFunc, 1000);
    // change running
    running = true;
  }
  function stopTimer() {
    //stop timer
    clearInterval(myTimer);
    //change running
    running = false;
    //change phase
    if(phase ==="Work Now"){
      phase = "Work Paused";
    }
    else if(phase ==="Break Now"){
      phase = "Break Paused";
    }
  }

  $("#breakDown").on("click", function() {
    //only allow adjustments when timer is not running
    if (running === false) {
      //only allow decrease if Break Inteval > 1 minute
      if (breakMins > 1) {
        breakMins -= 1;
        updateTimer();
        //print new break interval to dials; Should I use timerMins?
        $("#break").html(breakMins);
      }
    }
  });
  $("#breakUp").on("click", function() {
    //only allow adjustments when timer is not running
    if (running === false) {
      breakMins += 1;
      $("#break").html(breakMins);
      updateTimer();
    }
  });
  $("#workDown").on("click", function() {
    //only allow adjustments when timer is not running
    if (running === false) {
      //only allow decrease if Work Interval > 1 minute
      if (workMins > 1) {
        workMins -= 1;
        //print new work interval to dials
        $("#work").html(workMins);
        updateTimer();
      }
    }
  });
  $("#workUp").on("click", function() {
    //only allow adjustments when timer is not running
    if (running === false) {
      workMins += 1;
      $("#work").html(workMins);
      updateTimer();
    }
  });
  $("#timerDisplay").on("click", function(event) {
    event.preventDefault();
    if (running === false) {
      if (phase ==="Start Timer" || phase === "Work Paused"){
        phase = "Work Now";
        startWorkTimer();
        $("#currentPhase").html(phase);
      }
      else if(phase ==="Break Paused"){
        phase = "Break Now";
        startBreakTimer();
        $("#currentPhase").html(phase);
      }
  
    } else if (running === true) {
      stopTimer();
      $("#currentPhase").html(phase);
    }
  });
});
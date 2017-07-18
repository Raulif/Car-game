var carState = false;
var fuel = 0;

//Hover function over buttons:
$(document).ready(function(){
  $("button").hover(
    function(){
      $(this).addClass("highlight");
    },
    function(){
      $(this).removeClass("highlight");
    }
  );




  //START car.
  $("#start-btn").click(function(){
    if(checkFuel()){
      carState = true;
      document.getElementById("outputBox").value="The car is ON!";
      $("#start-btn").addClass("start-on");
      $("#stop-btn").removeClass("stop-on");
    }
    else {
      document.getElementById("outputBox").value="You need FUEL to start the car";
    }
  });

  //STOP button.
  $("#stop-btn").click(function(){
    if(carState == false){
      document.getElementById("outputBox").value="The car is already OFF!";
    }
    else {
      carState = false;
      document.getElementById("outputBox").value="The car is OFF";
      $("#stop-btn").addClass("stop-on");
      $("#start-btn").removeClass("start-on");
    }
  });

  //Flip the car:
  $("#turn-btn").click(function(){
    console.log("Car is " + carState);
    if(checkCarState()){
      document.getElementById("outputBox").value="You need to STOP the car before turning.";
    }
    else {
      if (!$("#car-icon").hasClass("car-back")){
        $("#car-icon").addClass("car-back");
      }
      else {
        $("#car-icon").removeClass("car-back");
      }
    }
  });

  //Add fuel:
  $("#addFuel-btn").click(function(){
    if (fuel < 3){
      fuel++;
      document.getElementById("outputBox").value="Fuel level is " + fuel;
      animateFuel();
    } else {
      document.getElementById("outputBox").value="Fuel is at MAX! Have a drive and try again later.";
    }
  });

  //Drive back and forth:
  $("#drive-btn").click(function(){
    if (carIsAnimated()){
      $("drive-btn").attr("disabled", "disabled");
    } else {
      if(!checkCarState()){
        document.getElementById("outputBox").value="You have to START the car first.";
      } else {
          if(!$("#car-icon").hasClass("Moved")){
            driveRight();
          } else {
            driveLeft();
          }
        stopIfNoFuel();
      }
    }
  });
});

//Check if car is ON:
function checkCarState(){
  if (carState == true){
    return true;
  } else {
    return false;
  }
};

//Check if there is Fuel:
function checkFuel(){
  if (fuel > 0){
    return true;
  } else {
    return false;
  }
};

//Animate fuel tank:
function animateFuel(){
  switch (fuel){
    case 3:
      $("#fuel-level").animate({
        height: "150"
      }, 750);
    break;
    case 2:
      $("#fuel-level").animate({
        height: "100"
      }, 750);
    break;
    case 1:
      $("#fuel-level").animate({
        height: "50px"
      }, 750);
    break;
    case 0:
    $("#fuel-level").animate({
      height: "10px"
    }, 750);
    break;
  }
};

//Stop the car if there is no fuel:
function stopIfNoFuel(){
  if (!checkFuel()){
    stopCar();
  }
  else {
    return true;
  }
};

//STOP the car:
function stopCar(){
  if(carState == false){
    document.getElementById("outputBox").value="The car is already OFF!";
  }
  else {
    carState = false;
    console.log("Car is " + carState);
    $("#stop-btn").addClass("stop-on");
    $("#start-btn").removeClass("start-on");
  }
};

//Check if car faces right:
function carLookingFront(){
  if(!$("#car-icon").hasClass("car-back")){
    return true;
  } else {
    return false;
  }
};

//Drive to the right:
function driveRight(){
  if(!carLookingFront()){
    document.getElementById("outputBox").value="You have to TURN the car in the right direction!";
    return false;
  } else {
    $("#car-icon").animate({
    right: "0"                                                                //Drive to the right.
    }, 1500).addClass("Moved").css({left: ''});
    document.getElementById("outputBox").value="Car goes wiiiiiiiiiii!!!!!";
    fuel--;
    animateFuel();
    console.log("Fuel is " + fuel);
  }
};

//Drive to the left:
function driveLeft(){
  if(carLookingFront()){
    document.getElementById("outputBox").value="You have to TURN the car in the right direction!";
    return false;
  } else {
    $("#car-icon").animate({
    left: "0"                                                                 //Drive to the left.
    }, 1500).removeClass("Moved").css({right: ''});
    document.getElementById("outputBox").value="Car goes wiiiiiiiiiii!!!!!";
    fuel--;
    animateFuel();
    console.log("Fuel is " + fuel);
  }
};

function carIsAnimated(){
  if ($("#car-icon").is(":animated")) {
    return true;
  } else {
    return false;
  }
};

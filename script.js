var snapPointsLeft = [];
var snapPointsTop = [];
var pegCount = [3,4];
let topIteration = 0;
let snapOffset = [0, 0];
let speedY = -10;
let bounces = 3;
let timesBounced = 0;

// window.onload = function(){
//   //var recievedInventory = window.location.search;
//   //inventory = JSON.parse(atob(recievedInventory.slice(1, recievedInventory.length)));
   inventory = {"pegs":[false, false, false, false], "hats":[false, false, false, false]};
//   console.log(inventory);
//   //switch window test code
//   window.addEventListener(`keydown`, examineCloser);


// function examineCloser(locationName) {
//   const isNumber = isFinite(event.key);
//   if(!isNumber) {
//     return false;
//   }
//   let encodedInventory = btoa(JSON.stringify(inventory));
//   window.location.href = `../HatRack/index.html?${encodedInventory}`;
// }

var playArea = document.getElementById("playArea")


for (var row = 0; row < pegCount[0]; row++) {
  for (var column = 0; column < pegCount[1]; column++) {
    var pegs = document.createElement("div");
    pegs.style.margin = "auto";
    pegs.style.marginTop = "5vh";
    pegs.style.marginBottom = "5vh";
    pegs.style.width = "4vh";
    pegs.style.height = "8vh";
    // pegs.style.borderRadius = "50%";
    pegs.id = `pegs,${row},${column}`;
    pegs.classList.add(`pegs`);
    pegs.style.zIndex = 2;
    if (pegs.id == "pegs,0,1" && !inventory.pegs[0] || pegs.id == "pegs,1,2" && !inventory.pegs[1] || pegs.id == "pegs,1,3" && !inventory.pegs[2] || pegs.id == "pegs,2,2" && !inventory.pegs[3] ) {
      playArea.appendChild(pegs);
      pegs.addEventListener("click",clickPeg);
    } else {
      if(pegs.id == "pegs,0,1" || pegs.id == "pegs,1,2"|| pegs.id == "pegs,1,3"|| pegs.id == "pegs,2,2") {
        pegs.style.visibility = `hidden`;
      }
      playArea.appendChild(pegs);
    }
  }
}
// var fallingPegs = ["pegs2", "pegs7", "pegs8", "pegs11"]

for (var row = 0; row < pegCount[0]; row++) {
  for (var column = 0; column < pegCount[1]; column++) {
    let pegId = `pegs,${row},${column}`;
    let pegs = document.getElementById(pegId);
    let pegSplit = pegId.split(`,`);
    if(pegSplit[1] == 0 && pegSplit[2] == 0) {
      snapOffset = [pegs.offsetLeft + pegs.clientWidth / 2, pegs.offsetTop + pegs.clientHeight / 2];
    }

    if (pegSplit[1] == 0) {
      let snapToDistance = playArea.clientWidth / 4;
      snapPointsLeft.push(Math.ceil(column * snapToDistance) + snapOffset[0]);
    }

    if (pegSplit[2] == 0) {
      let snapToDistance = playArea.clientHeight / 3;
      snapPointsTop.push(Math.ceil(row * snapToDistance) + snapOffset[1]);
    }
    pegs.style.position = "absolute";
    pegs.style.top = `${snapPointsTop[pegSplit[1]] - pegs.clientHeight}px`;
    pegs.style.left = `${snapPointsLeft[pegSplit[2]]}px`;
  }
}


var draggableElements = document.getElementsByClassName("hat")

for(var i = 0; i < draggableElements.length; i++){
    dragElement(draggableElements[i]);
}


// }

function closest(val, arr) {
  return arr.reduce((a, b) => {
    return Math.abs(b - val) < Math.abs(a - val) ? b : a;
  });
}

function clickPeg(e) {
  e.target.gravity = setInterval(applyGravity, 10, e.target);
  switch(e.target.id.split(",")[1]) {
    case "0":
      inventory.pegs[0] = true;
      break;
    case "1":
      if(e.target.id.split(",")[2] == 2) {
      inventory.pegs[1] = true;
      break;
      }
      inventory.pegs[2] = true;
      break;
    case "2":
      inventory.pegs[3] = true;
      break;
  }
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    e.target.style.zIndex = 4;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
  
    if(event.target.gravity) {
      clearInterval(event.target.gravity);
      event.target.gravity = false;
      event.target.timesBounced = 0;
      event.target.speedY = -10;
    }
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement(event) {
    let sideSnapOffset = 0;
    let div1 = event.target.getBoundingClientRect();
    let div1Top = div1.top;
    let div1Left = div1.left + sideSnapOffset;
    let div1Right = div1.right - sideSnapOffset;
    let div1Bottom = div1.bottom;
    let hasSnapped = false;

    for (i = 0; i < 12; i++) {

      let div2Div = document.getElementsByClassName(`pegs`)[i];
      let div2 = div2Div.getBoundingClientRect();
      let div2Top = div2.top;
      let div2Left = div2.left;
      let div2Right = div2.right;
      let div2Bottom = div2.bottom;

      let horizontalMatch = false;
      let verticalMatch = false;
      let intersect = false;

      if ((div2Top > div1Top && div2Top < div1Bottom)||(div2Bottom > div1Top && div2Bottom < div1Bottom)) {
        verticalMatch = true;
      } else{
        verticalMatch = false;
      }

      if ((div2Right > div1Left && div2Right < div1Right)||(div2Left < div1Right && div2Left > div1Left)) {
        horizontalMatch = true;
      } else {
        horizontalMatch = false;
      }

      if (horizontalMatch && verticalMatch) {
        intersect = true;
      } else {
        intersect = false;
      }

      if(intersect && (div2Div.id == "pegs,0,1" || div2Div.id == "pegs,1,2"|| div2Div.id == "pegs,1,3"|| div2Div.id == "pegs,2,2")) {
        clickPeg({"target": div2Div});
        intersect = false;
      }

      var snapX = closest(event.clientX,snapPointsLeft);
      var snapY = closest(event.target.offsetTop,snapPointsTop);

      if (intersect == true) {
        if(!(snapY == snapPointsTop[0] && snapX == snapPointsLeft[1] || snapY == snapPointsTop[1] && snapX == snapPointsLeft[3])) {
          elmnt.style.top = `${snapY - elmnt.clientHeight / 8}px`;
          elmnt.style.left = `${snapX - elmnt.clientWidth / 2}px`;
          hasSnapped = true;          
        }
      }
    }
    if (!hasSnapped) {
      event.target.gravity = setInterval(applyGravity, 10, event.target);
    }
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    if (event.target.id != "hatFour") {
      event.target.style.zIndex = 3;
    }
    else {
      event.target.style.zIndex = 1;
    }
  }
}

function applyGravity(div) {
  if(div.speedY == undefined) {
      div.timesBounced = 0;
      div.speedY = -10;
      div.speedX = 0;
  }
  let floor = window.scrollY + window.innerHeight - div.clientHeight;
  let location = Number(div.style.top.replace(/[A-Za-z]+/i,''));
  let locationLeft = Number(div.style.left.replace(/[A-Za-z]+/i,''));
  if(div.id.includes(`pegs`)) {
    const rand = Math.random() < 0.5;
    if(div.speedX == 0) {
     if(rand) {
       div.speedX = 10;
     } else {
       div.speedX = -10;
     }
    }

    console.log(div.style.left, locationLeft, div.speedX);
    let rotation = div.style.transform.replace(/\D/g,'') || 1;
    rotation = Number(rotation) + 10;
    div.style.transform = `rotate(${rotation}deg)`;
    div.style.left = `${locationLeft - div.speedX}px`;
  }
  if(location >= floor) {
    if(div.timesBounced < bounces) {
      div.speedY = -10/div.timesBounced;
      div.style.top = `${floor + div.speedY}px`;
      div.timesBounced++;
    } else {
      div.style.top = `${floor}px`;
      clearInterval(div.gravity);
      div.gravity = false;
      div.timesBounced = 0;
      div.speedY = -10;
    }
  } else {
    div.style.top = `${location + div.speedY}px`;
    div.speedY += 1;
  }



}



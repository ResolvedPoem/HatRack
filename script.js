var playArea = document.getElementById("playArea")


var snapPointsLeft = [];
var snapPointsTop = [];
let topIteration = 0;
let snapOffset = [0, 0];
for (var i = 0; i < 12; i++) {
  var pegs = document.createElement("div");
  pegs.style.margin = "auto";
  pegs.style.marginTop = "5vh";
  pegs.style.marginBottom = "5vh";
  pegs.style.width = "3vh";
  pegs.style.height = "3vh";
  pegs.style.background = "#4d392c";
  pegs.style.borderRadius = "50%";
  pegs.id = `pegs${i}`;
  playArea.appendChild(pegs);
}

for (var i = 0; i < 12; i++) {
  if(i == 0) {
    let pegs = document.getElementById(`pegs0`);
    snapOffset = [pegs.offsetLeft, pegs.offsetTop];
    console.log(snapOffset);
  }

  if (i < 4) {
    let snapToDistance = playArea.clientWidth / 4;
    snapPointsLeft.push(Math.ceil(i * snapToDistance) + snapOffset[0]);
  }
  if (i % 4 == 0) {
    let snapToDistance = playArea.clientHeight / 3;
    console.log(snapToDistance, topIteration);
    snapPointsTop.push(Math.ceil(topIteration * snapToDistance) + snapOffset[1]);
    topIteration++;
  }
}
console.log(snapPointsLeft, snapPointsTop);

function closest(val, arr) {
  return arr.reduce((a, b) => {
    return Math.abs(b - val) < Math.abs(a - val) ? b : a;
  });
}

var draggableElements = document.getElementsByClassName("hat")

for(var i = 0; i < draggableElements.length; i++){
    dragElement(draggableElements[i]);
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
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
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
    var snapX = closest(event.clientX,snapPointsLeft);
    var snapY = closest(event.clientY,snapPointsTop);

    elmnt.style.top = `${snapY - elmnt.clientHeight / 2}px`;
    elmnt.style.left = `${snapX - elmnt.clientWidth / 2}px`;
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}



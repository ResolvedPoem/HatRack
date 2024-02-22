var playArea = document.getElementById("playArea")

var pegCount = 12;
var snapPointsLeft = [];
var snapPointsTop = [];
let topIteration = 0;
let snapOffset = [0, 0];
for (var i = 0; i < pegCount; i++) {
  var pegs = document.createElement("div");
  pegs.style.margin = "auto";
  pegs.style.marginTop = "5vh";
  pegs.style.marginBottom = "5vh";
  pegs.style.width = "4vh";
  pegs.style.height = "8vh";
  // pegs.style.borderRadius = "50%";
  pegs.id = `pegs${i}`;
  pegs.classList.add(`pegs`);
  playArea.appendChild(pegs);
}

for (var i = 0; i < pegCount; i++) {
  if(i == 0) {
    let pegs = document.getElementById(`pegs0`);
    snapOffset = [pegs.offsetLeft + pegs.clientWidth / 2, pegs.offsetTop + pegs.clientHeight / 2];
  }

  if (i < 4) {
    let snapToDistance = playArea.clientWidth / 4;
    snapPointsLeft.push(Math.ceil(i * snapToDistance) + snapOffset[0]);
  }
  if (i % 4 == 0) {
    let snapToDistance = playArea.clientHeight / 3;
    snapPointsTop.push(Math.ceil(topIteration * snapToDistance) + snapOffset[1]);
    topIteration++;
  }
}


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
    e.target.style.zIndex = 1;
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

    let div1 = event.target.getBoundingClientRect();
    let div1Top = div1.top;
    let div1Left = div1.left;
    let div1Right = div1.right;
    let div1Bottom = div1.bottom;
    let hasSnapped = false;

    for (i = 0; i < pegCount; i++) {

      let div2 = document.getElementsByClassName(`pegs`)[i].getBoundingClientRect();
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

      if (horizontalMatch && verticalMatch){
        intersect = true;
      } else {
        intersect = false;
      }
      var snapX = closest(event.clientX,snapPointsLeft);
      var snapY = closest(event.target.offsetTop,snapPointsTop);

      if (intersect == true){
        elmnt.style.top = `${snapY - elmnt.clientHeight / 8}px`;
        elmnt.style.left = `${snapX - elmnt.clientWidth / 2}px`;
        hasSnapped = true;
      }
    }
    if (!hasSnapped) {
      applyGravity(event.target);
    }
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    event.target.style.zIndex = 0;
    console.log(event.target);
  }
}

function applyGravity(div) {
  let floor = window.scrollY + window.innerHeight - div.clientHeight;
  div.style.top = `${floor}px`;

}



var playArea = document.getElementById("playArea")


for (var i = 0; i < 12; i++) {
  var pegs = document.createElement("div")
pegs.style.margin = "auto";
pegs.style.marginTop = "5vh";
pegs.style.marginBottom = "5vh";
pegs.style.width = "3vh";
pegs.style.height = "3vh";
pegs.style.background = "#4d392c";
pegs.style.borderRadius = "50%";

playArea.appendChild(pegs)

}
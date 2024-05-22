
var buttonToggle = null;

function generateControlButtonContainer() {
  const controlButtonContainer = document.createElement("div");
  controlButtonContainer.id = "control-buttons-container";
  controlButtonContainer.classList.add("overlayed")
  

  const divToggle = document.createElement("div");
  const divSide = document.createElement("div");
  buttonToggle = document.createElement("button"); // toggleButton
  const buttonSide = document.createElement("button"); // toggleTheme

  buttonToggle.id = "toggleButton";  
  buttonToggle.innerText = "Toggle Menu";
  buttonSide.id = "toggleTheme";  
  buttonSide.innerText = "Toggle Theme";

  divToggle.appendChild(buttonToggle);
  divSide.appendChild(buttonSide);

  controlButtonContainer.appendChild(divToggle);
  controlButtonContainer.appendChild(divSide);

  document.body.appendChild(controlButtonContainer);
}
generateControlButtonContainer();

const sideMenu = document.getElementById('sideMenu');
var content = document.getElementById('content');

function toggleSideMenu() {
  sideMenu.style.display = (sideMenu.style.display === 'none') ? 'block' : "none";
}
sideMenu.style.display = 'none'
buttonToggle.onclick = toggleSideMenu;

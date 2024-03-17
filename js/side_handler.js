
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
  const windowRatio = window.innerWidth / window.innerHeight;

  if(windowRatio > 1.1){
    sideMenu.style.width = "25vw";
    sideMenu.style.height = "100%";
  if (sideMenu.style.display === 'none') {
    sideMenu.style.display = 'block';
  } else {
    sideMenu.style.display = 'none';
  }} else {
    sideMenu.style.width = "100%";
    sideMenu.style.height = "100vh";
    
    if (sideMenu.style.display === 'none') {
      sideMenu.style.display = 'block';
    } else {
      sideMenu.style.display = 'none';
    } 
  }

}
sideMenu.style.display = 'none'
buttonToggle.onclick = toggleSideMenu;

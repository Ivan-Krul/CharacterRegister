

const sideMenu = document.getElementById('sideMenu');
var content = document.getElementById('content');
const toggleButton = document.getElementById('toggleButton');

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
toggleButton.onclick = toggleSideMenu;


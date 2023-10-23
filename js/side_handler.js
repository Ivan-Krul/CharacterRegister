const sideMenu = document.getElementById('sideMenu');
var content = document.getElementById('content');
const toggleButton = document.getElementById('toggleButton');

function toggleSideMenu() {
  const windowRatio = window.innerWidth / window.innerHeight;

  if(windowRatio > 1.0){
    sideMenu.style.width = "15vw";
    sideMenu.style.height = "100%";
  if (sideMenu.style.display === 'none') {
    sideMenu.style.display = 'block';
    content.style.marginLeft = '1.5vh';
  } else {
    sideMenu.style.display = 'none';
    content.style.marginLeft = '1.5vh';
  }} else {
    sideMenu.style.width = "100%";
    sideMenu.style.height = "100vh";
    
    if (sideMenu.style.display === 'none') {
      sideMenu.style.display = 'block';
      content.style.marginTop = '1.5vh';
    } else {
      sideMenu.style.display = 'none';
      content.style.marginTop = '1.5vh';
    } 
  }

}
sideMenu.style.display = 'none'
toggleButton.onclick = toggleSideMenu;


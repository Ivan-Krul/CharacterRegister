const sideMenu = document.getElementById('sideMenu');
var content = document.getElementById('content');
const toggleButton = document.getElementById('toggleButton');

function toggleSideMenu() {
  if (sideMenu.style.display === 'none') {
    sideMenu.style.display = 'block';
    content.style.marginLeft = '1.5vw';
  } else {
    sideMenu.style.display = 'none';
    content.style.marginLeft = '1.5vw';
  }
}

toggleButton.onclick = toggleSideMenu;


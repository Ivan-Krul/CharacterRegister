const sideMenu = document.getElementById('sideMenu');
const content = document.getElementById('content');
const toggleButton = document.getElementById('toggleButton');

function toggleSideMenu() {
  if (sideMenu.style.display === 'none') {
    sideMenu.style.display = 'block';
    content.style.marginLeft = '220px';
  } else {
    sideMenu.style.display = 'none';
    content.style.marginLeft = '20px';
  }
}

toggleButton.onclick = toggleSideMenu;

// JavaScript to attach the toggle button while scrolling
window.onscroll = function () {
  if (window.scrollY > 100) { // Adjust this value to control when to fix the button
    toggleButton.style.position = 'fixed';
    toggleButton.style.top = '20px';
  } else {
    toggleButton.style.position = 'absolute';
    toggleButton.style.top = '20px';
  }
};

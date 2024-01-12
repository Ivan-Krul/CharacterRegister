import * as fileFetcher from "./../../../js/file_fetcher.js";
import * as darkTheme from "./../../../js/dark_theme.js";

function handleButtonBackToMind() {
  let a = document.createElement("a");
  a.href = fileFetcher.makeLinkIndependent("index.html");
  a.click();
}
if(document.getElementById("button_backToMindServer"))
  document.getElementById("button_backToMindServer").onclick = handleButtonBackToMind;

function handleButtonToggleTheme() {
  darkTheme.handleClick();
}

document.getElementById("button_toggleTheme").onclick = handleButtonToggleTheme;



function easeOut(x) {
  return Math.sqrt(x);
}
function easeInOut(x) {
  return (1 - Math.cos(Math.PI * x)) / 2;
}
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
function animateShifting(tagTarget, sideDirection, winWidth, easingFunction, transference = 0) {
  var val = 0;

  setTimeout(() => {
    val = Math.floor(winWidth * (sideDirection ? easingFunction(transference) : easingFunction(1 - transference)));

    console.log(tagTarget.style.width);
    tagTarget.style.width = val.toString() + "px";

    if (transference < 1) {
      console.log(val.toString());
      animateShifting(tagTarget, sideDirection, winWidth, easingFunction, transference + 0.04);
    }
    else if (!sideDirection)
      tagTarget.style.display = 'none';
  }, 1);


}
function handleButtonToggleAuthorDir() {
  const winWidth = window.innerWidth;
  const windowRatio = window.innerWidth / window.innerHeight;
  var sideMenu = document.getElementById('side_authorsContainer');

  if (windowRatio > 1.2) {
    if (sideMenu.style.display === 'none') {
      sideMenu.style.display = 'block';
      animateShifting(sideMenu, true, 0.3 * winWidth, easeInOutQuad);
    }
    else
      animateShifting(sideMenu, false, 0.3 * winWidth, easeInOutQuad);
  } else {

    if (sideMenu.style.display === 'none') {
      sideMenu.style.display = 'block';
      animateShifting(sideMenu, true, winWidth, easeInOutQuad);dth = "100%";
    }
    else
      animateShifting(sideMenu, false,  winWidth, easeInOutQuad);
  }
}
document.getElementById('side_authorsContainer').style.display = 'none';
document.getElementById("button_toggleAuthorList").onclick = handleButtonToggleAuthorDir;


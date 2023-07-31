const step = 3;

function convertToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + convertToHex(r) + convertToHex(g) + convertToHex(b);
}

var index = 0;

function animateTransfering(tagBody, directionToDark = true) {
  setTimeout(() => {
    if (directionToDark) {
      tagBody.style.backgroundColor = rgbToHex(255 - index, 255 - index, 255 - index);
      tagBody.style.color = rgbToHex(index, index, index);
    }
    else {
      tagBody.style.color = rgbToHex(255 - index, 255 - index, 255 - index);
      tagBody.style.backgroundColor = rgbToHex(index, index, index);
    }
    index+=step;
    if (index <= 255)
      animateTransfering(tagBody, directionToDark);
    else
      index = 0;
  }, 1)
}

function setThemeStyle(first = false) {
  let isDarkTheme = true;
  if (localStorage.length === 0) {
    localStorage.setItem("isDarkTheme", isDarkTheme);
  }
  else {
    let tagBody = document.body;
    if (localStorage.getItem("isDarkTheme") === "true") {
      if (!first)
        animateTransfering(tagBody, true);
      else {
        tagBody.style.backgroundColor = "black";
        tagBody.style.color = "white";
      }
    }
    else {
      if (!first)
        animateTransfering(tagBody, false);
      else {
        tagBody.style.backgroundColor = "white";
        tagBody.style.color = "black";
      }
    }
  }
}

function handleClick() {
  if(index)
    return;

  if (localStorage.getItem("isDarkTheme") === "true")
    localStorage.setItem("isDarkTheme", "false");
  else
    localStorage.setItem("isDarkTheme", "true");
  setThemeStyle();
}

function generateButtonToSwitch() {
  let tagButton = document.getElementById("toggleTheme");
  tagButton.onclick = handleClick;
}

setThemeStyle(true);
generateButtonToSwitch();



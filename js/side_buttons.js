import * as fileFetcher from "./file_fetcher.js";

/*

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

function changeBorderColor(targetDark = true) {
  let images = document.querySelectorAll("img");
  images.forEach(element => {
    if(targetDark)
      element.style.border = "5px solid white";
    else 
      element.style.border = "5px solid black";
  });
}

function setThemeStyle(first = false) {
  let isDarkTheme = true;
  if (localStorage.getItem("isDarkTheme") === undefined) {
    localStorage.setItem("isDarkTheme", isDarkTheme);
  }
  else {
    let tagBody = document.body;
    if (localStorage.getItem("isDarkTheme") === "true") {
      if (!first) {
        animateTransfering(tagBody, true);
        changeBorderColor(isDarkTheme);
      }
      else {
        tagBody.style.backgroundColor = "black";
        tagBody.style.color = "white";
        changeBorderColor(true);
      }
    }
    else {
      if (!first) {
        animateTransfering(tagBody, false);
        changeBorderColor(!isDarkTheme);
      }
      else {
        tagBody.style.backgroundColor = "white";
        tagBody.style.color = "black";
        changeBorderColor(false);
      }
    }
  }
}

export function handleClick() {
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
  if(tagButton === null)
   tagButton = document.getElementById("button_toggleTheme");
  tagButton.onclick = handleClick;
}

setThemeStyle(true);
if (fileFetcher.getURLParams().get("windowed") === null) {
  generateButtonToSwitch();
}

*/

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function generateSideButtons(isWindowed) {
  if(isWindowed && fileFetcher.getURLParams().get("windowed") !== null)
    return;
  
  document.body.innerHTML += `<div id="control-buttons-container" class="overlayed"><div><button id="toggleButton" onclick=handleToggleMenu> Toggle Menu </button></div><div><button id="toggleTheme"> Toggle Theme </button></div></div>`;
  
  document.getElementById("toggleButton").onclick = () => {
    document.getElementById('sideMenu').style.display = (document.getElementById('sideMenu').style.display === "block") ? "none" : "block";
  }
}

//https://stackoverflow.com/a/5624139
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
function convertToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
  return "#" + convertToHex(r) + convertToHex(g) + convertToHex(b);
}

function fitValues(min, max, x) {
  return x * (max - min) + min;
}

async function transferTheme() {
  let rootSet = document.documentElement.style;
  let rootGet = getComputedStyle(document.body);
  
  let backOg = hexToRgb(rootGet.getPropertyValue('--back'));
  let textOg = hexToRgb(rootGet.getPropertyValue('--text'));
  
  let step = parseFloat(rootGet.getPropertyValue('--step'));
  
  for(let x = 0.0; x < 1.0; x += step) {
    
    rootSet.setProperty('--back', rgbToHex(Math.floor(fitValues(backOg.r, textOg.r, x)),Math.floor(fitValues(backOg.g, textOg.g, x)),Math.floor(fitValues(backOg.b, textOg.b, x))));
    rootSet.setProperty('--text', rgbToHex(Math.floor(fitValues(textOg.r, backOg.r, x)),Math.floor(fitValues(textOg.g, backOg.g, x)),Math.floor(fitValues(textOg.b, backOg.b, x))));
    
    await delay(1);
  }
  
  rootSet.setProperty('--back',rgbToHex(textOg.r,textOg.g,textOg.b));
  rootSet.setProperty('--text',rgbToHex(backOg.r,backOg.g,backOg.b));
}

function setUpThemeSwitchButton(isWindowed) {
  let isSwappedTheme = false;
  if (localStorage.getItem("isSwappedTheme") == undefined)
    localStorage.setItem("isSwappedTheme", isSwappedTheme);
  
  if(isSwappedTheme) {
    let rootSet = document.documentElement.style;
    let rootGet = getComputedStyle(document.body);
    root.style.setProperty('--text', rootGet.getPropertyValue('--back'));
    root.style.setProperty('--back', rootGet.getPropertyValue('--text'));
  }
  
  if(isWindowed && document.getElementById("toggleTheme") == null)
    return;
  
  document.getElementById("toggleTheme").onclick = transferTheme;
}


export async function setUpSideButtons(isWindowed) {
  generateSideButtons(isWindowed);
  setUpThemeSwitchButton(isWindowed);
}

  
//let root = document.documentElement;
//for(let i = 0; i < themesJson.length; i++) {
//  if(themesJson[i].name.includes(themeArg)) {
//    root.style.setProperty('--back', themesJson[i].main);
//    root.style.setProperty('--mcol', themesJson[i].semi);
//    root.style.setProperty('--text', themesJson[i].text);
//  }
//}

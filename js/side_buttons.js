import * as fileFetcher from "./file_fetcher.js";

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function generateSideButtons(isWindowed) {
  if(isWindowed && fileFetcher.getURLParams().get("windowed") !== null)
    return;
  
  document.body.innerHTML += `<div id="control-buttons-container" class="overlayed"><div><button id="toggleButton" onclick=handleToggleMenu><img alt="Toggle Menu" class="small_pic buttons" src="${fileFetcher.makeLinkIndependent("image/SmallPictures/menu.png")}" </button></div><div><button id="toggleTheme"><img alt="Toggle Theme" class="small_pic buttons" src="${fileFetcher.makeLinkIndependent(localStorage.getItem("isSwappedTheme") == "true" ? "image/SmallPictures/sun.png" : "image/SmallPictures/moon.png")}" id="themeImage"></button></div></div>`;
  
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

var transferingLock = false;
async function transferTheme() {
  if(transferingLock) {
    return;
  }
  transferingLock = true;
  let rootSet = document.documentElement.style;
  let rootGet = getComputedStyle(document.body);
  
  let isSwappedTheme = localStorage.getItem("isSwappedTheme") == "true";
  localStorage.setItem("isSwappedTheme", !isSwappedTheme);
  console.log(localStorage.getItem("isSwappedTheme"));
  
  let backOg = hexToRgb(rootGet.getPropertyValue('--back'));
  let textOg = hexToRgb(rootGet.getPropertyValue('--text'));
  
  let step = parseFloat(rootGet.getPropertyValue('--step'));
  
  document.getElementById("themeImage").src = fileFetcher.makeLinkIndependent(isSwappedTheme ? "image/SmallPictures/moon.png" : "image/SmallPictures/sun.png");
  
  for(let x = 0.0; x < 1.0; x += step) {
    
    rootSet.setProperty('--back', rgbToHex(Math.floor(fitValues(backOg.r, textOg.r, x)),Math.floor(fitValues(backOg.g, textOg.g, x)),Math.floor(fitValues(backOg.b, textOg.b, x))));
    rootSet.setProperty('--text', rgbToHex(Math.floor(fitValues(textOg.r, backOg.r, x)),Math.floor(fitValues(textOg.g, backOg.g, x)),Math.floor(fitValues(textOg.b, backOg.b, x))));
    
    await delay(1);
  }
  
  rootSet.setProperty('--back',rgbToHex(textOg.r,textOg.g,textOg.b));
  rootSet.setProperty('--text',rgbToHex(backOg.r,backOg.g,backOg.b));
  transferingLock = false;
}

function setUpThemeSwitchButton(isWindowed) {
  let isSwappedTheme = localStorage.getItem("isSwappedTheme") == "true";
  if (isSwappedTheme == undefined) {
    localStorage.setItem("isSwappedTheme", false);
    isSwappedTheme = false;
  }
  
  
  if(isSwappedTheme) {
    let rootSet = document.documentElement.style;
    let rootGet = getComputedStyle(document.body);
    let backOg = rootGet.getPropertyValue('--back');
    let textOg = rootGet.getPropertyValue('--text');
    rootSet.setProperty('--text', backOg);
    rootSet.setProperty('--back', textOg);
  }
  
  if(isWindowed && document.getElementById("toggleTheme") == null)
    return;
  
  document.getElementById("toggleTheme").onclick = transferTheme;
}


export async function setUpSideButtons(isWindowed) {
  generateSideButtons(isWindowed);
  setUpThemeSwitchButton(isWindowed);
}


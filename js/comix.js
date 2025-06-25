import {assemble} from "./base_generator.js";
import * as fileFetcher from "./file_fetcher.js";

async function loadComixList() {
  document.getElementById("listContainer").style.display = "inherit";
  const colomns = 3;
  let list = await fileFetcher.fetchTextFileLined("list/comixes.txt");
  let res = "";
  
  for(let i = 0; i < list.length; i++) {
    if(i % colomns == 0) {
      if(i != 0)
        res += `<\tr>`;
      res += `<tr>`;
    }
    
    res += `<td><a href="./comix.html?comix=${list[i]}&page=about">${list[i]}</a></td>`;
  }
  
  document.getElementById("listComix").innerHTML = res;
}

var aboutJson = {};

async function loadAbout() {
  document.getElementById("aboutContainer").style.display = "inherit";
  let comixArg = fileFetcher.getURLParams().get("comix");
  aboutJson = JSON.parse(await fileFetcher.fetchFile("image/Comix/"+comixArg+"/about.json"));
  
  document.getElementById("header").innerText = "About " + aboutJson.title;
  document.getElementById("comixPageCount").innerText = aboutJson.pages;
  document.getElementById("comixFirstPageDate").innerText = aboutJson.date_first_page;
  document.getElementById("comixLatestPageDate").innerText = aboutJson.date_latest_page;
  document.getElementById("comixDescription").innerText = aboutJson.description;
  
  document.getElementById("linkFirstPage").href = "./comix.html?comix=" + comixArg + "&page=1";
}

async function loadComixPage() {
  document.getElementById("readContainer").style.display = "inherit";
  let comixArg = fileFetcher.getURLParams().get("comix");
  aboutJson = JSON.parse(await fileFetcher.fetchFile("image/Comix/"+comixArg+"/about.json"));
  document.getElementById("header").innerText = aboutJson.title;
  
  let pageArg = (fileFetcher.getURLParams().get("page")).toString();
  let reqPage = aboutJson.numeration;
  let indxFirstDigit = reqPage.indexOf('#');
  let indxLastDigit = reqPage.lastIndexOf('#');
  
  if((indxLastDigit - indxFirstDigit) >= pageArg.length) {
    console.log(pageArg);
    reqPage = reqPage.replaceAll('#', '0');
    reqPage = [reqPage.slice(0,indxLastDigit - pageArg.length), pageArg, reqPage.slice(indxLastDigit - pageArg.length)].join();
  }
  else {
    reqPage = reqPage.replaceAll('#', '');
    reqPage = [reqPage.slice(0,indxFirstDigit), pageArg, reqPage.slice(indxFirstDigit)].join('');
  }
  
  document.getElementById("buttonFirst").onclick = toFirst;
  document.getElementById("buttonPrev").onclick = toPrev;
  document.getElementById("inputNumber").onchange = moveTo;
  document.getElementById("buttonNext").onclick = toNext;
  document.getElementById("buttonLatest").onclick = toLatest;
  
  document.getElementById("comixPage").src = fileFetcher.makeLinkIndependent("image/Comix/"+comixArg+"/" +reqPage);
  document.getElementById("inputNumber").value = parseInt(pageArg);
  document.getElementById("buttonFirst").disabled = parseInt(pageArg) < 2;
  document.getElementById("buttonPrev").disabled = parseInt(pageArg) <= 0;
  document.getElementById("buttonNext").disabled = parseInt(pageArg) >= aboutJson.pages;
  document.getElementById("buttonLatest").disabled = parseInt(pageArg) >= aboutJson.pages;
}

async function doSteering() {
  let comixArg = fileFetcher.getURLParams().get("comix");
  if(comixArg) {
    let pageArg = fileFetcher.getURLParams().get("page");
    if(pageArg) {
      if(pageArg == "about")
        await loadAbout();
      else
        await loadComixPage();
    }
    else
      await loadAbout();
  }
  else {
    await loadComixList();
  }
}

function toFirst() {
  let comixArg = fileFetcher.getURLParams().get("comix");
  window.open("./comix.html?comix=" + comixArg + "&page=1", '_self');
}

function toPrev() {
  let comixArg = fileFetcher.getURLParams().get("comix");
  let pageArg = parseInt(fileFetcher.getURLParams().get("page")) - 1;
  if(pageArg >= 0)
    window.open("./comix.html?comix=" + comixArg + "&page="+pageArg, '_self');
}

function toNext() {
  let comixArg = fileFetcher.getURLParams().get("comix");
  let pageArg = parseInt(fileFetcher.getURLParams().get("page")) + 1;
  
  if(pageArg <= aboutJson.pages)
    window.open("./comix.html?comix=" + comixArg + "&page="+pageArg, '_self');
}

function toLatest() {
  let comixArg = fileFetcher.getURLParams().get("comix");
  window.open("./comix.html?comix=" + comixArg + "&page=" + aboutJson.pages, '_self');
}

function moveTo(args) {
  let comixArg = fileFetcher.getURLParams().get("comix");
  let pageArg = parseInt(fileFetcher.getURLParams().get("page"));
  if(parseInt(args.target.value) <= aboutJson.pages && parseInt(args.target.value) >= 0 && pageArg != parseInt(args.target.value))
    window.open("./comix.html?comix=" + comixArg + "&page=" + args.target.value, '_self');
}

await assemble();
await doSteering();

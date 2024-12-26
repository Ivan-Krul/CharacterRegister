import {assemble} from "./base_generator.js";
import * as fileFetcher from "./file_fetcher.js";
import * as videoException from "./video_exception.js"
import * as oc from "./oc.js";
import * as postParser from "../../PostViewer/post_parser.js";

const OC_PARAM = capitalizeFirstLetter(fileFetcher.getURLParams().get("oc").toLowerCase());
const GALLERY_STYLE = "max-width: min(25vw, 25vh)";

var json = {};

function renderOrientation() {
  let fill = "";
  for (let index = 0; index < json.orientation.length; index++) {
    fill += `<b style="background-color: ${json.orientation[index]}">_</b>`;
  }
  document.getElementById("orient").innerHTML = fill;
}


function prepareDetailList(list = []) {
  let fill = "";
  list.forEach((value) => {fill+= `<div>${value}</div>`;});
  return fill;
}


function renderDetails() {
  document.getElementById("pfp").src =                       json.pfp_path;

  document.getElementById("bioClass").innerText =            json.biological_class;
  document.getElementById("age").innerText =                 oc.extractAge(json.initial_age, json.date_creation,json.disappeared,json.date_disappearence);
  document.getElementById("sex").innerText =                 json.sex;

  renderOrientation();
  document.getElementById("traits").innerHTML =              prepareDetailList(json.traits)

  document.getElementById("dateCreation").innerText =        oc.convertDateToStringFull(new Date(json.date_creation));

  if(json.disappeared) {
    document.getElementById("dateDisappearence").innerText = oc.convertDateToStringFull(new Date(json.date_disappearence));
    document.getElementById("header").innerText =            `${OC_PARAM} (Disappeared)`;
  }
  else
    document.getElementById("header").innerText =            OC_PARAM;

  document.getElementById("country").innerText =             json.country;
  document.getElementById("parentMom").innerText =           json.parents.mother;
  document.getElementById("parentDad").innerText =           json.parents.father;
  document.getElementById("interests").innerHTML =           prepareDetailList(json.interests)
  document.getElementById("work").innerText =                json.work;
  
}


async function prepareTom(filename = "") {
  let rawTom = await fileFetcher.fetchFile(`/list/toms/${filename}`);
  return `<h1>${postParser.parseRawTitle(rawTom)}</h1><div>${postParser.parseRawPost(rawTom)}</div>`;
}

async function renderStoriesV1() {
  let merged = "";

  for(let i = 0; i < json.stories.length; i++) {
    if(typeof json.stories[i] === 'string') {
      merged += `<div>${await prepareTom(json.stories[i])}</div><hr/>`;
    }
    else
      merged += `<div>${oc.prepareStoryV1(json.stories[i])}</div><hr/>`;
  }
  document.getElementById("stories").innerHTML = merged;
}


function prepareNotMineDrawings() {
  let merged = ""

  for(let i = 0; i < json.not_mine_gallery.length; i++) {
    merged += `<a target="_blank" href="${json.not_mine_gallery[i].link}"><img style="${GALLERY_STYLE}" src="${fileFetcher.makeLinkIndependent(`image/Not mine/${json.not_mine_gallery[i].path}`)}"/></a>`
  }

  return merged;
}

function prepareMineDrawings() {
  let merged = ""

  for(let i = 0; i < json.mine_gallery.length; i++) {
    merged += `<img style="${GALLERY_STYLE}" src="${fileFetcher.makeLinkIndependent(json.mine_gallery[i])}"/>`
  }

  return merged;
}

function renderGallery() {
  document.getElementById("gallery").innerHTML = `<div>${prepareNotMineDrawings()}</div><div>${prepareMineDrawings()}</div>`;
}


function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

async function renderStoriesV2() {
  const SEP_VALUE = '=';
  const ROOT_SYM = '#';
  let lines = ((await fileFetcher.fetchFile(`characters/Stories/${OC_PARAM}.stry`)).replaceAll('\r', '')).split('\n');
  let l = 0;
  let count = 0;
  let spacing = 1;
  
  while(lines[l][0] === ROOT_SYM) {
    if(lines[l].includes(ROOT_SYM+"COUNT")) count = parseInt(lines[l].substr(lines[l].indexOf(SEP_VALUE) + 1));
    if(lines[l].includes(ROOT_SYM+"SPACE")) spacing = parseInt(lines[l].substr(lines[l].indexOf(SEP_VALUE) + 1));
    l++;
  }
  
  var bowl = "";
  
  for(let s = 0; s < count; s++) {
    var allocated = 0;
    var merge = "";
    var mode = '0';
    l += spacing;
    
    while(lines[l][0] === ROOT_SYM) {
      if(lines[l][2] === SEP_VALUE || lines[l].length < 4) mode = lines[l][1];
      if(lines[l].includes(ROOT_SYM+"S")) allocated = parseInt(lines[l].substr(lines[l].indexOf(SEP_VALUE) + 1));
      l++;
    }
    
    switch(mode) {
      case 'S':
        for(let n = 0; n < allocated; n++) {
          merge += lines[l];
          l++;
        }
        merge = postParser.parseRawPost(merge);
        break;
      case 'T':
        console.log(lines[l]);
        merge = await prepareTom(lines[l]);
        l++;
        break;
      default:
        console.warn(`bleh :p\nmode: ${mode}`);
    }
    
    bowl += `<div>${merge}</div><hr/>`;
  }
  
  document.getElementById("stories").innerHTML = bowl;
}

function renderV1() {
  renderDetails();
  renderStoriesV1();
  renderGallery();
}

function renderV2() {
  renderDetails();
  renderStoriesV2();
  renderGallery();
}

function chooseJsonInputVersion() {
  switch(json.version) {
    case 1: renderV1(); break;
    case 2: renderV2(); break;
  }
}

async function render() {
  document.title = `${OC_PARAM} in CharacterRegister`;

  try {
    json = JSON.parse(await fileFetcher.fetchFile("characters/" + OC_PARAM + ".json"));
    json.mine_gallery = await oc.getGalleryLinks(OC_PARAM);

    chooseJsonInputVersion();
  }
  catch (error) {
    let div_section = document.getElementById("content");
    div_section.appendChild(await videoException.getExceptionNode(error));
  }
}

await assemble();
await render();
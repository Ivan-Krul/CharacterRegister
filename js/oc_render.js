import {assemble} from "./base_generator.js";
import * as fileFetcher from "./file_fetcher.js";
import * as videoException from "./video_exception.js"
import * as oc from "./oc.js";
import * as postParser from "../../PostViewer/post_parser.js";

const OC_PARAM = capitalizeFirstLetter(fileFetcher.getURLParams().get("oc").toLowerCase());
const GALLERY_STYLE = "max-width: 25vw";

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
  document.getElementById("mbtiType").innerText =            json.mbti;

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

async function renderStories() {
  let merged = "";

  for(let i = 0; i < json.stories.length; i++) {
    if(typeof json.stories[i] === 'string') {
      merged += `<div>${await prepareTom(json.stories[i])}</div><hr/>`;
    }
    else
      merged += `<div>${oc.prepareStory(json.stories[i])}</div><hr/>`;
  }
  document.getElementById("stories").innerHTML = merged;
}


function prepareNotMineDrawings() {
  let merged = ""

  for(let i = 0; i < json.not_mine_gallery.length; i++) {
    merged += `<a target="_blank" href="${json.not_mine_gallery[i].link}"><img style="${GALLERY_STYLE}" src="${fileFetcher.makeLinkIndependent(json.not_mine_gallery[i].path)}"/></a>`
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

async function render() {
  document.title = `${OC_PARAM} in CharacterRegister`;

  try {
    json = JSON.parse(await fileFetcher.fetchFile("characters/" + OC_PARAM + ".json"));
    json.mine_gallery = await oc.getGalleryLinks(OC_PARAM);

    renderDetails();
    renderStories();
    renderGallery();
  }
  catch (error) {
    let div_section = document.getElementById("content");
    div_section.appendChild(await videoException.getExceptionNode(error));
  }
}

await assemble();
await render();
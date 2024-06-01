import "./base_generator.js";
import * as fileFetcher from "./file_fetcher.js";
import * as videoException from "./video_exception.js"
import * as oc from "./oc.js";

const OC_PARAM = fileFetcher.getURLParams().get("oc");

var json = {};

function renderOrientation() {
  let fill = "";
  for (let index = 0; index < json["orientation"].length; index++) {
    fill += `<b style:"background-color: ${json["orientation"][index]}">_</b>`;
  }
  document.getElementById("orient").innerHTML = fill;
}

function renderDetails() {
  

  document.getElementById("pfp").src =                       json["pfp_path"];

  document.getElementById("bioClass").innerText =            json["biological_class"];
  document.getElementById("sex").innerText =                 json["sex"];
  document.getElementById("mbtiType").innerText =            json["mbti"];

  renderOrientation();

  document.getElementById("dateCreation").innerText =        oc.convertDateToStringFull(new Date(json["date_creation"]));

  if(json["disappeared"]) {
    document.getElementById("dateDisappearence").innerText = oc.convertDateToStringFull(new Date(json["date_disappearence"]));
    document.getElementById("header").innerText = `${OC_PARAM} (Disappeared)`;
  }
  else
    document.getElementById("header").innerText = OC_PARAM;

  document.getElementById("country").innerText =             json["country"];
  document.getElementById("parentMom").innerText =           json["parents"]["mother"];
  document.getElementById("parentDad").innerText =           json["parents"]["father"];
  document.getElementById("work").innerText =                json["work"];
  
}

function renderStories() {

}

function renderGallery() {

}

async function render() {
  document.title = `${OC_PARAM} in CharacterRegister`;

  try {
    json = JSON.parse(await fileFetcher.fetchFile("characters/" + OC_PARAM + ".json"));

    renderDetails();
  }
  catch (error) {
    let div_section = document.getElementById("content");
    div_section.appendChild(await videoException.getExceptionNode(error));
  }
}

render();

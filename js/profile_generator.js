import * as fileFetcher from "./file_fetcher.js";
import * as videoException from "./video_exception.js"

function outputAge(initialAge, strDateCreation, disappeared, strDateDisappearence) {
  if(strDateCreation === null) {
    document.getElementById("age").innerText = initialAge;
    return;
  }
  const today = new Date();
  if (disappeared) {
    console.log("disappeared");
    document.getElementById("header").innerText += " (Disappeared)";

    let diffd = today - new Date(strDateDisappearence);
    let diffc = today - new Date(strDateCreation);

    document.getElementById("age").innerText = initialAge + parseInt(Math.floor(diffc / 1000 / 60 / 60 / 24 / 365.24 - diffd / 1000 / 60 / 60 / 24 / 365.24));
  }
  else {
    let diffc = today - new Date(strDateCreation);

    document.getElementById("age").innerText = initialAge + parseInt(diffc / 1000 / 60 / 60 / 24 / 365.24);
  }
}

function fillIndeteficationInComunity(object) {
  for (let index = 0; index < object["intedefication_in_comunity"].length; index++) {
    let b = document.createElement("b");
    b.innerText = '_';
    b.style.backgroundColor = object["intedefication_in_comunity"][index];
    document.getElementById("idInCom").appendChild(b);
  }
}

function fillTraits(object) {
  for (let index = 0; index < object["traits"].length; index++) {
    let b = document.createElement("div");
    b.innerText = object["traits"][index];
    document.getElementById("traits").appendChild(b);
  }
}

function fillDateDisappearence(object) {
  if (object["disappeared"] || object["dateDisappearence"] !== undefined || object["dateDisappearenceInMind"] !== undefined) {
    document.getElementById("dateDisappearence").innerText = object["date_disappearence"];
    document.getElementById("dateDisappearenceInMind").innerText = object["date_disappearence_in_mind"];
  }
}

function fillInterests(object) {
  for (let index = 0; index < object["interests"].length; index++) {
    let b = document.createElement("div");
    b.innerText = object["interests"][index];
    document.getElementById("intrestings").appendChild(b);
  }
}

function fillCurrency(object) {
  document.getElementById("currency").innerText = "#" + object["currency"]["now_place"]
    + " (~" + object["currency"]["now_value"]
    + "S) from " + "#" + object["currency"]["then_place"]
    + " (~" + object["currency"]["then_value"] + "S)";
}

function replaceAllOccurrences(inputString, substringToReplace, replacementValue) {
  // Escape special characters in the substring
  var escapedSubstring = substringToReplace.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Use a regular expression with the global flag to replace all occurrences
  var regex = new RegExp(escapedSubstring, 'g');
  
  // Replace all occurrences of the substring with the new value
  var resultString = inputString.replace(regex, replacementValue);

  return resultString;
}

function removeComments(input) {
  const regex = /\/\*[\s\S]*?\*\//g;
  return input.replace(regex, '');
}

function fillStories(object) {
  for (let i = 0; i < object["stories"].length; i++) {
    let div = document.createElement("p");
    let concatStr = "";

    for (let index = 0; index < object["stories"][i].length; index++) {
      let str = object["stories"][i][index];

      str = replaceAllOccurrences(str, "[N:", "<a href=\"oc.html?oc=");
      str = replaceAllOccurrences(str, ",V:", "\">");
      str = replaceAllOccurrences(str, ".]", "</a>");

      str = replaceAllOccurrences(str, "[q]", "<q>");
      str = replaceAllOccurrences(str, "[/q]", "</q>");

      str = replaceAllOccurrences(str, "[", "<i>[");
      str = replaceAllOccurrences(str, "]", "]</i>");
      str = replaceAllOccurrences(str, "\n", "<br>");

      concatStr += str;
    }

    concatStr = removeComments(concatStr);

    div.innerHTML = concatStr + "<hr>";

    document.getElementById("stories").appendChild(div);
  }
}

async function fillMineGallery() {
  const urlParams = new URLSearchParams(window.location.search);
  const ocName = urlParams.get('oc');
  let image_lines = (await fileFetcher.fetchFile("image/paths.txt")).split('\n');
  let image_list = filterStringsByMatch(image_lines, ocName);

  for (let i = 0; i < image_list.length; i++) {
    let img = document.createElement("img");
    img.src = fileFetcher.makeLinkIndependent(image_list[i]);
    document.getElementById("gallery").appendChild(img);
  }
}

function fillNotMineGallery(object) {
  for (let i = 0; i < object["not_mine_gallery"].length; i++) {
    let img = document.createElement("img");
    img.src = "../" + object["not_mine_gallery"][i]["path"];

    let tagA = document.createElement("a");
    tagA.href = object["not_mine_gallery"][i]["link"];
    tagA.target = "_blank";
    tagA.appendChild(img)
    document.getElementById("gallery").appendChild(tagA);
  }
}

function fillProfile(object) {
  document.getElementById("pfp").src =                      object["pfp_path"];
  document.getElementById("bioClass").innerText =           object["biological_class"];
  document.getElementById("sex").innerText =                object["sex"];
  document.getElementById("dateCreation").innerText =       object["date_creation"];
  document.getElementById("dateCreationInMind").innerText = object["date_creation_in_mind"];
  document.getElementById("country").innerText =            object["country"];
  document.getElementById("parents").innerText =            object["parents"]["mother"] + '\n';
  document.getElementById("parents").innerText +=           object["parents"]["father"];
  document.getElementById("work").innerText =               object["work"];
  document.getElementById("mbtiType").innerText =           object["mbti"];

  outputAge(
    object["initial_age"],
    object["date_creation"],
    object["disappeared"],
    object["date_disappearence"]);
  fillIndeteficationInComunity(object);
  fillTraits(object);
  fillDateDisappearence(object);
  fillInterests(object);
  //document.getElementById("currency").innerText = undefined;//fillCurrency(object);
  fillStories(object);
  fillMineGallery();
  fillNotMineGallery(object);
}

async function outputOCData() {
  const urlParams = new URLSearchParams(window.location.search);
  const ocName = urlParams.get('oc');

  let content = "";
  let json = {};
  
  let image_lines = [];
  try {
    content = await fileFetcher.fetchFile("list/characters/" + ocName + ".json");
    json = JSON.parse(content);

    image_lines = (await fileFetcher.fetchFile("image/paths.txt")).split('\n');
  }
  catch (error) {
    document.getElementById("bioClass").appendChild(videoException.getExceptionNode(error));
    return;
  }

  document.getElementById("header").innerText = ocName;
  document.title = ocName + " in Character Register";

  fillProfile(json);
}

var readIndex = 0;

function filterStringsByMatch(strings, match) {
  const filteredStrings = strings.filter(str => str.includes(match));
  return filteredStrings;
}

outputOCData();


import * as fileFetcher from "./file_fetcher.js";

function generateLinks(list, httpArgument) {
  let tag = document.getElementById("linkList");

  for (let index = 0; index < list.length; index++) {
    let element = list[index];
    if (element === "")
      continue;

    let tagA = document.createElement("a");
    tagA.href = fileFetcher.makeLinkIndependent("pages/" + httpArgument + ".html?" + httpArgument + "=" + element);
    tagA.innerText = httpArgument + ": " + element;
    let tagLi = document.createElement("li");
    tagLi.appendChild(tagA);
    tag.appendChild(tagLi);
  }
}

async function gatherOCs() {
  let content = await fileFetcher.fetchFile("list/characters.txt");
  let formatedContent = content.split('\n');
  generateLinks(formatedContent, "oc");
}

async function gatherDefs() {
  let content = await fileFetcher.fetchFile("list/definitions.txt");
  let formatedContent = content.split('\n');
  generateLinks(formatedContent, "def");
}

async function gatherEvents() {
  let content = await fileFetcher.fetchFile("list/events.txt");
  let formatedContent = content.split('\n');
  let tag = document.getElementById("linkList");

  for (let index = 0; index < formatedContent.length; index++) {
    let element = formatedContent[index];
    if (element === "")
      continue;

    let tagA = document.createElement("a");
    tagA.href = fileFetcher.makeLinkIndependent("list/events/" + element);
    tagA.innerText = "event: " + element;
    let tagLi = document.createElement("li");
    tagLi.appendChild(tagA);
    tag.appendChild(tagLi);
  }
}

gatherOCs();
gatherDefs();
gatherEvents();


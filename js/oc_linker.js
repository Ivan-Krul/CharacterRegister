function fetchFile(filePath) {
  for (let index = 0; index < getCountToRoot(); index++) {
    let toRoot = "../";
    toRoot += filePath;
    filePath = toRoot;
  }

  return fetch(filePath)
    .then(response => response.text())
    .catch(error => {
      console.error('Error fetching ' + filePath + ':', error);
      return '';
    });
}

function getCountToRoot() {
  path = window.location.pathname;

  slashCount = (path.match(/\//g) || []).length;
  splitedStr = path.split("CharacterRegister")[0];
  slashCountDomain = (splitedStr.match(/\//g) || []).length;
  resCount = slashCount - slashCountDomain - 1;

  return resCount;
}

function makeLinkIndependent(link) {
  if(getCountToRoot() === 0)
    return link;
  for(let i = 0; i < getCountToRoot(); i++) {
    let bufL = link;
    link = "../" + bufL;
  }
  return link;
}

function generateLinks(list, httpArgument) {
  let tag = document.getElementById("linkList");

  for (let index = 0; index < list.length; index++) {
    let element = list[index];
    if (element === "")
      continue;

    let tagA = document.createElement("a");
    tagA.href = makeLinkIndependent("pages/" + httpArgument + ".html?" + httpArgument + "=" + element);
    tagA.innerText = httpArgument + ": " + element;
    let tagLi = document.createElement("li");
    tagLi.appendChild(tagA);
    tag.appendChild(tagLi);
  }
}

async function gatherOCs() {
  let content = await fetchFile("list/characters.txt");
  let formatedContent = content.split('\n');
  generateLinks(formatedContent, "oc");
}

async function gatherDefs()  {
  let content = await fetchFile("list/definitions.txt");
  let formatedContent = content.split('\n');
  generateLinks(formatedContent, "def");
}

async function gatherEvents()  {
  let content = await fetchFile("list/events.txt");
  let formatedContent = content.split('\n');
  let tag = document.getElementById("linkList");

  for (let index = 0; index < formatedContent.length; index++) {
    let element = formatedContent[index];
    if (element === "")
      continue;

    let tagA = document.createElement("a");
    tagA.href = makeLinkIndependent("list/events/" + element);
    tagA.innerText ="event: " + element;
    let tagLi = document.createElement("li");
    tagLi.appendChild(tagA);
    tag.appendChild(tagLi);
}
}

gatherOCs();
gatherDefs();
gatherEvents();


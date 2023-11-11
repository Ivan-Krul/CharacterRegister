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
      throw 'Error fetching ' + filePath + ': ' + error;
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

function makeLinkIndependent(link) {
  if(getCountToRoot() === 0)
    return link;
  for(let i = 0; i < getCountToRoot(); i++) {
    let bufL = link;
    link = "../" + bufL;
  }
  return link;
}


async function outputArticle() {
  const urlParams = new URLSearchParams(window.location.search);
  const definition = urlParams.get('def');

  try {
    let article = await fetchFile("list/definitions/" + definition + ".html");

    article = article.replaceAll("%(imgdir)%", makeLinkIndependent("image/DefinitionPool/"));

    document.getElementById("header").innerText = "Definition of: " + definition;
    document.getElementById("set").innerHTML = article;
  }
  catch (error) {
    if (Math.random() < 0.5)
      document.getElementById("set").innerHTML = error + "<br/><video src=\"../resource/knife style.mp4\" autoplay controls style=\"max-width: 50vw; max-height: 50vh\"></video>";
    else  
      document.getElementById("set").innerHTML = error + "<br/><video src=\"../resource/wrecked.mp4\" autoplay controls style=\"max-width: 50vw; max-height: 50vh\"></video>";
  }
}

outputArticle();

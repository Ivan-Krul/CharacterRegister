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

function outputAge(initialAge, strDateCreation, disappeared, strDateDisappearence) {
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

async function outputOCData() {
  const urlParams = new URLSearchParams(window.location.search);
  const ocName = urlParams.get('oc');

  let content = "";
  let json = {};
  
  let image_lines = [];
  try {
    content = await fetchFile("list/characters/" + ocName + ".json");
    json = JSON.parse(content);

    image_lines = (await fetchFile("image/paths.txt")).split('\n');
  }
  catch (error) {
    if (Math.random() < 0.5)
      document.getElementById("bioClass").innerHTML = error + "<br/><video src=\"../resource/knife style.mp4\" autoplay controls style=\"max-width: 50vw; max-height: 50vh\"></video>";
    else
      document.getElementById("bioClass").innerHTML = error + "<br/><video src=\"../resource/wrecked.mp4\" autoplay controls style=\"max-width: 50vw; max-height: 50vh\"></video>";
    return;
  }

  let image_list = filterStringsByMatch(image_lines, ocName);

  console.log(json);

  document.title = ocName + " in Character Register";
  document.getElementById("header").innerText = ocName;
  document.getElementById("pfp").src = json["pfp_path"];
  document.getElementById("bioClass").innerText = json["biological_class"];
  outputAge(json["initial_age"], json["date_creation"], json["disappeared"], json["date_disappearence"]);
  document.getElementById("sex").innerText = json["sex"];

  for (let index = 0; index < json["intedefication_in_comunity"].length; index++) {
    let b = document.createElement("b");
    b.innerText = '_';
    b.style.backgroundColor = json["intedefication_in_comunity"][index];
    document.getElementById("idInCom").appendChild(b);
  }

  for (let index = 0; index < json["traits"].length; index++) {
    let b = document.createElement("div");
    b.innerText = json["traits"][index];
    document.getElementById("traits").appendChild(b);
  }

  document.getElementById("dateCreation").innerText = json["date_creation"];
  document.getElementById("dateCreationInMind").innerText = json["date_creation_in_mind"];

  if (json["disappeared"]) {
    document.getElementById("dateDisappearence").innerText = json["date_disappearence"];
    document.getElementById("dateDisappearenceInMind").innerText = json["date_disappearence_in_mind"];
  }

  document.getElementById("country").innerText = json["country"];

  document.getElementById("parents").innerText = json["parents"]["mother"] + '\n';
  document.getElementById("parents").innerText += json["parents"]["father"];

  for (let index = 0; index < json["interests"].length; index++) {
    let b = document.createElement("div");
    b.innerText = json["interests"][index];
    document.getElementById("intrestings").appendChild(b);
  }

  document.getElementById("work").innerText = json["work"];
  document.getElementById("currency").innerText = "#" + json["currency"]["now_place"]
    + " (~" + json["currency"]["now_value"]
    + "S) from " + "#" + json["currency"]["then_place"]
    + " (~" + json["currency"]["then_value"] + "S)";

  for (let i = 0; i < json["stories"].length; i++) {
    let div = document.createElement("p");
    let concatStr = "";

    for (let index = 0; index < json["stories"][i].length; index++) {
      let str = json["stories"][i][index];

      str = str.replace("[", "<i>[");
      str = str.replace("]", "]</i>");
      while (str.indexOf(";") !== -1)
        str = str.replace(";", "<br>");

      concatStr += str;
    }
    div.innerHTML = concatStr;

    document.getElementById("stories").appendChild(div);
  }

  for (let i = 0; i < image_list.length; i++) {
    console.log(image_list[i]);
    let img = document.createElement("img");
    img.src = "../" + image_list[i];
    document.getElementById("gallery").appendChild(img);
  }

  for (let i = 0; i < json["not_mine_gallery"].length; i++) {
    let img = document.createElement("img");
    img.src = "../" + json["not_mine_gallery"][i]["path"];

    let tagA = document.createElement("a");
    tagA.href = json["not_mine_gallery"][i]["link"];
    tagA.target = "_blank";
    tagA.appendChild(img)
    document.getElementById("gallery").appendChild(tagA);
  }
}

var readIndex = 0;

function getTextSection(formatedContent) {
  let str = formatedContent[readIndex];
  if (str.lastIndexOf("\r") !== -1)
    str = str.split('\r')[0];

  console.log(readIndex + ": " + str);
  return str;
}

function getNextTextSection(formatedContent) {
  let str = getTextSection(formatedContent);
  readIndex++;
  return str;
}

function filterStringsByMatch(strings, match) {
  const filteredStrings = strings.filter(str => str.includes(match));
  return filteredStrings;
}

// deprecated
async function gatherOCData() {
  const urlParams = new URLSearchParams(window.location.search);
  const ocName = urlParams.get('oc');

  let content = await fetchFile("list/" + ocName + ".txt");
  let formatedContent = content.split('\n');
  formatedContent = formatedContent.filter((str) => {
    return ((str.length > 1)
      ? ((str[0] !== '#')
        ? true
        : false)
      : false);
  });

  console.log(formatedContent);

  readIndex = 0;

  document.title = ocName + " in Character Register";
  document.getElementById("header").innerText = ocName;
  document.getElementById("pfp").src = getNextTextSection(formatedContent);
  document.getElementById("bioClass").innerText = getNextTextSection(formatedContent);
  let initialAge = parseInt(getNextTextSection(formatedContent));
  document.getElementById("sex").innerText = getTextSection(formatedContent);

  let size = parseInt(getNextTextSection(formatedContent));

  for (let index = 0; index < size; index++) {
    let b = document.createElement("b");
    b.innerText = '_';
    b.style.backgroundColor = getNextTextSection(formatedContent);
    document.getElementById("idInCom").appendChild(b);
  }

  size = parseInt(getNextTextSection(formatedContent));

  for (let index = 0; index < size; index++) {
    let b = document.createElement("div");
    b.innerText = (getNextTextSection(formatedContent)) + " (" + getNextTextSection(formatedContent) + ")";
    document.getElementById("traits").appendChild(b);
  }

  let strDateCreation = getNextTextSection(formatedContent);
  document.getElementById("dateCreation").innerText = strDateCreation;
  document.getElementById("dateCreationInMind").innerText = getNextTextSection(formatedContent);

  let strDateDisappearence = getNextTextSection(formatedContent);
  document.getElementById("dateDisappearence").innerText = strDateDisappearence;
  document.getElementById("dateDisappearenceInMind").innerText = getNextTextSection(formatedContent);
  outputAge(initialAge, strDateCreation, strDateDisappearence !== "!!!", strDateDisappearence);

  document.getElementById("country").innerText = getNextTextSection(formatedContent);

  document.getElementById("parents").innerText = getNextTextSection(formatedContent);
  document.getElementById("parents").innerText += getNextTextSection(formatedContent);

  size = parseInt(getNextTextSection(formatedContent));

  for (let index = 0; index < size; index++) {
    let b = document.createElement("div");
    b.innerText = getNextTextSection(formatedContent);
    document.getElementById("intrestings").appendChild(b);
  }

  document.getElementById("work").innerText = getNextTextSection(formatedContent);
  document.getElementById("currency").innerText = "#" + parseInt(getNextTextSection(formatedContent))
    + " (~" + parseInt(getNextTextSection(formatedContent))
    + "S) from " + "#" + parseInt(getNextTextSection(formatedContent))
    + " (~" + parseInt(getNextTextSection(formatedContent)) + "S)";

  // Parse story
  size = parseInt(getNextTextSection(formatedContent));

  for (let i = 0; i < size; i++) {
    console.log(i);
    let div = document.createElement("p");
    let concatStr = "";
    if (getTextSection(formatedContent).lastIndexOf("\\") === -1) {
      do {
        console.log(readIndex);
        let str = getNextTextSection(formatedContent);
        str = str.replace("[", "<i>[");
        str = str.replace("]", "]</i>");
        concatStr += str;
      } while (getTextSection(formatedContent).lastIndexOf("\\") === -1);
    }
    let str = getNextTextSection(formatedContent);
    str = str.replace("[", "<i>[");
    str = str.replace("]", "]</i>");
    str = str.replace(";", "<br>");

    str = str.replace("\\", " ");
    concatStr += str;

    div.innerHTML = concatStr;

    document.getElementById("stories").appendChild(div);
  }

  size = parseInt(getNextTextSection(formatedContent));

  for (let i = 0; i < size; i++) {
    let img = document.createElement("img");
    let path = getNextTextSection(formatedContent);
    if (path === "%") {
      img.src = getNextTextSection(formatedContent);
      img.alt = "author " + getNextTextSection(formatedContent);
    }
    else
      img.src = path

    document.getElementById("gallery").appendChild(img);

  }
}


outputOCData();


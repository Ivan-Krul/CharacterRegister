function getCountToRoot() {
  path = window.location.pathname;

  slashCount = (path.match(/\//g) || []).length;
  splitedStr = path.split("CharacterRegister")[0];
  slashCountDomain = (splitedStr.match(/\//g) || []).length;
  resCount = slashCount - slashCountDomain - 1;

  return resCount;
}

async function fetchFile(filePath) {
  return fetch(getCountToRoot() !== 0 ? "../" + filePath : filePath)
    .then(response => response.text())
    .catch(error => {
      console.error('Error fetching "+filePath+":', error);
      return '';
    });
}

function outputAge(initialAge, strDateCreation, strDateDisappearence) {
  const today = new Date();
  if (strDateDisappearence !== "!!!\r") {
    console.log("disappeared at " + strDateDisappearence);
    document.getElementById("header").innerText += " (Disappeared)";

    let diffd = today - new Date(strDateDisappearence);
    let diffc = today - new Date(strDateCreation);

    document.getElementById("age").innerText = initialAge + parseInt(diffc / 1000 / 60 / 60 / 24 / 365.24) - parseInt(diffd / 1000 / 60 / 60 / 24 / 365.24);
  }
  else {
    let diffc = today - new Date(strDateCreation);

    document.getElementById("age").innerText = initialAge + parseInt(diffc / 1000 / 60 / 60 / 24 / 365.24);
  }
}

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

  let readIndex = 0;
  document.title = ocName + " in Character Register";
  document.getElementById("header").innerText = ocName;
  document.getElementById("pfp").src = formatedContent[readIndex++];
  document.getElementById("bioClass").innerText = formatedContent[readIndex++];
  let initialAge = parseInt(formatedContent[readIndex++]);
  document.getElementById("sex").innerText = formatedContent[readIndex++];

  let size = parseInt(formatedContent[readIndex++]);

  for (let index = 0; index < size; index++) {
    let b = document.createElement("b");
    b.innerText = '_';
    b.style.backgroundColor = formatedContent[readIndex++];
    document.getElementById("idInCom").appendChild(b);
  }

  size = parseInt(formatedContent[readIndex++]);

  for (let index = 0; index < size; index++) {
    let b = document.createElement("div");
    b.innerText = (formatedContent[readIndex++]).split('\r')[0] + " (" + formatedContent[readIndex++].split('\r')[0] + ")";
    document.getElementById("traits").appendChild(b);
  }

  let strDateCreation = formatedContent[readIndex++];
  document.getElementById("dateCreation").innerText = strDateCreation;
  document.getElementById("dateCreationInMind").innerText = formatedContent[readIndex++];

  let strDateDisappearence = formatedContent[readIndex++]
  document.getElementById("dateDisappearence").innerText = strDateDisappearence;
  document.getElementById("dateDisappearenceInMind").innerText = formatedContent[readIndex++];
  outputAge(initialAge, strDateCreation, strDateDisappearence);

  document.getElementById("country").innerText = formatedContent[readIndex++];

  document.getElementById("parents").innerText = formatedContent[readIndex++];
  document.getElementById("parents").innerText += formatedContent[readIndex++];

  size = parseInt(formatedContent[readIndex++]);

  for (let index = 0; index < size; index++) {
    let b = document.createElement("div");
    b.innerText = formatedContent[readIndex++].split('\r')[0];
    document.getElementById("intrestings").appendChild(b);
  }

  document.getElementById("work").innerText = formatedContent[readIndex++];
  document.getElementById("currency").innerText = "#" + parseInt(formatedContent[readIndex++]) + " (~" + parseInt(formatedContent[readIndex++]) + "S) from " + "#" + parseInt(formatedContent[readIndex++]) + " (~" + parseInt(formatedContent[readIndex++]) + "S)";

  // Parse story
  size = parseInt(formatedContent[readIndex++]);

  for (let i = 0; i < size; i++) {
    console.log(i);
    let div = document.createElement("p");
    let concatStr = "";
    if (formatedContent[readIndex].lastIndexOf("\\") === -1) {
      do {
        let str = formatedContent[readIndex++];
        str = str.replace("[", "<i>[");
        str = str.replace("]", "]</i>");
        concatStr += str;
      } while (formatedContent[readIndex].lastIndexOf("\\") === -1);
    }
    let str = formatedContent[readIndex++];
    str = str.replace("[", "<i>[");
    str = str.replace("]", "]</i>");
    str = str.replace("\\", " ");
    concatStr += str;

    div.innerHTML = concatStr;

    document.getElementById("stories").appendChild(div);
  }

  size = parseInt(formatedContent[readIndex++]);
  
  for(let i = 0; i < size; i ++){
    let img = document.createElement("img");
    let path = formatedContent[readIndex++];
    if(path === "%\r"){
      img.src = formatedContent[readIndex++];
      img.alt = "author " + formatedContent[readIndex++];
    }
    else
      img.src = path

      document.getElementById("gallery").appendChild(img);

  }
}


gatherOCData();


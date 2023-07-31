function getCountToRoot() {
  path = window.location.pathname;

  slashCount = (path.match(/\//g) || []).length;
  splitedStr = path.split("CharacterRegister")[0];
  slashCountDomain = (splitedStr.match(/\//g) || []).length;
  resCount = slashCount - slashCountDomain - 1;

  return resCount;
}

async function fetchFile(filePath) {
  return fetch(getCountToRoot() !== 0 ? "../"+filePath : filePath)
    .then(response => response.text())
    .catch(error => {
      console.error('Error fetching "+filePath+":', error);
      return '';
    });
}

function generateLinks(list){
  let tag = document.getElementById("linkList");

  for(let index = 0; index < list.length; index++){
    let element = list[index];
    if(element === "")
      continue;
    
      let tagA = document.createElement("a");
      tagA.href = getCountToRoot() !== 0 ? "../pages/oc.html?oc=" + element : "pages/oc.html?oc=" + element;
      tagA.innerText = "OC: " +element;
      let tagLi = document.createElement("li");
      tagLi.appendChild(tagA);
      tag.appendChild(tagLi);
  }
} 

async function gatherOCs(){
  let content = await fetchFile("list/characters.txt");
  let formatedContent = content.split('\n');
  generateLinks(formatedContent);
}

gatherOCs();



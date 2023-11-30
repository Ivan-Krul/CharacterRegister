export async function fetchFile(filePath) {
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

export function getCountToRoot() {
  let path = window.location.pathname;

  let slashCount = (path.match(/\//g) || []).length;
  let splitedStr = path.split("CharacterRegister")[0];
  let slashCountDomain = (splitedStr.match(/\//g) || []).length;
  let resCount = slashCount - slashCountDomain - 1;

  return resCount;
}

export function makeLinkIndependent(link) {
  if(getCountToRoot() === 0)
    return link;
  for(let i = 0; i < getCountToRoot(); i++) {
    let bufL = link;
    link = "../" + bufL;
  }
  return link;
}

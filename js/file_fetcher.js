export async function fetchFile(filePath) {
  return fetch(makeLinkIndependent(filePath))
    .then(response => response.text())
    .catch(error => {
      console.error('*Error fetching ' + filePath + ':', error);
      throw '*Error fetching ' + filePath + ':', error;
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

export function getURLParams() {
  return new URLSearchParams(window.location.search);
}

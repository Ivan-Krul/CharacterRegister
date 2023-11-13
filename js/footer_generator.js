// Function to fetch the external footer template

function getCountToRoot() {
  let path = window.location.pathname;

  let slashCount = (path.match(/\//g) || []).length;
  let splitedStr = path.split("CharacterRegister")[0];
  let slashCountDomain = (splitedStr.match(/\//g) || []).length;
  let resCount = slashCount - slashCountDomain - 1;

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

function fetchFile(filePath) {
  filePath = makeLinkIndependent(filePath);
  return fetch(filePath)
    .then(response => response.text())
    .catch(error => {
      console.error('Error fetching ' + filePath + ':', error);
      return '';
    });
}

// Function to assemble the external footer into the webpage
function assembleFooter() {
  fetchFile("pages/footer_template.html")
    .then(footerTemplate => {
      const footerElement = document.getElementById('externalFooter');
      footerElement.innerHTML = footerTemplate;
    });
}

// Call the function to assemble the footer when the page has loaded
document.addEventListener('DOMContentLoaded', assembleFooter);

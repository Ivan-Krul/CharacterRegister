// Function to fetch the external footer template

function getCountToRoot() {
  let path = window.location.pathname;

  const slashCount = (path.match(/\//g) || []).length;
  const splitedStr = path.split("CharacterRegister")[0];
  const slashCountDomain = (splitedStr.match(/\//g) || []).length;
  const resCount = slashCount - slashCountDomain - 1;

  return resCount;
}

console.log(getCountToRoot());

function fetchFooterTemplate() {
  return fetch(getCountToRoot() === 0? './pages/footer_template.html':'./footer_template.html') // Change 'footer_template.html' to the correct path of your external footer file
    .then(response => response.text())
    .catch(error => {
      console.error('Error fetching footer template:', error);
      return '';
    });
}

// Function to assemble the external footer into the webpage
function assembleFooter() {
  fetchFooterTemplate()
    .then(footerTemplate => {
      const footerElement = document.getElementById('externalFooter');
      footerElement.innerHTML = footerTemplate;
    });
}

// Call the function to assemble the footer when the page has loaded
document.addEventListener('DOMContentLoaded', assembleFooter);

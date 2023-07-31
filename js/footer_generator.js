// Function to fetch the external footer template

function getCountToRoot() {
  let path = window.location.pathname;

  let slashCount = (path.match(/\//g) || []).length;
  let splitedStr = path.split("CharacterRegister")[0];
  let slashCountDomain = (splitedStr.match(/\//g) || []).length;
  let resCount = slashCount - slashCountDomain - 1;

  return resCount;
}

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

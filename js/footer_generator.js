import * as fileFetcher from "./file_fetcher.js";

// Function to assemble the external footer into the webpage
async function assembleFooter() {
  let doc = await fileFetcher.fetchFile("pages/footer_template.html");
  const footerElement = document.getElementById('externalFooter');
  footerElement.innerHTML = doc;
}

assembleFooter();

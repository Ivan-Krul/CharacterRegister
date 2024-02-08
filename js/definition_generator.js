import * as fileFetcher from "./file_fetcher.js";
import * as videoException from "./video_exception.js";

async function outputArticle() {
  const urlParams = new URLSearchParams(window.location.search);
  const definition = urlParams.get('def');

  document.getElementById("header").innerText = "Definition of: " + definition;

  try {
    let article = await fileFetcher.fetchFile("list/definitions/" + definition + ".html");

    article = article.replaceAll("%(imgdir)%", fileFetcher.makeLinkIndependent("image/DefinitionPool/"));

    
    document.getElementById("set").innerHTML = article;
  }
  catch (error) {
    document.getElementById("set").appendChild(await videoException.getExceptionNode(error));
  }
}

outputArticle();

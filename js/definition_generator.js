import * as fileFetcher from "./file_fetcher.js";

async function outputArticle() {
  const urlParams = new URLSearchParams(window.location.search);
  const definition = urlParams.get('def');

  try {
    let article = await fileFetcher.fetchFile("list/definitions/" + definition + ".html");

    article = article.replaceAll("%(imgdir)%", makeLinkIndependent("image/DefinitionPool/"));

    document.getElementById("header").innerText = "Definition of: " + definition;
    document.getElementById("set").innerHTML = article;
  }
  catch (error) {
    if (Math.random() < 0.25)
    document.getElementById("set").innerHTML = error + "<br/><video src=\"../resource/Meet_the_Spy.mov\" autoplay controls style=\"max-width: 50vw; max-height: 50vh\"></video>";
    else if (Math.random() < 0.33)
      document.getElementById("set").innerHTML = error + "<br/><video src=\"../resource/knife style.mp4\" autoplay controls style=\"max-width: 50vw; max-height: 50vh\"></video>";
    else if (Math.random() < 0.5)
      document.getElementById("set").innerHTML = error + "<br/><video src=\"../resource/temple issue.mp4\" autoplay controls style=\"max-width: 50vw; max-height: 50vh\"></video>";
    else  
      document.getElementById("set").innerHTML = error + "<br/><video src=\"../resource/wrecked.mp4\" autoplay controls style=\"max-width: 50vw; max-height: 50vh\"></video>";
  }
}

outputArticle();

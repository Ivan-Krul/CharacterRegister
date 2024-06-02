import * as fileFetcher from "./file_fetcher.js";

export async function getExceptionNode(errorMessage) {
  console.error(errorMessage);

  let node = document.createElement("div");

  let list = (await fileFetcher.fetchFile("resource/rand_handler.txt")).split("\n");

  let choosedElement = Math.floor(list.length * Math.random());

  node.innerHTML = errorMessage + "<br/><video src=\""+fileFetcher.makeLinkIndependent("resource/"+list[choosedElement])+"\" autoplay controls style=\"max-width: 50vw; max-height: 50vh\"></video>";

  return node;
}

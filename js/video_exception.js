import * as fileFetcher from "./file_fetcher.js";

export async function getExceptionNode(errorMessage) {
  console.error(errorMessage);

  let node = document.createElement("div");

  let list = (await fileFetcher.fetchFile("resource/rand_handler.txt")).split("\n");

  let choosedElement = Math.floor(list.length * Math.random());

  let noded = fileFetcher.makeLinkIndependent("resource/"+list[choosedElement]);
  if(noded.indexOf(".gif") !== -1)
    node.innerHTML = `${errorMessage}<br/><img src="${noded}" style="max-width: 50vw; max-height: 50vh">`;

  return node;
}

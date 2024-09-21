import * as fileFetcher from "./file_fetcher.js";

let response = false;
try {
  const result = await fetch("../resource/reserved/debug_key", { method: "HEAD" });
  response = result.ok ? true : false;
} catch (e) {
  response = false;
}

export function getContentLink() {
  return response ? fileFetcher.makeLinkIndependent("../PostStorage/") : "https://raw.githubusercontent.com/Ivan-Krul/PostStorage/main/";
}

export function fetchPartitionList() {
  if(response) {
    console.log("internally");
    return fileFetcher.fetchFile("../PostStorage/partitions.txt")
  }
  else {
    console.log("externally");
    return fetch("https://raw.githubusercontent.com/Ivan-Krul/PostStorage/main/partitions.txt").then(resp => resp.text());
  }
}

export function fetchPost(filename) {
  if(response) {
    console.log("internally");
    return fileFetcher.fetchFile(`../PostStorage/posts/${filename}`);
  }
  else {
    console.log("externally");
    return fetch(`https://raw.githubusercontent.com/Ivan-Krul/PostStorage/main/posts/${filename}`).then(resp => resp.text());
  }
}

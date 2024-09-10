import * as fileFetcher from "./file_fetcher.js";

var response = false;
try {
  response = await fetch("../resource/reserved/debug_key", { method: "HEAD" }).then(true).catch(false);
}
catch (e) {
  response = false;
}

export function fetchPartitionList() {
  if(response) {
    console.log("internally");
    return fileFetcher.fetchFile("posts/partitions.txt")
  }
  else {
    console.log("externally");
    return fetch("https://raw.githubusercontent.com/Ivan-Krul/PostStorage/main/partitions.txt").then(resp => resp.text());
  }
}

export function fetchPost(filename) {
  if(response) {
    console.log("internally");
    return fileFetcher.fetchFile(`posts/${filename}`);
  }
  else {
    console.log("externally");
    return fetch(`https://raw.githubusercontent.com/Ivan-Krul/PostStorage/main/posts/${filename}`).then(resp => resp.text());
  }
}

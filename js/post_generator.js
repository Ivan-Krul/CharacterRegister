import * as fileFetcher from "./file_fetcher.js";
import * as postParser from "./post_parser.js";

export function generateHTMLPost(content = "") {
  const posts = document.getElementById("posts");

  const postPartition = document.createElement("div");
  postPartition.innerHTML = content;
  postPartition.innerHTML += "<hr/>\n";
  
  posts.appendChild(postPartition);
}

export function getPostFromPath(index = 0, list_of_links = []) {
  return fetchFile(list_of_links[index]);
}

function divideSingleStringIntoRows(single_string = "") {
  return single_string.split("\n");
}

export function printPostPage(content = "", filename = "") {
  let dateArr = filename.split("~")[0].split("_");
  let date = dateArr[0] + " " + dateArr[1] + " " + dateArr[2];
  let nameOfPostArr = filename.split("~")[1].split("_");
  let nameOfPost = "";
  nameOfPostArr.forEach(element => {
    nameOfPost += element+" ";
  });
  let preFinalContent = "<h1>" + nameOfPost + "</h1>\n";
  preFinalContent += "<div>" + date + "</div>\n";
  preFinalContent += postParser.parseRawPost(content);
  return preFinalContent;
}

export function generatePost(content = "", filename = "") {
  generateHTMLPost(printPostPage(content, filename));
}

export async function generatePostPage(index_page = 0, index_page_size = 10) {
  let links = await fileFetcher.fetchFile("./posts/partitions.txt");
  let linksArr = divideSingleStringIntoRows(links);
  linksArr.splice(linksArr.length - 1, 1);
  
  for(let i = 0; i < index_page_size && (linksArr.length - i - index_page * index_page_size - 1) >= 0; i++) {
    const link = linksArr[linksArr.length - i - index_page * index_page_size - 1];
    const content = await fileFetcher.fetchFile("./posts/" + link);
    console.log(link);
    generatePost(content,link);
  }
}

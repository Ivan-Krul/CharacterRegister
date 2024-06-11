import * as fileFetcher from "./file_fetcher.js";
import * as postParser from "./post_parser.js";

export function generateHTMLPost(content = "") {
  return `<div>${content}</div><hr/>`;
}

export function getPostFromPath(index = 0, list_of_links = []) {
  return fetchFile(list_of_links[index]);
}

export function printPostPage(content = "", filename = "") {
  let dateArr = filename.split("_");
  let date = dateArr[0] + " " + dateArr[1] + " " + dateArr[2];
  
  let parsedText = postParser.parseRawPost(content);
  let parsedTitle = postParser.parseRawTitle(content);
  return `<h1>${parsedTitle}</h1><div>${date}</div>${parsedText}`;
}

export function generatePost(content = "", filename = "") {
  return generateHTMLPost(printPostPage(content, filename));
}

export async function generatePostPage(index_page = 0, index_page_size = 10) {
  let links = await fileFetcher.fetchFile("posts/partitions.txt");
  let linksArr = links.split("\n");
  linksArr.splice(linksArr.length - 1, 1);
  
  let res = "";

  for(let i = 0; i < index_page_size && (linksArr.length - i - index_page * index_page_size - 1) >= 0; i++) {
    const link = linksArr[linksArr.length - i - index_page * index_page_size - 1];
    const content = await fileFetcher.fetchFile("posts/" + link);
    console.log(link);
    res += generatePost(content,link);
  }
  return res;
}

import {assemble} from "./base_generator.js";
import * as fileFetcher from "./file_fetcher.js";
import * as postGenerator from "./post_generator.js";
import * as videoException from "./video_exception.js";
import * as postFetcher from "./post_fetcher.js";

await assemble();

(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const post = urlParams.get('post');

  if(urlParams.get("windowed") !== null)
    document.getElementById("back").style.display="none";

  if (post !== null) {
    if (post === "") {
      document.getElementById("post").innerHTML = "[allocated]<br/><video src=\"../resource/waw.mov\" autoplay controls></video>";
      return;
    }
    let page = "";
    try {
      if (post.indexOf(".") !== -1) {
        let file = await postFetcher.fetchPost(post);
        page = postGenerator.printPostPage(file, post);
        let resPage = page;//.replaceAll("./", "./../");
        document.getElementById("post").innerHTML = resPage;
      }
      else if (post.match(/\d+/g) !== null) {
        document.getElementById("post").innerHTML = await postGenerator.generatePostPage(0, parseInt(post));
      }
      else throw "undefined url \"post\" argument";
    }
    catch (error) {
      document.getElementById("post").appendChild(await videoException.getExceptionNode(error));
    }
  }
  else {
    document.getElementById("header").innerText += " Browser";

    let res = `<dir><a href="${fileFetcher.makeLinkIndependent("resource/post_parser_constructor.html")}">Post Parser constructor</a></dir>`;

    let partitions = await postFetcher.fetchPartitionList();
    
    let partArr = partitions.split("\n");

    for(let i = 0; i < partArr.length; i++) {
      res += `<div><a href="post_scrapper.html?post=${partArr[i]}">${i}: ${partArr[i]}</a></div>`;
    }

    document.getElementById("post").innerHTML = res;
  }
})();
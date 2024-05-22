import "./base_generator.js";
import * as fileFetcher from "../js/file_fetcher.js";
import * as postGenerator from "./../js/post_generator.js";
import * as videoException from "./../js/video_exception.js";

(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const post = urlParams.get('post');

    if (post !== null) {
        if (post !== "") {
            let page = "";
            try {
                let file = await fileFetcher.fetchFile("posts/" + post);
                page = postGenerator.printPostPage(file, post);
                let resPage = page;//.replaceAll("./", "./../");
                document.getElementById("post").innerHTML = resPage;
            }
            catch (error) {
                document.getElementById("post").appendChild(await videoException.getExceptionNode(error));
            }
        }
        else {
            document.getElementById("post").innerHTML = "[allocated]<br/><video src=\"../resource/waw.mov\" autoplay controls></video>";
        }
    }
    else {
        document.getElementById("header").innerText += " Browser";
        let partitions = await fileFetcher.fetchFile("posts/partitions.txt");
        let partitionsArray = partitions.split("\n");

        partitionsArray.forEach(element => {
            let el = document.createElement("a");
            el.href = "post_scrapper.html?post=" + element;
            el.innerText = element;
            let span = document.createElement("div");
            span.appendChild(el);
            //span.style.margin = "20px";
            document.getElementById("post").appendChild(span);
        });
    }
})();
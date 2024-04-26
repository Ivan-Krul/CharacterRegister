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
                if (page.split("Eek").length === 1) {
                    let resPage = page.replaceAll("./", "./../");

                    document.getElementById("post").innerHTML = resPage;
                }
                else
                    throw "[Eek]";
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
            el.innerText = "post_scrapper.html?post=" + element;
            document.getElementById("post").appendChild(el).appendChild(document.createElement("br"));
        });
    }
})();
import "./base_generator.js";
import * as fileFetcher from "./file_fetcher.js";
import * as videoException from "./video_exception.js";

async function outputMarathonPost() {
    const urlParams = fileFetcher.getURLParams();
    const begin = urlParams.get('begin');

    try {
        const json = JSON.parse(await fileFetcher.fetchFile(`image/Marathon/${begin}/metadata.json`));

        document.getElementById("goal").innerText = json.goal;
        document.getElementById("status").innerText = json.status;
        document.getElementById("startingDate").innerText = json.startingDate;
        document.getElementById("endingDate").innerText = json.endingDate;

        let mainClam = document.getElementById("historyMarathon");

        let sum = 0;

        for (let i = 0; i < json.list.length; i++) {
            let mainDiv = document.createElement("div");
            let label = document.createElement("div");
            let img = document.createElement("img");

            sum += json.list[i];
            img.src = fileFetcher.makeLinkIndependent(`image/Marathon/${begin}/${i + 1}.${json.fileFormat}`)
            label.innerText = `Day ${sum}`;

            mainDiv.appendChild(label);
            mainDiv.appendChild(img);
            mainClam.appendChild(mainDiv);
        }
    }
    catch (e) {
        document.getElementById("historyMarathon").appendChild(await videoException.getExceptionNode(e));
    }
}

outputMarathonPost();

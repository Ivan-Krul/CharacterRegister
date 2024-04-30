import "./base_generator.js";
import * as postParser from "./post_parser.js";
import * as fileFetcher from "./file_fetcher.js";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function outputDefinition() {
    let def = fileFetcher.getURLParams().get("def");


    document.getElementById("page").innerHTML = postParser.parseRawPost(await fileFetcher.fetchFile(`list/definitions/${def}.crd`));
    document.getElementById("header").innerText = capitalizeFirstLetter(def);
}

outputDefinition();

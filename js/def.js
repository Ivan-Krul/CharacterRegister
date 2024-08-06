import {assemble} from "./base_generator.js";
import * as postParser from "./post_parser.js";
import * as fileFetcher from "./file_fetcher.js";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function outputDefinition() {
    let def = fileFetcher.getURLParams().get("def");

    let page = postParser.parseRawPost(await fileFetcher.fetchFile(`list/definitions/${def}.crd`));
    document.getElementById("page").innerHTML = page;
    document.getElementById("header").innerText = capitalizeFirstLetter(def);
}

await assemble();
await outputDefinition();

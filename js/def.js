import {assemble} from "./base_generator.js";
import * as postParser from "../../PostViewer/post_parser.js";
import * as fileFetcher from "./file_fetcher.js";

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function outputDefinition(def) {
  document.getElementById("actual_container").style.display = "inherit";
  let page = postParser.parseRawPost(await fileFetcher.fetchFile(`list/definitions/${def}.crd`));
  document.getElementById("page").innerHTML = page;
  document.getElementById("header").innerText = capitalizeFirstLetter(def);
}

async function outputDefinitionTable(colomns = 1) {
  document.getElementById("overview_container").style.display = "inherit";
  let defs = await fileFetcher.fetchTextFileLined("list/definitions.txt");
  let res = "";
  
  for(let i = 0; i < defs.length; i++) {
    if(i % colomns == 0) {
      if(i != 0)
        res += `<\tr>`;
      res += `<tr>`;
    }
    
    res += `<td style="border: 5px solid var(--text); padding: 10px; text-align: center;"><a href="./def.html?def=${defs[i]}">${defs[i]}</a></td>`;
  }

  document.getElementById("overview_table").innerHTML = res.replaceAll("<\tr>", "");
  
}

async function doSteering() {
  let def = fileFetcher.getURLParams().get("def");
  if(def) await outputDefinition(def);
  else    await outputDefinitionTable(4);
}

await assemble();
await doSteering();

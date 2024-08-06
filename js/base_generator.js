import * as fileFetcher from "./file_fetcher.js";
import * as sideLinker from "./side_linker.js";
import "./side_handler.js";
import "./dark_theme.js";

export async function assemble() {
  let side = await fileFetcher.fetchFile("pages/side_template.html");

    side = side.replace("./pages/post_scrapper.html",fileFetcher.makeLinkIndependent("./pages/post_scrapper.html"));
    side = side.replace("./pages/commission.html",fileFetcher.makeLinkIndependent("./pages/commission.html"));
    side = side.replace("./index.html",fileFetcher.makeLinkIndependent("./index.html"));

  let doc = await fileFetcher.fetchFile("pages/footer_template.html");
  document.getElementById('sideMenu').innerHTML = `${side}
  <div id="externalFooter">${doc}</div>`;

  await sideLinker.gatherOCs();
  await sideLinker.gatherDefs();
  await sideLinker.gatherEvents();
  await sideLinker.gatherMarathons();
}


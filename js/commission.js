import {assemble} from "./base_generator.js";
import * as fileFetcher from "./file_fetcher.js";

var json = JSON.parse(await fileFetcher.fetchFile("resource/commission_params.json"));

function calcPrice() {
  let res = 1;

  res *= parseFloat(document.getElementById("C_eq").innerText);
  res *= parseFloat(document.getElementById("D_eq").innerText);
  res *= parseFloat(document.getElementById("N_eq").innerText);
  res *= parseFloat(document.getElementById("B_eq").innerText);
  res *= parseFloat(document.getElementById("S_eq").innerText);
  res -= parseFloat(document.getElementById("R_eq").innerText);

  return res * json.global + json.base;
}

function outputPrice() {
  document.getElementById("price_counter").innerText = `${Math.floor(calcPrice())}€ (${calcPrice()})`;
}

function assembleToDetail() {
  if(document.getElementById("count").value === "0") return "";

  if(document.getElementById("line").checked) return "line";
  else if(document.getElementById("paint_line").checked) return "line + paint";
  else if(document.getElementById("shadow_paint_line").checked) return "line + paint + shadow";
  else if(document.getElementById("shadow_line").checked) return "line + shadow";
  else if(document.getElementById("lineless_paint").checked) return "lineless-paint";
  else if(document.getElementById("shadow_lineless_paint").checked) return "lineless-paint + shadow";
  else return "";
}

function assembleBracket() {
  let detail = assembleToDetail();

       if(document.getElementById("blank").checked)    return `${detail}`;
  else if(document.getElementById("abstract").checked) return `${detail}${detail.length !== 0 ? " + " : ""}abst`;
  else if(document.getElementById("actual").checked)   return `${detail}${detail.length !== 0 ? " + " : ""}actual`;
  else if(document.getElementById("photo").checked)    return `${detail}${detail.length !== 0 ? " + " : ""}photo`;
  else if(document.getElementById("detailed").checked) return `${detail}${detail.length !== 0 ? " + " : ""}detailed`;
}

function assemblePath() {
  let brackets = assembleBracket();
  let str = (document.getElementById("pixel-art").checked)
    ? `pixel-art (${brackets})`
    : `(${brackets})`; 

  if(document.getElementById("count").value === "0") return `empty ${str}`;
  else return `${str}`;
}

function checkDetail() {
  document.getElementById("placeholder").src = fileFetcher.makeLinkIndependent(`image/CommissionPlaceholders/Placeholder for commission page ${assemblePath()}.png`);
  updateEquation();
  outputPrice()
}

function checkControls() {
  let disPart = (document.getElementById("count").value === "0");
  document.getElementById("head").disabled = disPart;
  document.getElementById("half").disabled = disPart;
  document.getElementById("full").disabled = disPart;
  document.getElementById("blank").disabled = disPart;
  document.getElementById("paint_line").disabled = disPart;
  document.getElementById("shadow_line").disabled = disPart;
  document.getElementById("lineless_paint").disabled = disPart;
  document.getElementById("shadow_lineless_paint").disabled = disPart;

  let disPixel = (document.getElementById("pixel-art").checked);
  document.getElementById("lineless_paint").disabled = disPixel;
  document.getElementById("shadow_lineless_paint").disabled = disPixel;
  document.getElementById("photo").disabled = disPixel;
  
  let disBg = (document.getElementById("detailed").checked || document.getElementById("photo").checked);
  document.getElementById("line").disabled = disPart || disBg;
  document.getElementById("shadow_line").disabled = disPixel || disBg;
}

function checkStyle() {
  if(document.getElementById("pixel-art").checked) {
    document.getElementById("placeholder").style.imageRendering = "pixelated";
  }
  else {
    document.getElementById("placeholder").style.imageRendering = "auto";
  }
  checkControls();
  checkDetail()
}

function updateEquation() {
  //C_eq
  if(document.getElementById("count").value !== "0") {
         if(document.getElementById("head").checked) document.getElementById("C_eq").innerText = json.crop.head;
    else if(document.getElementById("half").checked) document.getElementById("C_eq").innerText = json.crop.half;
    else                                             document.getElementById("C_eq").innerText = json.crop.full;
  } else document.getElementById("C_eq").innerText = 1;

  //D_eq
       if(document.getElementById("line").checked)                  document.getElementById("D_eq").innerText = json.detail["line"];
  else if(document.getElementById("paint_line").checked)            document.getElementById("D_eq").innerText = json.detail["line+color"];
  else if(document.getElementById("shadow_paint_line").checked)     document.getElementById("D_eq").innerText = json.detail["line+color+effect"];
  
  if(document.getElementById("pixel-art").checked === false) {
         if(document.getElementById("shadow_line").checked)           document.getElementById("D_eq").innerText = json.detail["line+effect"];
    else if(document.getElementById("lineless_paint").checked)        document.getElementById("D_eq").innerText = json.detail["lineless-color"];
    else if(document.getElementById("shadow_lineless_paint").checked) document.getElementById("D_eq").innerText = json.detail["lineless-color+effect"];
  }

  //N_eq
       if(document.getElementById("count").value === "0") document.getElementById("N_eq").innerText = json.count["0"];
  else if(document.getElementById("count").value === "1") document.getElementById("N_eq").innerText = json.count["1"];
  else                                                    document.getElementById("N_eq").innerText = json.count["2+"] * document.getElementById("count").value +json.count["1"];

  //B_eq
       if(document.getElementById("blank").checked)    document.getElementById("B_eq").innerText = json.background.blank;
  else if(document.getElementById("abstract").checked) document.getElementById("B_eq").innerText = json.background.abstract;
  else if(document.getElementById("actual").checked)   document.getElementById("B_eq").innerText = json.background.actual;
  else if(document.getElementById("photo").checked)    document.getElementById("B_eq").innerText = json.background.photo;
  else if(document.getElementById("detailed").checked) document.getElementById("B_eq").innerText = json.background.detailed;

  //S_eq
       if(document.getElementById("original").checked)  document.getElementById("S_eq").innerText = json.style["original"];
  else if(document.getElementById("pixel-art").checked) document.getElementById("S_eq").innerText = json.style["pixel-art"];
  else                                                  document.getElementById("S_eq").innerText = json.style["others"];

  //R_eq
  document.getElementById("R_eq").innerText = (document.getElementById("ref").checked) ? json.base : 0;

  //G_eq & A_eq
  document.getElementById("G_eq").innerText = json.global;
  document.getElementById("A_eq").innerText = json.base;
}

function checkCrop() {
  document.getElementById("placeholder").classList.remove("full_crop", "half_crop", "head_crop");
  if(document.getElementById("head").checked) {
    document.getElementById("placeholder").classList.add("head_crop");
  }
  else if(document.getElementById("half").checked) {
    document.getElementById("placeholder").classList.add("half_crop");
  }
  else document.getElementById("placeholder").classList.add("full_crop");
  checkStyle();  
}

async function loadJson() {
  document.getElementById("head_cost").innerText = json.crop.head;
  document.getElementById("half_cost").innerText = json.crop.half;
  document.getElementById("full_cost").innerText = json.crop.full;

  document.getElementById("line_cost").innerText =                  json.detail["line"];
  document.getElementById("paint_line_cost").innerText =            json.detail["line+color"];
  document.getElementById("shadow_paint_line_cost").innerText =     json.detail["line+color+effect"];
  document.getElementById("shadow_line_cost").innerText =           json.detail["line+effect"];
  document.getElementById("lineless_paint_cost").innerText =        json.detail["lineless-color"];
  document.getElementById("shadow_lineless_paint_cost").innerText = json.detail["lineless-color+effect"];

  document.getElementById("0_count_cost").innerText =  json.count["0"];
  document.getElementById("1_count_cost").innerText =  json.count["1"];
  document.getElementById("2+_count_cost").innerText = json.count["2+"];

  document.getElementById("blank_cost").innerText =    json.background.blank;
  document.getElementById("abstract_cost").innerText = json.background.abstract;
  document.getElementById("actual_cost").innerText =   json.background.actual;
  document.getElementById("photo_cost").innerText =   json.background.photo;
  document.getElementById("detailed_cost").innerText = json.background.detailed;

  document.getElementById("original_cost").innerText = json.style["original"];
  document.getElementById("pixel-art_cost").innerText =   json.style["pixel-art"];
  document.getElementById("others_cost").innerText = json.style["others"];

  document.getElementById("ref_cost").innerText = json.base;

  document.getElementById("global_cost").innerText = json.global;
  document.getElementById("base_cost").innerText =   json.base;
}

function copyStatsToClipboard() {
  navigator.clipboard.writeText(`Commission:(${(new Date()).toUTCString()}):C(${
    document.getElementById("head").checked ? 0 : (document.getElementById("head").checked ? 1 : 2)
  })D:(${
    document.getElementById("line").checked 
     ? 0
     : (document.getElementById("paint_line").checked
       ? 1
       : (document.getElementById("shadow_paint_line").checked
         ? 2
         : (document.getElementById("shadow_line").checked
           ? 3
           : (document.getElementById("lineless_paint").checked
             ? 4
             : 5
            )
          )
        )
      )
  })N:(${document.getElementById("count").value})B:(${
    document.getElementById("blank").checked 
    ? 0
    : (
      document.getElementById("abstract").checked
      ? 1
      : (
        document.getElementById("actual").checked
        ? 2
        : (
          document.getElementById("photo").checked
          ? 3
          : 4
        )
      )
    )
  })S:(${
    document.getElementById("original").checked
    ? 0
    : (
      document.getElementById("pixel-art").checked
      ? 1
      : 2
    )
  })R:(${document.getElementById("ref").checked})P:(${calcPrice()})`);
  alert("copied to clipboard");
}

async function main() {
  await assemble();

  await loadJson();

  document.getElementById("placeholder").src = fileFetcher.makeLinkIndependent("image/CommissionPlaceholders/Placeholder for commission page(line).png");

  document.getElementById("head").onclick = checkCrop;
  document.getElementById("half").onclick = checkCrop;
  document.getElementById("full").onclick = checkCrop;

  document.getElementById("line").onclick = checkStyle;
  document.getElementById("paint_line").onclick = checkStyle;
  document.getElementById("shadow_paint_line").onclick = checkStyle;
  document.getElementById("shadow_line").onclick = checkStyle;
  document.getElementById("lineless_paint").onclick = checkStyle;
  document.getElementById("shadow_lineless_paint").onclick = checkStyle;

  document.getElementById("count").onchange = checkStyle;

  document.getElementById("blank").onclick = checkStyle;
  document.getElementById("abstract").onclick = checkStyle;
  document.getElementById("actual").onclick = checkStyle;
  document.getElementById("photo").onclick = checkStyle;
  document.getElementById("detailed").onclick = checkStyle;

  document.getElementById("original").onclick = checkStyle;
  document.getElementById("pixel-art").onclick = checkStyle;
  document.getElementById("others").onclick = checkStyle;

  document.getElementById("ref").onclick = checkStyle;

  document.getElementById("copy_stats_to_clipboard").onclick = copyStatsToClipboard;

  checkCrop();
}

main();

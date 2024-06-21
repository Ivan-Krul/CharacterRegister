import "./base_generator.js";
import * as fileFetcher from "./file_fetcher.js";

var json = JSON.parse(await fileFetcher.fetchFile("resource/commission_params.json"));

function calcPrice() {
  let res = 1;

  if(document.getElementById("head").checked) res *= json.crop.head;
else if(document.getElementById("half").checked) res *= json.crop.half;
else                                             res *= json.crop.full;

  if(document.getElementById("line").checked)                  res *= json.detail["line"];
else if(document.getElementById("paint_line").checked)            res *= json.detail["line+color"];
else if(document.getElementById("shadow_paint_line").checked)     res *= json.detail["line+color+effect"];
else if(document.getElementById("shadow_line").checked)           res *= json.detail["line+effect"];
else if(document.getElementById("lineless_paint").checked)        res *= json.detail["lineless-color"];
else if(document.getElementById("shadow_lineless_paint").checked) res *= json.detail["lineless-color+effect"];

  if(document.getElementById("count").value === 0) res *= json.count["0"];
else if(document.getElementById("count").value === 1) res *= json.count["1"];
else                                                  res *= json.count["2+"] * document.getElementById("count").value +json.count["1"];

  if(document.getElementById("blank").checked)    res *= json.background.blank;
else if(document.getElementById("abstract").checked) res *= json.background.abstract;
else if(document.getElementById("actual").checked)   res *= json.background.actual;
else if(document.getElementById("detailed").checked) res *= json.background.detailed;

  if(document.getElementById("original").checked)  res *= json.style["original"];
else if(document.getElementById("pixel-art").checked) res *= json.style["pixel-art"];
else                                                  res *= json.style["others"];

if(document.getElementById("ref").checked) res -= json.base;

  return res * json.global + json.base;
}

function outputPrice() {
  document.getElementById("price_counter").innerText = `${Math.floor(calcPrice())}€ (${calcPrice()})`;
}


function assembleToDetail() {
  if(document.getElementById("line").checked) return "line";
  else if(document.getElementById("paint_line").checked) return "line + paint";
  else if(document.getElementById("shadow_paint_line").checked) return "line + paint + shadow";
  else if(document.getElementById("shadow_line").checked) return "line + shadow";
  else if(document.getElementById("lineless_paint").checked) return "lineless-paint";
  else if(document.getElementById("shadow_lineless_paint").checked) return "lineless-paint + shadow";
  else "";
}

function assembleBracket() {
  let detail = assembleToDetail();

       if(document.getElementById("blank").checked)    return `${detail}`;
  else if(document.getElementById("abstract").checked) return `${detail} + abst`;
  else if(document.getElementById("actual").checked)   return `${detail} + actual`;
  else if(document.getElementById("detailed").checked) return `${detail} + detailed`;
}

function assemblePath() {
  let brackets = assembleBracket();
  if(document.getElementById("pixel-art").checked) return ` pixel-art (${brackets})`;
  else return `(${brackets})`;
}

function checkDetail() {
  document.getElementById("placeholder").src = fileFetcher.makeLinkIndependent(`image/CommissionPlaceholders/Placeholder for commission page${assemblePath()}.png`);
  outputPrice()
}

function checkStyle() {
  if(document.getElementById("pixel-art").checked) {
    document.getElementById("placeholder").style.imageRendering = "pixelated";
  }
  else {
    document.getElementById("placeholder").style.imageRendering = "auto";
  }
  checkDetail()
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
        : 3
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
}

loadJson();

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
document.getElementById("detailed").onclick = checkStyle;

document.getElementById("original").onclick = checkStyle;
document.getElementById("pixel-art").onclick = checkStyle;
document.getElementById("others").onclick = checkStyle;

document.getElementById("ref").onclick = checkStyle;

document.getElementById("copy_stats_to_clipboard").onclick = copyStatsToClipboard;

checkCrop();
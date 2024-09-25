import {assemble} from "./base_generator.js";
import * as fileFetcher from "./file_fetcher.js";

var json = JSON.parse(await fileFetcher.fetchFile("resource/commission_params.json"));

// detailControllerMap
var dcl = {
  "crop": [
    document.getElementById("head"),
    document.getElementById("half"),
    document.getElementById("full")
  ],
  "detail": [
    document.getElementById("line"),
    document.getElementById("paint_line"),
    document.getElementById("shadow_paint_line"),
    document.getElementById("shadow_line"),
    document.getElementById("lineless_paint"),
    document.getElementById("shadow_lineless_paint")
  ],
  "char_count": document.getElementById("count"),
  "background": [
    document.getElementById("blank"),
    document.getElementById("abstract"),
    document.getElementById("actual"),
    document.getElementById("photo"),
    document.getElementById("detailed")
  ],
  "style": [
    document.getElementById("original"),
    document.getElementById("pixel-art"),
    document.getElementById("others")
  ],
  "ref": document.getElementById("ref"),
  "placeholder": document.getElementById("placeholder")
};

//detainEquationMap
var dem = {
  "C": document.getElementById("C_eq"),
  "D": document.getElementById("D_eq"),
  "N": document.getElementById("N_eq"),
  "B": document.getElementById("B_eq"),
  "S": document.getElementById("S_eq"),
  "R": document.getElementById("R_eq")
};

function calcPrice() {
  let res = 1;

  res *= parseFloat(dem.C.innerText);
  res *= parseFloat(dem.D.innerText);
  res *= parseFloat(dem.N.innerText);
  res *= parseFloat(dem.B.innerText);
  res *= parseFloat(dem.S.innerText);
  res -= parseFloat(dem.R.innerText);

  return res * json.global + json.base;
}

function outputPrice() {
  document.getElementById("price_counter").innerText = `${Math.floor(calcPrice())}€ (${calcPrice()})`;
}

function assembleToDetail() {
  if(dcl.char_count.value === "0") return "";

       if(dcl.detail[0].checked) return "line";
  else if(dcl.detail[1].checked) return "line + paint";
  else if(dcl.detail[2].checked) return "line + paint + shadow";
  else if(dcl.detail[3].checked) return "line + shadow";
  else if(dcl.detail[4].checked) return "lineless-paint";
  else if(dcl.detail[5].checked) return "lineless-paint + shadow";
  else return "";
}

function assembleBracket() {
  let detail = assembleToDetail();

       if(dcl.background[0].checked) return `${detail}`;
  else if(dcl.background[1].checked) return `${detail}${detail.length !== 0 ? " + " : ""}abst`;
  else if(dcl.background[2].checked) return `${detail}${detail.length !== 0 ? " + " : ""}actual`;
  else if(dcl.background[3].checked) return `${detail}${detail.length !== 0 ? " + " : ""}photo`;
  else if(dcl.background[4].checked) return `${detail}${detail.length !== 0 ? " + " : ""}detailed`;
}

function assemblePath() {
  let brackets = assembleBracket();
  let str = (dcl.style[1].checked)
    ? `pixel-art (${brackets})`
    : `(${brackets})`; 

  if(dcl.char_count.value === "0") return `empty ${str}`;
  else return `${str}`;
}

function checkDetail() {
  dcl.placeholder.src = fileFetcher.makeLinkIndependent(`image/CommissionPlaceholders/Placeholder for commission page ${assemblePath()}.png`);
  updateEquation();
  outputPrice()
}

function checkControls() {
  let disPart = (dcl.char_count.value === "0");
  dcl.crop[0].disabled = disPart;
  dcl.crop[1].disabled = disPart;
  dcl.crop[2].disabled = disPart;
  dcl.detail[0].disabled = disPart;
  dcl.detail[1].disabled = disPart;
  dcl.detail[2].disabled = disPart;
  dcl.detail[3].disabled = disPart;
  dcl.detail[4].disabled = disPart;

  let disPixel = (dcl.style[1].checked);
  dcl.detail[4].disabled = disPixel;
  dcl.detail[5].disabled = disPixel;
  dcl.background[3].disabled = disPixel;
  
  let disBg = (dcl.background[4].checked || dcl.background[3].checked);
  dcl.detail[0].disabled = disPart || disBg;
  dcl.detail[3].disabled = disPixel || disBg;
}

function checkStyle() {
  if(dcl.style[1].checked) {
    dcl.placeholder.style.imageRendering = "pixelated";
  }
  else {
    dcl.placeholder.style.imageRendering = "auto";
  }
  checkControls();
  checkDetail()
}

function updateEquation() {
  //C_eq
  if(dcl.char_count.value !== "0") {
         if(dcl.crop[0].checked) dem.C.innerText = json.crop.head;
    else if(dcl.crop[1].checked) dem.C.innerText = json.crop.half;
    else                         dem.C.innerText = json.crop.full;
  } else                         dem.C.innerText = 1;

  //D_eq
       if(dcl.detail[0].checked) dem.D.innerText = json.detail["line"];
  else if(dcl.detail[1].checked) dem.D.innerText = json.detail["line+color"];
  else if(dcl.detail[2].checked) dem.D.innerText = json.detail["line+color+effect"];
  
  if(dcl.style[1].checked === false) {
         if(dcl.detail[3].checked) dem.D.innerText = json.detail["line+effect"];
    else if(dcl.detail[4].checked) dem.D.innerText = json.detail["lineless-color"];
    else if(dcl.detail[5].checked) dem.D.innerText = json.detail["lineless-color+effect"];
  }

  //N_eq
       if(dcl.char_count.value === "0") dem.N.innerText = json.count["0"];
  else if(dcl.char_count.value === "1") dem.N.innerText = json.count["1"];
  else                                  dem.N.innerText = json.count["2+"] * dcl.char_count.value +json.count["1"];

  //B_eq
       if(dcl.background[0].checked) dem.B.innerText = json.background.blank;
  else if(dcl.background[1].checked) dem.B.innerText = json.background.abstract;
  else if(dcl.background[2].checked) dem.B.innerText = json.background.actual;
  else if(dcl.background[3].checked) dem.B.innerText = json.background.photo;
  else if(dcl.background[4].checked) dem.B.innerText = json.background.detailed;

  //S_eq
       if(dcl.style[0].checked) dem.S.innerText = json.style["original"];
  else if(dcl.style[1].checked) dem.S.innerText = json.style["pixel-art"];
  else                          dem.S.innerText = json.style["others"];

  //R_eq
  dem.R.innerText = (dcl.ref.checked) ? json.base : 0;

  //G_eq & A_eq
  document.getElementById("G_eq").innerText = json.global;
  document.getElementById("A_eq").innerText = json.base;
}

function checkCrop() {
  dcl.placeholder.classList.remove("full_crop", "half_crop", "head_crop");
  if(dcl.crop[0].checked) {
    dcl.placeholder.classList.add("head_crop");
  }
  else if(dcl.crop[1].checked) {
    dcl.placeholder.classList.add("half_crop");
  }
  else dcl.placeholder.classList.add("full_crop");
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
    dcl.crop[0].checked ? 0 : (dcl.crop[1].checked ? 1 : 2)
  })D:(${
    dcl.detail[0].checked 
     ? 0
     : (dcl.detail[1].checked
       ? 1
       : (dcl.detail[2].checked
         ? 2
         : (dcl.detail[3].checked
           ? 3
           : (dcl.detail[4].checked
             ? 4
             : 5
            )
          )
        )
      )
  })N:(${dcl.char_count.value})B:(${
    dcl.background[0].checked 
    ? 0
    : (
      dcl.background[1].checked
      ? 1
      : (
        dcl.background[2].checked
        ? 2
        : (
          dcl.background[3].checked
          ? 3
          : 4
        )
      )
    )
  })S:(${
    dcl.style[0].checked
    ? 0
    : (
      dcl.style[1].checked
      ? 1
      : 2
    )
  })R:(${dcl.ref.checked})P:(${calcPrice()})`);
  alert("copied to clipboard");
}

async function mainSimple() {
  {
    let res = (C) => {
      let mult = json.detail["line"] * json.count["1"] * json.style["original"] * json.background["blank"];
      return (C * mult - json.base) * json.global + json.base;
    }
    document.getElementById("head_cost_s").innerText = res(json.crop.head);
    document.getElementById("half_cost_s").innerText = res(json.crop.half);
    document.getElementById("full_cost_s").innerText = res(json.crop.full);
  }

  {
    let res = (C) => {
      let mult = ((json.crop.full + json.crop.half)/2) * json.count["1"] * json.style["original"] * json.background["blank"];
      return (mult * C - json.base) * json.global + json.base;
    }
    document.getElementById("paint_cost_s").innerText = res(json.detail["line+color"]);
    document.getElementById("shadow_cost_s").innerText = res(json.detail["line+color+effect"]);
    document.getElementById("llp_cost_s").innerText = res(json.detail["lineless-color"]);
    document.getElementById("llpshadow_cost_s").innerText = res(json.detail["lineless-color+effect"]);
  }

  {
    let res = (C) => {
      let mult = ((json.crop.full + json.crop.half)/2) * json.count["1"] * json.style["original"] * json.detail["line+color+effect"];
      return (mult * C - json.base) * json.global + json.base - parseInt(document.getElementById("shadow_cost_s").innerText);
    }
    document.getElementById("abst_cost_s").innerText = res(json.background["abstract"]);
    document.getElementById("actual_cost_s").innerText = res(json.background["actual"]);
    document.getElementById("photo_cost_s").innerText = res(json.background["photo"]);
    document.getElementById("deltailed_cost_s").innerText = res(json.background["detailed"]);
  }
   
  {
    document.getElementById("pixlart_cost_s").innerText = Math.floor(((((json.crop.full + json.crop.half)/2) * json.count["1"] * json.style["pixel-art"] * json.detail["line+color+effect"] * json.background["actual"]) * json.global + json.base) / ((((json.crop.full + json.crop.half)/2) * json.count["1"] * json.style["original"] * json.detail["line+color+effect"] * json.background["actual"]) * json.global + json.base) * 1000) / 1000;
  }
}

async function mainDetail() {
  await loadJson();

  dcl.placeholder.src = fileFetcher.makeLinkIndependent("image/CommissionPlaceholders/Placeholder for commission page(line).png");

  dcl.crop[0].onclick = checkCrop;
  dcl.crop[1].onclick = checkCrop;
  dcl.crop[2].onclick = checkCrop;

  dcl.detail[0].onclick = checkStyle;
  dcl.detail[1].onclick = checkStyle;
  dcl.detail[2].onclick = checkStyle;
  dcl.detail[3].onclick = checkStyle;
  dcl.detail[4].onclick = checkStyle;
  dcl.detail[5].onclick = checkStyle;

  dcl.char_count.onchange = checkStyle;

  dcl.background[0].onclick = checkStyle;
  dcl.background[1].onclick = checkStyle;
  dcl.background[2].onclick = checkStyle;
  dcl.background[3].onclick = checkStyle;
  dcl.background[4].onclick = checkStyle;

  dcl.style[0].onclick = checkStyle;
  dcl.style[1].onclick = checkStyle;
  dcl.style[2].onclick = checkStyle;

  dcl.ref.onclick = checkStyle;

  document.getElementById("copy_stats_to_clipboard").onclick = copyStatsToClipboard;

  checkCrop();
}

function handleSwitch(event) {
  if(event.target.value === "simple") {
    console.info("simple");
    document.getElementById("simple_pricing_container").style.display = "inherit";
    document.getElementById("detail_pricing_container").style.display = "none";
  }
  else if (event.target.value === "detail") {
    console.info("detail");
    document.getElementById("simple_pricing_container").style.display = "none";
    document.getElementById("detail_pricing_container").style.display = "inherit";
  }
}


await assemble();
document.getElementById("select_pricing_choice").onchange = handleSwitch;
document.getElementById("select_pricing_choice").value = "simple";

await mainSimple();
await mainDetail();


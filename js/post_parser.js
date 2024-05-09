import * as fileFetcher from "./file_fetcher.js";

function replaceAllOccurrences(inputString, substringToReplace, replacementValue) {
  var escapedSubstring = substringToReplace.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  var regex = new RegExp(escapedSubstring, 'g');
  var resultString = inputString.replace(regex, replacementValue);

  return resultString;
}

function getLangTag(str = "") {
  let lang = fileFetcher.getURLParams().get("lang");

  if(lang === null) {
    lang = "en";
    console.warn("parameter for lang in URI wasn't defined, and so lang='en'");
  }

  const begStr = `#->${lang}#`;
  const endStr = `#<-${lang}#`;

  let indxBeg = str.indexOf(begStr);
  let indxEnd = str.indexOf(endStr);

  if(indxBeg === -1) {
    console.warn("It's unsupported for translated text, assumption it's deprecated post");
    return str;
  }
  if(indxEnd === -1) throw `Bracket for language ${lang} wasn't closed`;
  
  return str.substring(indxBeg + begStr.length, indxEnd);
}

export function parseRawPost(str = "") {
  let strCom = str.replaceAll("\r", "");
  strCom = getLangTag(strCom);

  let res = "";

  res = replaceAllOccurrences(strCom, "!!!! ", "<h1>");
  res = replaceAllOccurrences(res, " !!!!", "</h1>");

  res = replaceAllOccurrences(res, "i- ", `<img src=\"${fileFetcher.makeLinkIndependent("image/")}`);
  res = replaceAllOccurrences(res, " -i", "\">");

  res = replaceAllOccurrences(res, "\" ", "<div>");
  res = replaceAllOccurrences(res, " \"", "</div>");

  res = replaceAllOccurrences(res, "[ ", "<i>[");
  res = replaceAllOccurrences(res, "]", "]</i>");

  res = replaceAllOccurrences(res, "\"*", "\"");
  res = replaceAllOccurrences(res, "*\"", "\"");

  res = replaceAllOccurrences(res, "<< ", "<a target=\"_blank\" href=\"");
  res = replaceAllOccurrences(res, ">|<", "\">");
  res = replaceAllOccurrences(res, " >>", "</a>");

  res = replaceAllOccurrences(res, " ##| ", "<span style=\"background-color: black; color:black\">");
  res = replaceAllOccurrences(res, " <| ", "</span>");

  res = replaceAllOccurrences(res, " -- ", "<li>");
  res = replaceAllOccurrences(res, " |--", "</li>");

  res = replaceAllOccurrences(res, ">-> ", "<dir>");
  res = replaceAllOccurrences(res, " >->", "</dir>");

  res = replaceAllOccurrences(res, "|$ ", "<script type=\"module\">");
  res = replaceAllOccurrences(res, " $|", "</script>");

  res = replaceAllOccurrences(res, "|$- ", `<script type=\"module\" src=\"${fileFetcher.makeLinkIndependent("js/")}`);
  res = replaceAllOccurrences(res, " -$|", `\"></script>`);

  res = replaceAllOccurrences(res, "!|", "<br/>");

  return res;
}

import * as fileFetcher from "./file_fetcher.js";

function replaceAllOccurrences(inputString, substringToReplace, replacementValue) {
  var escapedSubstring = substringToReplace.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  var regex = new RegExp(escapedSubstring, 'g');
  var resultString = inputString.replace(regex, replacementValue);

  return resultString;
}


export function parseRawPost(str = "") {
  let strCom = str.replace("\r", "");
  let res = "";

  res = replaceAllOccurrences(strCom, "!!!! ", "<h1>");
  res = replaceAllOccurrences(res, " !!!!", "</h1>");

  res = replaceAllOccurrences(res, "i- ", `<img src=\"${fileFetcher.makeLinkIndependent("image/")}`);
  res = replaceAllOccurrences(res, " -i", "\">");

  res = replaceAllOccurrences(res, "\" ", "<div>");
  res = replaceAllOccurrences(res, " \"", "</div>");

  res = replaceAllOccurrences(res, "<< ", "<a target=\"_blank\" href=\"");
  res = replaceAllOccurrences(res, ">|<", "\">");
  res = replaceAllOccurrences(res, " >>", "</a>");

  res = replaceAllOccurrences(res, " -- ", "<li>");
  res = replaceAllOccurrences(res, " |--", "</li>");

  res = replaceAllOccurrences(res, ">-> ", "<dir>");
  res = replaceAllOccurrences(res, " >->", "</dir>");

  res = replaceAllOccurrences(res, "|$ ", "<script type=\"module\">");
  res = replaceAllOccurrences(res, " $|", "</script>");

  res = replaceAllOccurrences(res, "|$- ", `<script type=\"module\" src=\"${fileFetcher.makeLinkIndependent("./js/")}`);
  res = replaceAllOccurrences(res, " -$|", `\"></script>`);

  res = replaceAllOccurrences(res, "!|", "<br/>");

  return res;
}

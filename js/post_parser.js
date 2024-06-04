import * as fileFetcher from "./file_fetcher.js";
import * as mind from "./mind.js";

function replaceAllOccurrences(inputString, substringToReplace, replacementValue) {
  var escapedSubstring = substringToReplace.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  var regex = new RegExp(escapedSubstring, 'g');
  var resultString = inputString.replace(regex, replacementValue);

  return resultString;
}

export const begLangTag = `#->[]#`;
export const endLangTag = `#<-[]#`;

function getLangTag(str = "", forcedLang = undefined) {
  var lang = undefined;

  if(forcedLang)
    lang = forcedLang;
  else
    lang = fileFetcher.getURLParams().get("lang");

  if (lang === null) {
    lang = "en";
  }

  let indxBeg = str.indexOf(begLangTag.replace("[]", lang));
  let indxEnd = str.indexOf(endLangTag.replace("[]", lang));

  if (indxBeg === -1) {
    console.warn("It's unsupported for translated text, assumption it's deprecated post");
    return str;
  }
  if (indxEnd === -1) throw `Bracket for language ${lang} wasn't closed`;

  return str.substring(indxBeg + begLangTag.length, indxEnd);
}

export const titleOpen = "T=>";
export const titleClose = "<=T";

export const dictionary =
  [
    [titleOpen, "<!--"],
    [titleClose, "-->"],

    ["/*", "<!--"],
    ["*/", "-->"],

    ["!!!! ", "<h1>"],
    [" !!!!", "</h1>"],

    ["il- ", `<img src="${fileFetcher.makeLinkIndependent("image/")}`],
    [" -il", "\">"],

    ["i- ", "<img src=\""],
    [" -i", "\">"],

    ["\" ", "<div>"],
    [" \"", "</div>"],

    ["[ ", "<i>["],
    [" ]", "]</i>"],

    ["\"*", "\""],
    ["*\"", "\""],

    ["<!twitter ", "<a target=\"_blank\" href=\"https://twitter.com/"],
    ["<!youtube ", "<a target=\"_blank\" href=\"https://www.youtube.com/"],
    [" !>", "</a>"],

    ["<<l ", `<a target=\"_blank\" href=\""${fileFetcher.makeLinkIndependent("/")}`],
    [" l>>", "</a>"],

    ["<< ", "<a target=\"_blank\" href=\""],
    [">|<", "\">"],
    [" >>", "</a>"],

    [" ##| ", "<span style=\"background-color: black; color:black\">"],
    [" <| ", "</span>"],

    [" -- ", "<li>"],
    [" |-- ", "</li>"],

    [">-> ", "<dir>"],
    [" >->", "</dir>"],

    [">q> ", "<blockquote style=\"color: gray;\">"],
    [" >q>", "</blockquote>"],

    ["|$ ", "<script type=\"module\">"],
    [" $|", "</script>"],

    ["|$- ", `<script type=\"module\" src=\"${fileFetcher.makeLinkIndependent("js/")}`],
    [" -$|", "\"></script>"],

    ["!|", "<br/>"]
  ];

function adaptRawString(str = "", forcedLang = undefined) {
  let strCom = str.replaceAll("\r", "");
  return getLangTag(strCom, forcedLang);
}

export function parseRawTitle(str = "", forcedLang = undefined) {
  let res = adaptRawString(str,forcedLang);

  if(res.indexOf(titleOpen) !== -1 && res.indexOf(titleClose) !== -1) {
    return res.substring(res.indexOf(titleOpen) + titleOpen.length, res.indexOf(titleClose));
  }

  return "undefined";
}

export function parseRawPost(str = "", forcedLang = undefined) {
  let res = adaptRawString(str, forcedLang);

  dictionary.forEach((regex_value) => {
    res = replaceAllOccurrences(res, regex_value[0], regex_value[1]);
  });
  return res;
}


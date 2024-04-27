
function replaceAllOccurrences(inputString, substringToReplace, replacementValue) {
    var escapedSubstring = substringToReplace.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    var regex = new RegExp(escapedSubstring, 'g');
    var resultString = inputString.replace(regex, replacementValue);
  
    return resultString;
  }
  

export function parseRawPost(str = "") {
    let strCom = str.replace("\r", "");
    let res = "";

    res = replaceAllOccurrences(strCom,"!!!! ", "<h1>");
    res = replaceAllOccurrences(res," !!!!", "</h1>");

    res = replaceAllOccurrences(res,"i- ", "<img src=\"./image/");
    res = replaceAllOccurrences(res," -i", "\">");

    res = replaceAllOccurrences(res,"\" ", "<div>");
    res = replaceAllOccurrences(res," \"", "</div>");

    res = replaceAllOccurrences(res,"<< ", "<a target=\"_blank\" href=\"");
    res = replaceAllOccurrences(res,">|<", "\">");
    res = replaceAllOccurrences(res," >>", "</a>");

    res = replaceAllOccurrences(res,"!|", "<br/>");
    
    return res;
}

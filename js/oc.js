import {assemble} from "./base_generator.js";
import * as fileFetcher from "./file_fetcher.js";
import * as postParser from "../../PostViewer/post_parser.js";
import * as mind from "./mind.js";

export function extractAge(initialAge, strDateCreation, disappeared, strDateDisappearence) {
  if (strDateCreation === null) {
    return initialAge;
  }
  const today = new Date();
  let diffc = today - new Date(strDateCreation);

  if (disappeared) {
    console.log("disappeared");
    let diffd = today - new Date(strDateDisappearence);

    return initialAge + parseInt(Math.floor(diffc / 1000 / 60 / 60 / 24 / 365.24 - diffd / 1000 / 60 / 60 / 24 / 365.24));
  }
  else
    return initialAge + parseInt(diffc / 1000 / 60 / 60 / 24 / 365.24);
}

export async function getGalleryLinks(filter = "") {
  let image_lines = (await fileFetcher.fetchFile("image/paths.txt")).split('\n');
  let image_list = image_lines.filter(str => str.includes(`${filter}\\`));

  return image_list;
}

export function convertDateToString(date = new Date(), isMind = false) {
  return `${date.getDate()}.${date.getMonth()+1}.${isMind ? date.getFullYear() - 2000 :date.getFullYear()}${isMind?"M":""}`;
}

export function convertDateToStringFull(date = new Date()) {
  return `${convertDateToString(date,false)}(${convertDateToString(mind.getMindDate(date),true)})`;
}

export function prepareStoryV1(story_lines = []) {
  return postParser.parseRawPost(story_lines.join(""));
}

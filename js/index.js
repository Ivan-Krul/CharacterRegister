import {assemble} from "./base_generator.js";
import * as fileFetcher from "./file_fetcher.js";

///////////////////////////////////////////////


let curDate = new Date();
if(curDate.getDate() === 4 && curDate.getMonth() === 1) {
    alert("YAY, AUTHOR OF THE PAGE HAS A BIRTHDAY!! HAPPY BIRTHDAY TO ME!!");
}


///////////////////////////////////////////////

async function renderButtons() {
    const imagePathFile = (await fileFetcher.fetchFile("image/paths.txt")).replaceAll("\\", "/");
    let imagePathList = imagePathFile.split('\n');
    imagePathList = imagePathList.filter((el) => el.indexOf("/Buttons/") !== -1);
    
    document.getElementById("sideMenu").innerHTML += "<div id=\"button_container\"><div>Buttons:</div>";

    imagePathList.forEach((el) => {
        const num = el.lastIndexOf('/');
        let imageURL = el.substr(num, el.lastIndexOf('88x31') - num - 1);

        imageURL = imageURL.replaceAll("DOT", '.');
        imageURL = imageURL.replaceAll("SLASH", '/');

        document.getElementById("sideMenu").innerHTML += `<a target=_blank href="https:/${imageURL}"><img src="${el}" class="buttons" style="background-color: var(--text)"></a>`;
    });
    
    document.getElementById("sideMenu").innerHTML += "</div>";
}



///////////////////////////////////////////////

var JSON = {};

function pushZeros(number, threshold = 2) {
    let log = number.toString().length;

    let str = "";

    for(let i = 0; i < threshold - log; i++) {
        str += "0";
    }

    str = `${str}${number}`;
    return str;
}

function output() {
    let date = new Date(JSON.updated_at);

    document.getElementById("sideMenu").innerHTML += `
    <div>Repository updated: <span id="updateDate">
    ${date.getHours()}:${pushZeros(date.getMinutes())} | ${pushZeros(date.getDate())}.${pushZeros(date.getMonth() + 1)}.${date.getFullYear()}
    </span></div>
    <div>Repository open issues: <span id="repoIssues">${JSON.open_issues_count}</span></div>
    <div>Repository forks: <span id="repoForks">${JSON.forks_count}</span></div>
    <div>Repository stars: <span id="stargazersCount">${JSON.stargazers_count}</span></div>
    `;
};

async function outputGithubDetails() {
    JSON = await fetch("https://api.github.com/repos/Ivan-Krul/CharacterRegister").then(response => response.json()).catch(error => console.error(error));
    output();
}

///////////////////////////////////////////////

await assemble();
await renderButtons();
await outputGithubDetails();

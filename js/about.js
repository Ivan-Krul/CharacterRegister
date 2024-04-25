import "./footer_generator.js";
import "./dark_theme.js";
import "./oc_linker.js";

var JSON = {};

function pushZeros(number, threshold = 2) {
    let log = Math.ceil(Math.log10(number));

    let str = "";

    for(let i = 0; i < threshold - log; i++) {
        str += "0";
    }

    str = `${str}${number}`;
    return str;
}

function output() {
    let date = new Date(JSON.updated_at);

    document.getElementById("repoIssues").innerText = JSON.open_issues_count;
    document.getElementById("updateDate").innerText = 
        `${pushZeros(date.getHours())}:${pushZeros(date.getMinutes())} | ${pushZeros(date.getDate())}.${pushZeros(date.getMonth() + 1)}.${date.getFullYear()}`;
};

async function outputGithubDetails() {
    JSON = await fetch("https://api.github.com/repos/Ivan-Krul/CharacterRegister").then(response => response.json());
    output();
}

outputGithubDetails();

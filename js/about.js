import "./base_generator.js";

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
    <div>Repository updated: <span id="updateDate">${JSON.open_issues_count}</span></div>
    <div>Repository open issues: <span id="repoIssues">${JSON.forks_count}</span></div>
    <div>Repository forks: <span id="repoForks">
    ${date.getHours()}:${pushZeros(date.getMinutes())} | ${pushZeros(date.getDate())}.${pushZeros(date.getMonth() + 1)}.${date.getFullYear()}
    </span></div>
    `;
};

async function outputGithubDetails() {
    JSON = await fetch("https://api.github.com/repos/Ivan-Krul/CharacterRegister").then(response => response.json());
    output();
}

outputGithubDetails();

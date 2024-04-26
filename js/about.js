import "./base_generator.js";

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

function generateTags() {
    
    
    document.getElementById("sideMenu").appendChild(`
    <div>Repository updated: <span id="updateDate"></span></div>
    <div>Repository open issues: <span id="repoIssues"></span></div>
    <div>Repository forks: <span id="repoForks"></span></div>
    `);
}

function output() {
    let date = new Date(JSON.updated_at);

    document.getElementById("repoIssues").innerText = JSON.open_issues_count;
    document.getElementById("repoForks").innerText = JSON.forks_count;
    document.getElementById("updateDate").innerText = 
        `${pushZeros(date.getHours())}:${pushZeros(date.getMinutes())} | ${pushZeros(date.getDate())}.${pushZeros(date.getMonth() + 1)}.${date.getFullYear()}`;
};

async function outputGithubDetails() {
    JSON = await fetch("https://api.github.com/repos/Ivan-Krul/CharacterRegister").then(response => response.json());
    output();
}

outputGithubDetails();

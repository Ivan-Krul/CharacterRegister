import "./base_generator.js";

///////////////////////////////////////////////


let curDate = new Date();
if(curDate.getDate() === 4 && curDate.getMonth() === 1) {
    alert("YAY, AUTHOR OF THE PAGE HAS A BIRTHDAY!! HAPPY BIRTHDAY TO ME!!");
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
    `;
};

async function outputGithubDetails() {
    JSON = await fetch("https://api.github.com/repos/Ivan-Krul/CharacterRegister").then(response => response.json());
    output();
}

outputGithubDetails();



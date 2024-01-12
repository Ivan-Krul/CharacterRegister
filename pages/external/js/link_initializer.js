import * as fileFetcher from "./../../../js/file_fetcher.js";

async function generateLinks() {
    let list = (await fileFetcher.fetchFile("pages/external/envirouments.txt")).split("\n");

    console.log(fileFetcher.getCountToRoot());

    let start = document.createElement("div")
    start.classList.add("text");
    start.innerText = "Here you can see all authors' pages, made by them, at least";
    document.getElementById("side_authorsContainer").appendChild(start);

    if(fileFetcher.getCountToRoot() > 2)
    {
        let div = document.createElement("div");
        let a = document.createElement("a");
        a.innerText = "Go back to main page";
        a.href = fileFetcher.makeLinkIndependent("pages/external/index.html");
        a.classList.add("text");
        div.appendChild(a);
        document.getElementById("side_authorsContainer").appendChild(div);
    }

    for(let i = 0; i < list.length; i++) {
        let div = document.createElement("div");
        let a = document.createElement("a");
        a.innerText = list[i];
        a.href = fileFetcher.makeLinkIndependent("pages/external/enviroument/"+list[i]+".html");
        a.classList.add("text");
        div.appendChild(a);
        document.getElementById("side_authorsContainer").appendChild(div);
    }

    let div = document.createElement("div");
    div.classList.add("text");

    let divtext = document.createElement("div");
    div.innerText = "All this page is distributed as an open-source project, so you can contribute or add something new!";
    let a = document.createElement("a");
    a.innerText = "Go to the repository";
    a.href = "https://github.com/Ivan-Krul/CharacterRegister";
    
    div.appendChild(divtext);
    div.appendChild(a);

    document.getElementById("side_authorsContainer").appendChild(div);
}

generateLinks();

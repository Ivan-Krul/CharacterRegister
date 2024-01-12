
var passed = 0;
var allowed = [];

function separateContentInConfig(tag = "") {
  let doc = document.documentElement.outerHTML.substring(passed);
  let indStartHead = doc.indexOf("<!--" + tag + ":");
  let indEndHead = doc.indexOf("|-->");
  return (indStartHead !== -1 && indEndHead !== -1) ? (passed += indEndHead + 4, doc.substring(indStartHead + tag.length + 5, indEndHead)) : undefined;
}

function setTitle() {
  let title = separateContentInConfig("Title");

  if (title) {
    document.head.innerHTML = "<title>" + title + `</title>
    <meta http-equiv=\"content-type\"content=\"text/html;charset=UTF-8\">
    <meta name=\"viewport\"content=\"width=device-width,initial-scale=1.0\">
    <link rel="stylesheet" href="../style/index.css">
    `;
    document.body.insertAdjacentHTML('afterbegin', `
    <div class="title text" id="title_container">
    <h1>CR EX: `+title+`</h1>
    </div>
`);
  } else {
    console.log("Title section not found");
  }
}

function setAllow() {
  let allowness = separateContentInConfig("Allow");
  if (allowness) {
    allowed.push(allowness);
  } else {
    console.log("Title section not found");
  }
}

function setBody() {
  let buttonContainer = document.createElement("div");
  buttonContainer.id = "button_container";

  let buttonToggleTheme = document.createElement("button");
  buttonToggleTheme.innerText = "Toggle theme";
  buttonToggleTheme.id = "button_toggleTheme";
  buttonToggleTheme.classList.add("text");

  let buttonToggleAuthorList = document.createElement("button");
  buttonToggleAuthorList.innerText = "Toggle author list";
  buttonToggleAuthorList.id = "button_toggleAuthorList";
  buttonToggleAuthorList.classList.add("text");
  
  buttonContainer.appendChild(buttonToggleTheme);
  buttonContainer.appendChild(buttonToggleAuthorList);

  document.body.appendChild(buttonContainer);

  let buttonHandlers = document.createElement("script");
  buttonHandlers.type="module";
  buttonHandlers.src ="../js/buttons_handlers.js";
  document.body.appendChild(buttonHandlers);

  let linkInitializer = document.createElement("script");
  linkInitializer.type="module";
  linkInitializer.src ="../js/link_initializer.js";
  document.body.appendChild(linkInitializer);

  let side_authorDisplay = document.createElement("div");
  side_authorDisplay.id="side_authorsContainer";
  document.body.appendChild(side_authorDisplay);
}

function set() {
  setBody();
  setTitle();
}

set();
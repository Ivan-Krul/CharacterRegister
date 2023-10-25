function fetchFile(filePath) {
  for (let index = 0; index < getCountToRoot(); index++) {
    let toRoot = "../";
    toRoot += filePath;
    filePath = toRoot;
  }

  return fetch(filePath)
    .then(response => response.text())
    .catch(error => {
      console.error('Error fetching ' + filePath + ':', error);
      return '';
    });
}

function getCountToRoot() {
  let path = window.location.pathname;

  let slashCount = (path.match(/\//g) || []).length;
  let splitedStr = path.split("CharacterRegister")[0];
  let slashCountDomain = (splitedStr.match(/\//g) || []).length;
  let resCount = slashCount - slashCountDomain - 1;

  return resCount;
}

function generateHTMLPost(content = "") {
  const posts = document.getElementById("posts");

  const postPartition = document.createElement("div");
  postPartition.innerHTML = content;
  postPartition.innerHTML += "<hr/>\n";
  
  posts.appendChild(postPartition);
}

function getPostFromPath(index = 0, list_of_links = []) {
  return fetchFile(list_of_links[index]);
}

function divideSingleStringIntoRows(single_string = "") {
  return single_string.split("\n");
}

function generatePost(content = "", filename = "") {
  let dateArr = filename.split("%")[0].split("_");
  let date = dateArr[0] + " " + dateArr[1] + " " + dateArr[2];
  let nameOfPostArr = filename.split("%")[1].split("_");
  let nameOfPost = "";
  nameOfPostArr.forEach(element => {
    nameOfPost += element+" ";
  });
  let preFinalContent = "<h1>" + nameOfPost + "</h1>\n";
  preFinalContent += "<div>" + date + "</div>\n";
  preFinalContent += content;
  generateHTMLPost(preFinalContent);
}

async function generatePostPage(index_page = 0, index_page_size = 10) {
  let links = await fetchFile("./posts/partitions.txt");
  linksArr = divideSingleStringIntoRows(links);
  linksArr.splice(linksArr.length - 1, 1);
  
  for(let i = 0; i < index_page_size && (linksArr.length - i - index_page * index_page_size - 1) >= 0; i++) {
    const link = linksArr[linksArr.length - i - index_page * index_page_size - 1];
    const content = await fetchFile("./posts/" + link);
    console.log(link);
    console.log(content);

    generatePost(content,link);
  }
}

generatePostPage()

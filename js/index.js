import * as postg from "./post_generator.js";
import "./base_generator.js";


postg.generatePostPage(0,10);


///////////////////////////////////////////////


let curDate = new Date();
if(curDate.getDate() === 4 && curDate.getMonth() === 1) {
    alert("YAY, AUTHOR OF THE PAGE HAS A BIRTHDAY!! HAPPY BIRTHDAY TO ME!!");
}


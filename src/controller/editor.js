let browser=require("../controller/browser/browserController.js");

let inputLabel=document.getElementById("inputs");
let inputs=[];

addEventListener("keydown", e=>onKeyDown(e.code));
addEventListener("keyup", e=>onKeyUp(e.code));

function onKeyDown(key){
    if(!inputs.find(x=>x===key)){
        inputs.push(key);
        inputLabel.innerHTML="Inputs: "+inputs;
    }
}

function onKeyUp(key){
    if(inputs.find(x=>x===key)){
        inputs.splice(inputs.findIndex(x=>x===key), 1);
        inputLabel.innerHTML="Inputs: "+inputs;
    }
}

function attachButtonClick(){
    browser.attach(onKeyDown, onKeyUp);
}

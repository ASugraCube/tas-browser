let browser=require("../controller/browser/browserController.js");
let settings=require("../model/settings.js")

let inputLabel=document.getElementById("inputs");
let inputs=[];
addEventListener("keydown", e=>onKeyDown(e.code));
addEventListener("keyup", e=>onKeyUp(e.code));

let speedInput=document.getElementById("speed-input");
let pauseInput=document.getElementById("pause-input");
let advanceInput=document.getElementById("advance-input");
speedInput.value=settings.speed;
pauseInput.value=settings.pauseButton;
advanceInput.value=settings.advanceButton;

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

function onSpeedInput(){
    if(Number(speedInput.value)!==NaN)
        settings.speed=Number(speedInput.value);
}

function onPauseInput(){
    settings.pauseButton=pauseInput.value;
}

function onAdvanceInput(){
    settings.advanceButton=advanceInput.value;
}

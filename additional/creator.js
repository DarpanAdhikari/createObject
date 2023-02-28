const SwitchedMode = localStorage.getItem("SwitchedMode");
window.addEventListener("load",(e)=>{
  e.preventDefault();
  if(SwitchedMode==="createblob")
  {
    navButtons[0].click();
  }else if(SwitchedMode==="linear-gradient"){
    navButtons[1].click();
  }else if(SwitchedMode==="box-shadow"){
    navButtons[2].click();
  }else{
    Section[0].style.display = "block";
  }
})

const createdObject = document.querySelector(".main-field .object .shape"),
  objectSize = document.querySelectorAll(".blobField input[inputmode='numeric']"),
  slideInput = document.querySelectorAll(".blob input[type='range']"),
  valueOfResult = document.querySelectorAll(".copy-field input"),
  copyBtn = document.querySelectorAll("#copyBtn");

slideInput.forEach(radiusValue => {
  radiusValue.addEventListener("input", createBlob);
});

objectSize.forEach(sizeOf => {
  sizeOf.addEventListener("input", createBlob);
});

function createBlob() {
  let firstRad = slideInput[0].value,
    secondRad = slideInput[1].value,
    thirdRad = slideInput[2].value,
    fouthRad = slideInput[3].value,
    height = objectSize[0].value,
    width = objectSize[1].value;

    if(height>320) {
       height = 320;
      document.querySelector(".scale").classList.add("active");
      document.querySelector(".scale .bottom .value").textContent = objectSize[0].value; 
      document.querySelector(".scale").style.height = height+40+"px";
      }else{
        document.querySelector(".scale").classList.remove("active");
        document.querySelector(".scale").style.height = "0";
      }

  let finalRadius = `${firstRad}% ${100 - firstRad}% ${100 - thirdRad}% ${thirdRad}% / ${fouthRad}% ${secondRad}% ${100 - secondRad}% ${100 - fouthRad}%`;

 createdObject.style.cssText = `border-radius:${finalRadius}; height:${height}px; width:${width}px; ${valueOfResult[2].value};${valueOfResult[1].value};`;

  valueOfResult[0].value = `border-radius:${finalRadius}; height:${objectSize[0].value}px; width:${width}px;`;

  localStorage.setItem("blobHistory", valueOfResult[0].value);

  copyBtn[0].addEventListener("click", () => {
    navigator.clipboard.writeText(valueOfResult[0].value);
    copyBtn[0].textContent = "Copied";
    setTimeout(() => {
      copyBtn[0].textContent = "Copy";
    }, 2000);
  });
}


const Section = document.querySelectorAll("section"),
  navButtons = document.querySelectorAll(".navbar-nav li");
navButtons[0].onclick = () => {
  localStorage.setItem("SwitchedMode","createblob")
  document.title = "Blob maker";
  Section[0].style.display = "block";
  Section[1].style.display = "none";
  Section[2].style.display = "none";
}
navButtons[1].onclick = () => {
  localStorage.setItem("SwitchedMode","linear-gradient")
  Section[1].style.display = "block";
  Section[0].style.display = "none";
  Section[2].style.display = "none";
}
navButtons[2].onclick = () => {
  localStorage.setItem("SwitchedMode","boxshadow")
  Section[2].style.display = "block";
  Section[1].style.display = "none";
  Section[0].style.display = "none";
}

// linear-gradient script
let generateBtn = document.querySelector('#generate');
let hexStringCode = "0123456789abcdef";
function getColor() {
  let ColorCode = "#";
  for (let i = 0; i < 6; i++) {
    ColorCode += hexStringCode[Math.floor(Math.random() * hexStringCode.length)];
  }
  return ColorCode;
}

function multipleColor(gotValue,objectShape) {
  let color = [];
  for (let i = 0; i < gotValue; i++) {
    color[i] = getColor();
  }
  let angle = Math.floor(Math.random() * 360);
  createdObject.style.cssText = `background: linear-gradient(${angle}deg,${color});${objectShape};${valueOfResult[2].value};`;

  valueOfResult[1].value = `background: linear-gradient(${angle}deg,${color});`;
  copyBtn[1].addEventListener("click", () => {
    navigator.clipboard.writeText(valueOfResult[1].value);
    copyBtn[1].textContent = "Copied";
    setTimeout(() => {
      copyBtn[1].textContent = "Copy";
    }, 2000);
  });

  localStorage.setItem("gradientHistory", valueOfResult[1].value);
}
let colorVariance = document.querySelector("#colorVariance");
colorVariance.oninput = () => {
  multipleColor(colorVariance.value,valueOfResult[0].value);
}
generateBtn.onclick = () => {
  multipleColor(colorVariance.value,valueOfResult[0].value);
}

// shadow section script-------------------------

const shadowGenerator = document.querySelectorAll(".shadowField input");

function generateShadow(){
 
  let hShadow = shadowGenerator[0].value,
      vShadow = shadowGenerator[1].value,
      bRadius = shadowGenerator[2].value,
      sRadius = shadowGenerator[3].value,
      colorShadow = shadowGenerator[4].value,
      oShadow = shadowGenerator[5].value,
      shadowType =shadowGenerator[6].checked;

  let  rgba = rgbaGenerator(colorShadow,oShadow);

  let finalShadow;
  if(shadowType) {
    finalShadow = createdObject.style.cssText = `box-shadow: inset ${hShadow}px ${vShadow}px ${bRadius}px ${sRadius}px ${rgba};`;
  }else{
    finalShadow = createdObject.style.cssText = `box-shadow: ${hShadow}px ${vShadow}px ${bRadius}px ${sRadius}px ${rgba};`;
  }

  valueOfResult[2].value = finalShadow;
  createdObject.style.cssText = valueOfResult[0].value+valueOfResult[1].value+finalShadow;
  
  copyBtn[2].addEventListener("click", () => {
    navigator.clipboard.writeText(valueOfResult[2].value);
    copyBtn[2].textContent = "Copied";
    setTimeout(() => {
      copyBtn[2].textContent = "Copy";
    }, 2000);
  });

  localStorage.setItem("shadowtHistory", valueOfResult[2].value);
}
function rgbaGenerator(colorShadow, oShadow){
  let r = parseInt(colorShadow.substr(1,2),16),
      g = parseInt(colorShadow.substr(3,2),16),
      b = parseInt(colorShadow.substr(5,2),16);
      return `rgba(${r},${g},${b},${oShadow})`;
}
shadowGenerator[5].addEventListener("input",()=>{
  if(shadowGenerator[5].value > 1 || shadowGenerator[5].value < 0) {shadowGenerator[5].value = 1}
})
shadowGenerator.forEach(dataOfInp=>{
  dataOfInp.addEventListener("input",generateShadow);
});


// history scrips------------------------
document.querySelector("button.viewHistory").onclick=()=>{
  document.querySelector(".history").classList.add("active");
}
document.querySelector(".close").onclick=()=>{
  document.querySelector(".history").classList.remove("active");
}
document.querySelector(".blobHistory").textContent = ":-" + localStorage.getItem("blobHistory");
document.querySelector(".gradientHistory").textContent = ":-" + localStorage.getItem("gradientHistory");
document.querySelector(".shadowHistory").textContent = ":-" + localStorage.getItem("shadowtHistory");

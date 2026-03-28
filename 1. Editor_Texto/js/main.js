let optionsBTN = document.querySelectorAll(".option-btn");
let advancedOptions = document.querySelectorAll(".cr-option-btn");
let FontName = document.getElementById("fontName");
let SizeRef = document.getElementById("fontSize");
let writing = document.getElementById("text-input");
let linkButton = document.getElementById("create-link");
let alignBtn = document.querySelectorAll(".align");
let spacingBtn = document.querySelectorAll(".spacing");
let formatBtn = document.querySelectorAll(".format");
let scriptBtn = document.querySelectorAll(".script");

let fontlist = [
    "Arial",
    "Verdana",
    "Times New Roman",
    "Garamond",
    "Georgia",
    "Courier New",
    "Cursive",
]

const inicializar = () =>{
    highlight(alignBtn, true);
    highlight(spacingBtn, true);
    highlight(formatBtn, false);
    highlight(scriptBtn, true);

    fontlist.map((value) =>{
        let opt = document.createElement("option");
        opt.value = value;
        opt.innerHTML = value;
        FontName.appendChild(opt);
    });
    for(let i = 1;i <= 7;i++){
        let opt = document.createElement("option");
        opt.value = i;
        opt.innerHTML = i;
        SizeRef.appendChild(opt);
    }
    SizeRef.value = 3;
};

const modificarTxt = (command, defaultUi, value) =>{
    document.execCommand(command, defaultUi, value);
};

optionsBTN.forEach((btn) =>{
    btn.addEventListener("click", () =>{
        modificarTxt(btn.id, false, null);
    });
});

advancedOptions.forEach((btn) =>{
    btn.addEventListener("change", () =>{
        modificarTxt(btn.id, false, btn.value);
    });
});

linkButton.addEventListener("click", () =>{
    let userlink = prompt("Enter a URL:", "http://");
    if(/http/i.test(userlink)){
        modificarTxt(linkButton.id, false, userlink);
    }else{ 
        userlink = "http://" + userlink;
        modificarTxt(linkButton.id, false, userlink);
    }
});

const highLight = (className, needRemoval) =>{
    className.forEach((btn) =>{
        btn.addEventListener("click", () =>{
            if(needRemoval){
                let alreadyActive = btn.classList.contains("active");
                highLight(className);
                if(!alreadyActive){
                    btn.classList.add("active");
                }else{btn.classList.toggle("active");}
            } else{btn.classList.toggle("active");}
        });
    });
};

const highLightRemover = (className) =>{
    className.forEach((btn) =>{
        btn.classList.remove("active");
    });
};
window.onload = inicializar;
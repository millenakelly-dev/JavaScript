const lengthInput = document.querySelector('.pass-length input');
const opt = document.querySelectorAll('.options input');
const copy = document.querySelector('.input-box span');
const passInput = document.querySelector('.input-box input');
const passIndicator = document.querySelector('.pass-indicator');
const generateBtn = document.querySelector('.generate-btn');

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
};

const generatePassword = () => {
    let staticPassword = "",
        randomPassword = "",
        excludeDuplicate = false,
        passLength = lengthInput.value;

    opt.forEach((opt) => {
        if(opt.checked){
            if(opt.id !== "exc-duplicate" && opt.id !== "spaces"){
                staticPassword += characters[opt.id];
            }else if(opt.id === "spaces"){
                staticPassword += ` ${staticPassword} `;
            }else{
                excludeDuplicate = true;
            }
        }
    });

    for(let i = 0; i < passLength; i++){
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if(excludeDuplicate){
            if(randomPassword.includes(randomChar) && randomChar !== " "){
                i--;
            }else{
                randomPassword += randomChar;
            }
        }else{
            randomPassword += randomChar;
        }
    }
    passInput.value = randomPassword;
};

const updatePassIndicator = () => {
    passIndicator.id = lengthInput.value <= 8 ? "weak" : lengthInput.value <= 16 ? "medium" : "strong";
};

const updateSlider = () => {
    document.querySelector('.pass-length .details span').innerText = lengthInput.value;
    generatePassword();
    updatePassIndicator();
};
updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passInput.value);
    copy.innerText = "check";
    copy.style.color = "#43A047";
    setTimeout(() => {
        copy.innerText = "content_copy";
        copy.style.color = "#707070";
    }, 1500);
};

copy.addEventListener("click", copyPassword);
lengthInput.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
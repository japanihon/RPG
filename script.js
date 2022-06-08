

let passwordDisplayText = document.querySelector('#passwordDisplay p')
let copyToClipboardBtn = document.querySelector('#copyToClipboardBtn')
let includeUppercase = document.querySelector('#includeUppercase')
let passwordDisplay = document.querySelector('#passwordDisplay')
let characterRange = document.querySelector('#characterRange')
let includeNumbers = document.querySelector('#includeNumbers')
let coppiedMessage = document.querySelector('.coppiedMessage')
let includeSymbols = document.querySelector('#includeSymbols')
let characterSpan = document.querySelector('.characterSpan')

let arrayLowToHigh = (low, high) => {
    let array = []
    for (let i = low; i <= high; i++) {
        array.push(i);
    }
    return array
}

let LOWERCASE_CHAR_CODES = arrayLowToHigh(97, 122);
let UPPERCASE_CHAR_CODES = arrayLowToHigh(65, 90);
let NUMBERS_CHAR_CODES = arrayLowToHigh(48, 57);
let SYMBOL_CHAR_CODES = arrayLowToHigh(34, 47).concat(
    arrayLowToHigh(58, 64)
).concat(
    arrayLowToHigh(91, 96)
).concat(
    arrayLowToHigh(123, 126)
);


// ---------------- Character value changer ----------------

characterRange.addEventListener('input', e => {
    characterSpan.innerHTML = e.target.value
})

// ---------------- Character value changer End ----------------

// ---------------- Password Generator Function ----------------

let generatePassword = (characterRange, includeUppercase, includeNumbers, includeSymbols) => {
    let charCodes = LOWERCASE_CHAR_CODES;

    if (includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES)
    if (includeNumbers) charCodes = charCodes.concat(NUMBERS_CHAR_CODES)
    if (includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES)

    let passwordChar = []
    for (let a = 0; a < characterRange; a++) {
        let characterCode = charCodes[Math.floor(Math.random() * characterRange)]
        passwordChar.push(String.fromCharCode(characterCode))
    }
    return passwordChar.join('')
}

// ---------------- Password Generator Function End ----------------

// ---------------- Form Submit ----------------

let generatorOptions = document.querySelector('#generatorOptions')

generatorOptions.addEventListener('submit', e => {
    e.preventDefault();
    let password = generatePassword(characterRange.value, includeUppercase.checked, includeNumbers.checked, includeSymbols.checked);

    passwordDisplayText.innerHTML = password
    
    // ---------------- Copy Button Function ----------------
    
    passwordDisplay.addEventListener('mousemove', (e) => {
        resultContainerBound = {
            left: passwordDisplay.getBoundingClientRect().left,
            top: passwordDisplay.getBoundingClientRect().top,
        };
        copyToClipboardBtn.style.opacity = '1';
        copyToClipboardBtn.style.pointerEvents = 'all';
        passwordDisplay.classList.add('copyBtnShow')
        copyToClipboardBtn.style.setProperty("--X", `${e.x - resultContainerBound.left}px`);
        copyToClipboardBtn.style.setProperty("--Y", `${e.y - resultContainerBound.top}px`);
    })
    
    passwordDisplay.addEventListener('mouseleave', (e) => {
        setTimeout(() => {
            copyToClipboardBtn.style.opacity = '0';
            copyToClipboardBtn.style.pointerEvents = 'none';
            copyToClipboardBtn.style.setProperty("--X", '0');
            copyToClipboardBtn.style.setProperty("--Y", '0');
        }, 300)
        passwordDisplay.classList.remove('copyBtnShow')
    })
    
    // ---------------- Copy Button Animation End ----------------

    copyToClipboardBtn.addEventListener('click', () => {
        const textarea = document.createElement("textarea");
        textarea.value = password;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();

        coppiedMessage.classList.add('success')
        
        setTimeout(() => {
            coppiedMessage.classList.remove('success')
        }, 2500)
    })
})

// ---------------- Form Submit End ----------------
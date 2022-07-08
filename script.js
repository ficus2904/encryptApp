"use strict"

/////////////////// вариант на XOR
function nKey(str, key) {
    if (str.length > key.length) {
        let newKey = key;
        for (let i = 0; Math.ceil(str.length / key.length) - 1 > i; i++) {
          newKey += key;
        }
        if (newKey.length > str.length) {
          newKey = newKey.slice(0, -(newKey.length - str.length));
        }
        return newKey;
    } else if (str.length == key.length) {
          return key
    } else if (str.length < key.length) {
          return key.slice(0, -(key.length - str.length))
    }
}
function normalizeKey(str, key) {
    if (str.length > key.length) {
        let newKey = key;
        for (let i = 0; Math.ceil(str.length / key.length) - 1 > i; i++) {
          newKey += key;
        }
        if (newKey.length > str.length) {
          newKey = newKey.slice(0, -(newKey.length - str.length));
        }
        return newKey.toUpperCase();
    } else if (str.length == key.length) {
          return key
    } else if (str.length < key.length) {
          return key.slice(0, -(key.length - str.length))
    }
}

function toXOR(oldstr, oldkey) {
    let str = String(oldstr);
    let key = nKey(str, oldkey);
    let enc = "";
    for (let i = 0; i < str.length; i++) {
        let one = str.charCodeAt(i);
        let two = key.charCodeAt(i);
        let xor = one ^ two;
        enc += String.fromCharCode(xor + str.length + 65)
    }
    return enc;
}
function fromXOR(oldstr, oldkey) {
    let str = String(oldstr);
    let key = nKey(str, oldkey);
    let enc = "";
    for (let i = 0; i < str.length; i++) {
        let one = str.charCodeAt(i) - str.length - 65;
        let two = key.charCodeAt(i);
        let xor = one ^ two;
        enc += String.fromCharCode(xor)
    }
    return enc;
}


//////////// DOM

let btn1 = document.getElementById(`btn1`)
let btn2 = document.getElementById(`btn2`)
let inputs = document.querySelectorAll(`input`)

/* inputs[4].addEventListener(`click`, name =()=> inputs[4].value = inputs[3].value)
inputs[5].addEventListener(`click`, name =()=> inputs[5].value = inputs[1].value) */

btn1.addEventListener(`click`, function name(event) {
    inputs[3].value = toXOR(inputs[0].value, inputs[1].value)
    
})
btn2.addEventListener(`click`, function name(event) {
    inputs[7].value = fromXOR(inputs[4].value, inputs[5].value)
})

/// старый вариант с шифром виженера на два языка
/* ;(function () {
    function normalizeKey(str, key) {
        if (str.length > key.length) {
            let newKey = key;
            for (let i = 0; Math.ceil(str.length / key.length) - 1 > i; i++) {
              newKey += key;
            }
            if (newKey.length > str.length) {
              newKey = newKey.slice(0, -(newKey.length - str.length));
            }
            return newKey.toUpperCase();
        } else if (str.length == key.length) {
              return key
        } else if (str.length < key.length) {
              return key.slice(0, -(key.length - str.length))
        }
      }
    ////////////// ENGLISH
    let min = 64;
    let max = 90;
    function remSpEng(str) {
        str = str.replace(/[ ]/g, "@").toUpperCase();
        return str.replace(/[,.!?]/g, "").toUpperCase();
    }
    function toEncEng(oldstr, oldkey) {
        let str = remSpEng(oldstr);
        let key = normalizeKey(str, oldkey);
        let enc = "";
        for (let i = 0; i < str.length; i++) {
            let sum = (str.charCodeAt(i) - min) + (key.charCodeAt(i) - min) + min;
            sum > max ? sum = sum - max + min - 1 : NaN;
            enc += String.fromCharCode(sum)
        }
        return enc;
    }
    
    function toDecrEng(oldstr, oldkey) {
        let str = remSpEng(oldstr);
        let key = normalizeKey(str, oldkey);
        let enc = "";
        for (let i = 0; i < str.length; i++) {
            let sum = (str.charCodeAt(i) - min) - (key.charCodeAt(i) - min) + min;
            sum < min ? sum = max - (min - 1 - sum): NaN;
            enc += String.fromCharCode(sum)
        }
        return enc.replace(/[@]/g, " ")
    }

    ////////// RUS
    let minrus = 1039;
    let maxrus = 1071;
    
    function remSpRus(str) {
        str = str.replace(/[ ]/g, "Џ").toUpperCase();
        return str.replace(/[,.!?-]/g, "").toUpperCase();
    }
    
    function toEncRus(oldstr, oldkey) {
        let str = remSpRus(oldstr);
        let key = normalizeKey(str, oldkey);
        let enc = "";
        for (let i = 0; i < str.length; i++) {
            let sum = (str.charCodeAt(i) - minrus) + (key.charCodeAt(i) - minrus) + minrus;
            sum > maxrus ? sum = sum - maxrus + minrus - 1 : NaN;
            enc += String.fromCharCode(sum)
        }
        return enc;
    }
    
    function toDecrRus(oldstr, oldkey) {
        let str = remSpRus(oldstr);
        let key = normalizeKey(str, oldkey);
        let enc = "";
        for (let i = 0; i < str.length; i++) {
            let sum = (str.charCodeAt(i) - minrus) - (key.charCodeAt(i) - minrus) + minrus;
            sum < minrus ? sum = maxrus - (minrus - 1 - sum): NaN;
            enc += String.fromCharCode(sum)
        }
        return enc.replace(/[Џ]/g, " ")
    }
    //// DOM
    btn1.addEventListener(`click`, function name(event) {
        if (/[A-Z0-9@]+/g.test(remSpEng(inputs[0].value)) && /[A-Za-z0-9]+/g.test(inputs[1].value)) {
            inputs[3].value = toEncEng(inputs[0].value, inputs[1].value)
        } else if (/[А-ЯЏ0-9]+/g.test(remSpRus(inputs[0].value)) && /[А-Яа-я0-9]+/g.test(inputs[1].value)) {
            inputs[3].value = toEncRus(inputs[0].value, inputs[1].value)
        }
    })
    btn2.addEventListener(`click`, function name(event) {
        if (/[A-Z@0-9]+/g.test(remSpEng(inputs[0].value)) && /[A-Za-z0-9]+/g.test(inputs[1].value)) {
            inputs[7].value = toDecrEng(inputs[4].value, inputs[5].value)
        } else if (/[А-ЯЏ0-9]+/g.test(remSpRus(inputs[0].value)) && /[А-Яа-я0-9]+/g.test(inputs[1].value)) {
            inputs[7].value = toDecrRus(inputs[4].value, inputs[5].value)
        }
    })
}) */
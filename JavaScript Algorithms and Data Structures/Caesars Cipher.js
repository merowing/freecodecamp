// method 1
function rot13(str) {
    const code = 'abcdefghijklmnopqrstuvwxyz';
    let decode = '';

    str = str.toLowerCase();
    for (let char of str) {
        let ind = code.indexOf(char);

        if (ind >= 0) {
            if (ind >= 13) {
                ind -= 13
            } else {
                ind += 13;
            }
        }
        
        decode += (ind >= 0)
            ? code[ind]
            : char;

        decode = decode.toUpperCase();
    }
    
    return decode;
}

// method 2
function rot13(str) {
    const letters = 'abcdefghijklmnopqrstuvwxyzabcdefghijklm';

    str = str
        .toLowerCase()
        .replace(/[a-z]/g, (p) => {
            const ind = letters.indexOf(p) + 13;
            return letters[ind];
        })
        .toUpperCase();

    return str;
}

// method 3
function rot13(str) {
    str = str
        .toLowerCase()
        .replace(/[a-z]/g, (p) => {
            const code = p.charCodeAt();
            const num = (code > 109)
                ? code - 13
                : code + 13;
            
            return String.fromCharCode(num);
        })
        .toUpperCase();

    return str;
}

console.log(rot13("free pizza!"));

let rot13 = (str) => {
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

console.log(rot13('serr cvmmn!'));

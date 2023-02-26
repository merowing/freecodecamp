// method 1
// function rot13(str) {
//     const code = 'abcdefghijklmnopqrstuvwxyz';
//     let decode = '';

//     str = str.toLowerCase();
//     for (let char of str) {
//         let ind = code.indexOf(char);

//         if (ind >= 0) {
//             if (ind >= 13) {
//                 ind -= 13
//             } else {
//                 ind += 13;
//             }
//         }
        
//         decode += (ind >= 0)
//             ? code[ind]
//             : char;

//         decode = decode.toUpperCase();
//     }
    
//     return decode;
// }

// method 2
function rot13(str) {
    let letters = 'abcdefghijklmnopqrstuvwxyzabcdefghijklm';

    str = str.toLowerCase().replace(/[a-z]/g, (p) => {
        let ind = letters.indexOf(p) + 13;
        return letters[ind];
    });
    str = str.toUpperCase();

    return str;
}

console.log(rot13('free pizza!'));

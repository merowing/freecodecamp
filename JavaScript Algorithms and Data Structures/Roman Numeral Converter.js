const numbers = {
    1: 'I',
    4: 'IV',
    5: 'V',
    9: 'IX',
    10: 'X',
    40: 'XL',
    50: 'L',
    90: 'XC',
    100: 'C',
    400: 'CD',
    500: 'D',
    900: 'CM',
    1000: 'M',
};

// method 1
// function convertToRoman(num) {

//     const keys = Object.keys(numbers);

//     function arabicsSequence(firstNumber, pow = 0) {
//         let arr = [];
//         const previousIndex = (num) => {
//             return keys.findIndex(el => el > num) - 1;
//         }
//         const dividerIndex = previousIndex(firstNumber);
//         let divider = (dividerIndex < 0)
//             ? keys.at(-1)
//             : keys[dividerIndex];
        
//         while (firstNumber > 0) {
//             const remainder = firstNumber % divider;
            
//             if (divider > 1 * 10**pow) {
//                 const num = firstNumber - remainder;
//                 if (!keys.includes(num)) {
//                     let returnedArray = arabicsSequence(num, ++pow);
//                     arr = [...arr, ...returnedArray];
//                     pow -= 1;
//                 } else {
//                     arr.push(num);
//                 }

//                 divider = keys[ previousIndex(remainder) ];
//                 firstNumber = remainder;
//             } else {
//                 arr.push(divider);
//                 firstNumber -= divider;
//             }
//         }

//         return arr;
//     }

//     const arabics = arabicsSequence(num);
//     num = (arabics.length)
//         ? arabics.map(item => numbers[item]).join('')
//         : '';

//     return num;
// }

// console.log(convertToRoman(45));

// method 2
// function convertToRoman(num) {
//     const sequence = num.toString().split('');
//     let pow = sequence.length - 1;
//     num = sequence.reduce((arr, strNumber) => {
//         const number = parseInt(strNumber);
//         let int = number * 10**pow;
//         let temp_arr = [];

//         while(!numbers[int] && int > 0) {
//             int = int - 10**pow;
//             temp_arr.push(10**pow);
//         }

//         if(int > 0) {
//             arr = [...arr, int, ...temp_arr];
//         }

//         pow -= 1;
//         return arr;
//     }, []);

//     num = num.map(elem => numbers[elem]).join('');

//     return num;
// }

// console.log(convertToRoman(3999));

// method 3
function convertToRoman(num) {
    const sequence = [];
    let pow = num.toString().length - 1;
    let remainder = num % 10**pow;
    
    while (remainder > 0) {
        if (num - remainder > 0) {
            sequence.push(num - remainder);
        }
        num = remainder;
        pow -= 1;
        if (pow === 0) sequence.push(remainder);
        remainder = remainder % 10**pow;
    }

    num = sequence.reduce((arr, current) => {
        let temp_arr = [];
        while (!numbers[current]) {
            let len = 10**(current.toString().length - 1);
            current = current - len;
            temp_arr.push(numbers[len]);
        }

        return [
            ...arr,
            numbers[current],
            ...temp_arr
        ];
    }, []).join('');

    return num;
}

console.log(convertToRoman(45));

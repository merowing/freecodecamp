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
function convertToRoman(num) {

    const keys = Object.keys(numbers);

    function arabicsSequence(firstNumber, pow = 0) {
        let arr = [];
        const previousIndex = (num) => {
            return keys.findIndex(el => el > num) - 1;
        }
        const dividerIndex = previousIndex(firstNumber);
        let divider = (dividerIndex < 0)
            ? keys.at(-1)
            : keys[dividerIndex];
        
        while (firstNumber > 0) {
            const remainder = firstNumber % divider;
            
            if (divider > 1 * 10**pow) {
                const num = firstNumber - remainder;
                if (!keys.includes(num)) {
                    let returnedArray = arabicsSequence(num, ++pow);
                    arr = [...arr, ...returnedArray];
                    pow -= 1;
                } else {
                    arr.push(num);
                }

                divider = keys[ previousIndex(remainder) ];
                firstNumber = remainder;
            } else {
                arr.push(divider);
                firstNumber -= divider;
            }
        }

        return arr;
    }

    const arabics = arabicsSequence(num);
    num = (arabics.length)
        ? arabics.map(item => numbers[item]).join('')
        : '';

    return num;
}

console.log(convertToRoman(45));

// method 1
function convertToRoman(num) {
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

    const keys = Object.keys(numbers);

    function test(firstNumber, n = 0) {
        let arr = [];
        const rIndex = (num) => keys.findIndex(el => el > num) - 1;
        let dividerIndex = rIndex(firstNumber);
        let divider = (dividerIndex < 0) ? keys.at(-1) : keys[dividerIndex];
        
        while(firstNumber > 0) {
            const remainder = firstNumber % divider;
            
            if(divider > 1 * 10**n) {
                const num = firstNumber - remainder;
                if(!keys.includes(num)) {
                    let returnedArray = test(num, ++n);
                    n -= 1;

                    arr = [...arr, ...returnedArray];
                }else {
                    arr.push(num);
                }

                divider = keys[rIndex(remainder)];
                firstNumber = remainder;
            }else {
                arr.push(divider);
                firstNumber -= divider;
            }
        }

        return arr;
    }

    const arabics = test(num);
    num = (arabics.length)
        ? arabics.map(item => numbers[item]).join('')
        : 0;

    return num;
}

console.log(convertToRoman(45));

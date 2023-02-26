function checkCashRegister(price, cash, cid) {
    const statusString = ["OPEN", "CLOSED", "INSUFFICIENT_FUNDS"];
    const units = [
        ["PENNY", 0.01],
        ["NICKEL", 0.05],
        ["DIME", 0.1],
        ["QUARTER", 0.25],
        ["ONE", 1],
        ["FIVE", 5],
        ["TEN", 10],
        ["TWENTY", 20],
        ["ONE HUNDRED", 100]
    ];

    let difference = fixedValue(cash - price);
    let status = statusString[0];
    let moneyLeft = false;

    function fixedValue(val) {
        return parseFloat(val.toFixed(2));
    }

    let change = [...cid]
        .reverse()
        .reduce((arr, cid_unit) => {
            let [cid_currency, cid_value] = cid_unit;
            const [[, unit_value]] = units.filter(item => item[0] === cid_currency);
            
            if (difference >= unit_value && cid_value > 0) {
                let money = 0;
                while (difference >= unit_value && cid_value > 0) {
                    difference = fixedValue(difference - unit_value);
                    
                    money = fixedValue(money + unit_value);
                    cid_value = fixedValue(cid_value - unit_value);
                }
                arr.push([cid_currency, money]);
            }

            if (cid_value > 0) moneyLeft = true;

            return arr;
        }, []);

    if (difference > 0) {
        status = statusString[2];
        change = [];
    }
    if (difference === 0 && !moneyLeft) {
        status = statusString[1];
        change = [...cid];
    }

    return {
        status,
        change,
    };
}

console.log(checkCashRegister(
    19.5,
    20,
    [
        ["PENNY", 1.01],
        ["NICKEL", 2.05],
        ["DIME", 3.1],
        ["QUARTER", 4.25],
        ["ONE", 90],
        ["FIVE", 55],
        ["TEN", 20],
        ["TWENTY", 60],
        ["ONE HUNDRED", 100]
    ]
));

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

// method 2
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
    const fixedNumber = (val) => parseFloat(val.toFixed(2));
    const getDefaultValue = (currency) => {
        const index = units.findIndex(([item]) => item === currency);
        return units[index][1];
    }

    let change = [];
    let status = statusString[0];
    let difference = fixedNumber(cash - price);
    let drawerCash = cid.reduce((sum, [, val]) => {
        return fixedNumber(sum + val)
    }, 0);

    cid.reverse();
    for (let [currency, value] of cid) {
        const defaultValue = getDefaultValue(currency);

        if (difference >= defaultValue && value > 0) {
            let remainder = fixedNumber((difference*100) % (defaultValue*100))/100;
            const needCash = fixedNumber(difference - remainder);

            const getCash = (needCash <= value)
                ? needCash
                : value;
            
            difference = fixedNumber(difference - getCash);
            drawerCash = fixedNumber(drawerCash - getCash);

            change.push(
                [
                    currency,
                    getCash,
                ]
            );
        }
    }

    if (drawerCash === 0 && difference === 0) {
        status = statusString[1];
        change = cid.reverse();
    }
    
    if (difference > 0) {
        status = statusString[2];
        change = [];
    }

    return {
        status,
        change,
    };
}

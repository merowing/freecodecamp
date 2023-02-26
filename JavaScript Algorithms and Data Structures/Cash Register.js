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

    let difference = parseFloat((cash - price).toFixed(2));
    let status = statusString[0];
    let moneyLeft = false;

    let change = [...cid].reverse().reduce((arr, cid_unit) => {
        let [currency, value] = cid_unit;
        const [[, unit_value]] = units.filter(item => item[0] === currency);
        
        if(difference >= unit_value && value > 0) {
            let money = 0;
            while(difference >= unit_value && value > 0) {
                difference = parseFloat((difference - unit_value).toFixed(2));
                
                money = parseFloat((money + unit_value).toFixed(2));
                value = parseFloat((value - unit_value).toFixed(2));
            }
            arr.push([currency, money]);
        }

        if(value > 0) moneyLeft = true;

        return arr;
    }, []);

    if(difference > 0) {
        status = statusString[2];
        change = [];
    }
    if(difference === 0 && !moneyLeft) {
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
        ["PENNY", 0.5],
        ["NICKEL", 0],
        ["DIME", 0],
        ["QUARTER", 0],
        ["ONE", 0],
        ["FIVE", 0],
        ["TEN", 0],
        ["TWENTY", 0],
        ["ONE HUNDRED", 0]
    ]
));

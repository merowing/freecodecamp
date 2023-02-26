function palindrome(str) {
    str = str.replace(/[^a-z0-9]+/gi, '').toLowerCase();

    for(let [index, value] of Object.entries(str)) {
        if(value !== str.at(-1 - index)) {
            return false;
        }
    }

    return true;
}

console.log(palindrome("eye"));

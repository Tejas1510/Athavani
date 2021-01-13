export function email(email) {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function mobile(mobile) {
    const re = /^\d{10}$/;
    return re.test(mobile);
}

export function password(password) {
    return password.length > 6;
}

export function match(str1, str2) {
    return str1.localeCompare(str2) === 0 ? true : false;
}

export function empty(str) {
    return str === '';
}
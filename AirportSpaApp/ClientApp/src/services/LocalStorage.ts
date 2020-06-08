export function setLocalStorageObject(key, value) {
    localStorage.setItem(key, JSON.stringify(value).toString());
}

export function getLocalStorageObject<T>(key, transformerFn?: (val: T) => T): T {
    let value = null;

    try {
        value = JSON.parse(localStorage.getItem(key));

        if (typeof transformerFn === 'function') {
            value = transformerFn(value);
        }
    } catch (e) {
        localStorage.setItem(key, null);
    }

    return value;
}

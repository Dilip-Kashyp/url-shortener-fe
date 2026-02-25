const getItem = (key: string) => {
    return sessionStorage.getItem(key);
}

const setItem = (key: string, value: string) => {
    sessionStorage.setItem(key, value);
}

const removeItem = (key: string) => {
    sessionStorage.removeItem(key);
}

const clear = () => {
    sessionStorage.clear();
}

export { getItem, setItem, removeItem, clear };
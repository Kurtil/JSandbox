let ob = {
    prop1: "coucou",
    prop2: true,
    prop3: null,
    prop4: 4,
};

const convert = ob => {
    Object.keys(ob).forEach(key => {
        let keyValue = ob[key];
        Object.defineProperty(ob, key, {
            get() {
                console.log(`get access to ${key}`);
                return keyValue;
            },
            set(newValue) {
                console.log(`set access to ${key}, old value : ${keyValue}, new value : ${newValue}`);
                keyValue = newValue;
            }
        });
    })
}

convert(ob);

const a = ob.prop1;
console.log(`a = ${a}`);

ob.prop3 = 33;

console.log(`ob.prop3 = ${ob.prop3}`);

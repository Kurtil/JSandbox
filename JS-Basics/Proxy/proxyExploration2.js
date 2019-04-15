const state = {
    count: 1,
    price: 20,
    quantity: 5,
};

const p = new Proxy(state, {
    set(target, property, value) {
        if (property === "count") {
            ++target[property];
        } else {
            target[property] = value;
        }
    }
});

p.price = 30;
p.quantity = 4;
p.count = 1212;
p.count = undefined;

console.log(JSON.stringify(state));

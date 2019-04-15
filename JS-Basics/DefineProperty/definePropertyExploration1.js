const state = {
    price: 10,
    quantity: 3
}

Object.defineProperty(state, 'total', {
    get() {
        return this.price * this.quantity;
    },
    set() {
        throw 'Cannot set total';
    }
});

console.log(state.total);

state.price = 12;

console.log(state.total);

class Container {
    constructor(value) {
        this.value = value;
    }

    add(value) {
        this.value += value;
        return this;
    }

    mul(value) {
        this.value *= value;
        return this;
    }

    sub(value) {
        this.value -= value;
        return this;
    }

    div(value) {
        if (value === 0) throw new Error("cannot divide by zero");
        this.value /= value;
        return this;
    }

    printVal() {
        console.log(this.value);
    }
}

const ob = new Container(10);

ob.add(5).div(3).sub(2).mul(10).printVal();

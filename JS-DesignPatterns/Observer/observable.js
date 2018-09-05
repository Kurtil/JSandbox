class Observable {

    constructor() {
        this._data = "";
        this.observerList = []
    }

    set data(value) {
        this._data = value;
        this.notify();
    }

    get data() {
        return this._data
    }

    subscribe(observer) {
        this.observerList.push(observer)
    }

    notify() {
        for (const observer of this.observerList) {
            observer.update(this.data)
        }
    }
}

module.exports = Observable
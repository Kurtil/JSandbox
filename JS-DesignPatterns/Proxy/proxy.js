module.exports = class Prox {
    constructor(obj) {
        this.obj = obj;
    }

    get() {
        console.log("test if access is granted.... DONE");
        return this.obj.get();
    }
}

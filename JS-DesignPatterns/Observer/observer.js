class Observer {

    constructor(name) {
        this.name = name;
    }

    update(data) {
        console.log(`As ${this.name}, I recieved data : ${data}`)
    }
}

module.exports = Observer
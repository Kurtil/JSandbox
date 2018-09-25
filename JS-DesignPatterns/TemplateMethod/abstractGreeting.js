module.exports = class AbstractGreeting {
    templateMethode() {
        this.greetingStart();
        console.log('This is the core of the methode that do not vary over implementations');
        this.greetingEnds();
    }
}
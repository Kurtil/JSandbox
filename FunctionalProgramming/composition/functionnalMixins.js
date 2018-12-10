const pipe = (...Fns) => (o = {}) => Fns.reduce((acc, f) => f(acc), o);

const flying = (o = {}) => {
    let isFlying = false;

    return Object.assign({}, o, {
        fly() {
            isFlying = true;
            return this;
        },
        isFlying() {
            return isFlying;
        },
        land() {
            isFlying = false;
            return this;
        },
        printFlying() {
            console.log(isFlying);
            return this;
        }
    });
}

const quacking = (o = {}) => Object.assign({}, o, {
    quack() {
        console.log('Quack !');
        return this;
    }
});

const bird = flying();
const isFlying = bird.fly().printFlying().land().printFlying().fly().printFlying().isFlying();

const quackingBird = quacking(flying());

quackingBird.fly().printFlying().quack();

const pipedQuackingBird = pipe(quacking, flying)();

pipedQuackingBird.fly().printFlying().quack();
const createBird = name => Object.assign({}, {
    get name() {
        return name;
    },
    set name(value) {
        name = value;
    }
});

const bird = createBird('birdy');
console.log(bird.name);
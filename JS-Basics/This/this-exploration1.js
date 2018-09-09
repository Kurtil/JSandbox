function foo() {
    this.x = 'coucou';
    this.y = 'colo';
}

const bar = {}
foo.call(bar);
console.log(bar);
console.log('end of file');
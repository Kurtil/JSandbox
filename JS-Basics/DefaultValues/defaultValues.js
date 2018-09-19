// Default value in association with destructuring
const foo = ({ arg: { a = 2, b = 3, c = 4 } = {} } = { arg: {} }) => {
    console.log(a, b, c);
}

foo(); // no error thanks to the default value
foo({}); // no error thanks to the default value

foo({ arg: {} }); // will log the default values
foo({ arg: { a: 10, b: "coucou", c: "yo" } }); // will log the argument values

// Destructuring + default value can be very handy in association with null object pattern !

// for object properties, a = 2 is shorthand for a : a = 2
const foo2 = ({a = 2, b : x = 3} = {}) => console.log(a, x);

foo2();
foo2({a : 200, b : "no X"});
// Warning will destructuring : in this example, argument object have to have an arg property!
const foo = ({ arg: { a = 2, b = 3, c = 4 } }) => {
    console.log(a,b,c);
}

// foo({}); // destructuring error... see default value to handle this case safely

foo({arg : {}}); // will log the default values
foo({arg : {a: 10, b:"coucou", c : "yo"}}); // will log the argument values
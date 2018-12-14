/***** void operator - evaluate the expression and retun undefined *****/
console.log(void 0)
void console.log('test')

/***** Optional constructor brackets *****/
function Ob() {
    if (!new.target) throw 'You must call this function with the new keyword';
    this.message = 'coucou';
}

try {
    Ob();
} catch (err) {
    console.log(err);
}

const ob = new Ob; // Missing contructor bracket if no parameters
console.log(ob.message);

/***** IIFE optional brackets *****/
(function () {
    console.log('IIFE');
})();
// extra brackets are needed just to tell the JavaScript parser, that the upcoming code is a Functional Expression and not a Function
// it can be replace by unary operator void, +, !, -, etc.
void function () {
    console.log('IIFE 2');
}();

// or assignment
const returnedValue = function () {
    return 'Jean';
}();

console.log(returnedValue);

/***** Function properties *****/
function foo() {
    if (!foo.cptr) foo.cptr = 0;
    return foo.cptr++;
}

console.log(foo());
console.log(foo());
console.log(foo());

foo.cptr = 100;

console.log(foo());

/***** Labeled statement *****/
const arr1 = [2, 3, 4];
const arr2 = [0, 1, 2, 3, 4, 5, 6];
for_Loop_1:
for (el of arr1) {
    for_Loop_2:
    console.log(`first loop at ${el}`);
    for (el2 of arr2) {
        console.log(`second loop at ${el2}`);
        if (el2 === el) {
            break for_Loop_1;
        }
    }
}

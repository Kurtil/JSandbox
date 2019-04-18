// the handler is an object with "traps" that can redefine basic action like get
// which redefin the access to properties
const handler = {
    get(obj, prop) {
        if (prop in obj) {
            return obj[prop];
        } else {
            return "Property not defined.";
        }
    }
};

const obj = {
    name: "Jean",
    age: 32,
    hobbies: ["surf", "traveling"]
};

const proxy = new Proxy(obj, handler);

console.log(proxy.name);
console.log(proxy.age);
console.log(proxy.hobbies);
console.log(proxy.unknownProp); // This one is interesting ;)

obj.unknownProp = "coucou";

console.log(proxy.unknownProp); // also, proxy are not settled at creation time !

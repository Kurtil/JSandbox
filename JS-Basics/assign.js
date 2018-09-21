const ob = {
    key: 'value'
};

console.log(ob);

Object.assign(ob, {key:'updated value'});

console.log(ob);

// the object.assign update values if key is already present in the object
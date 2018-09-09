(() => {
    // variables defined with var are locals to the function
    // let/const are block scoped
    let x;
    if (true) {
        var a = 2;
        const b = 2;
    }
    for (let c;;){}
    for (var d;;){}
})()
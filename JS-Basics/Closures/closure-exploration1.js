const x = 'coucou';

setTimeout(() => {
    setTimeout(() => {
        console.log(x);
    }, 2000);
}, 2000);

// the callback capture the env. This is why x is not undefined in it.
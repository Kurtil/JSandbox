const arr = [1, 2, 3, 4, 5];

const p = new Proxy(arr, {
    set(target, key, value) {
        console.log(target, key, value);
    }
});

// index change can be detected
p[1] = 'coucou';
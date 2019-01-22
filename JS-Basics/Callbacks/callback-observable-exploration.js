const subscribe = observer => {
    let i = 0;
    setInterval(() => {
        observer.next(i++);
    }, 1000);
};

subscribe({
    next(i) {
        console.log(i);
    }
})
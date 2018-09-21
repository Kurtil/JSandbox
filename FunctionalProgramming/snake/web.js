const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let state = initialState();

// Utils methods to get x and y position
const x = col => Math.round(col * canvas.width / state.cols);
const y = row => Math.round(row * canvas.height / state.rows);


const draw = () => {
    // clear and repaint canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw snake
    ctx.fillStyle = "green";
    state.snake.map(p => ctx.fillRect(x(p.x), y(p.y), x(1), y(1)));

    // draw apple
    ctx.fillStyle = "red";
    ctx.fillRect(x(state.apple.x), y(state.apple.y), x(1), y(1));

    // add crash
    if (state.snake.length === 0) {
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

// we want the game to have an aspect laggy
const step = t1 => t2 => {
    if (t2 - t1 > 100) {
        state = next(state);
        // imitate mouvement
        // state.snake = [...state.snake.map(p => ({ x: ++p.x, y: p.y }))]
        draw();
        window.requestAnimationFrame(step(t2));
    } else {
        window.requestAnimationFrame(step(t1));
    }
}

// need to add event listener for user input
window.addEventListener('keydown', e => {
    switch(e.key) {
        case('q') : case('ArrowLeft') : state = enqueue(state, WEST); break;
        case('z') : case('ArrowUp') : state = enqueue(state, NORTH); break;
        case('d') : case('ArrowRight') : state = enqueue(state, EAST); break;
        case('s') : case('ArrowDown') : state = enqueue(state, SOUTH); break;
    }
})

// main
state.snake.push(...[{ x: 1, y: 1 }, { x: 2, y: 1 }])
draw();
window.requestAnimationFrame(step(0));


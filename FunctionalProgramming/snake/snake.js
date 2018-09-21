
const EAST = { x: 1, y: 0 };
const NORTH = { x: 0, y: -1 };
const WEST = { x: -1, y: 0 };
const SOUTH = { x: 0, y: 1 };

const initialState = () => ({
    cols: 20,
    rows: 14,
    moves: [EAST],
    snake: [],
    apple: { x: 16, y: 2 },
});
const nextApple = state => willEat(state) ? rdmPos(state) : state.apple;
const willEat = state => pointEq(state.apple)(nextHead(state));
const willCrash = state => state.snake.find(pointEq(nextHead(state))); // here we can see the power of currying
const nextMoves = state => state.moves.length > 1 ? dropFirst(state.moves) : state.moves
const nextHead = state => state.snake.length === 0 ?
    { x: 2, y: 2 } :
    {
        x: mod(state.cols)(state.snake[0].x + state.moves[0].x),
        y: mod(state.rows)(state.snake[0].y + state.moves[0].y)
    }

const nextSnake = snake =>
    willCrash(state) ? []
        : (willEat(state) ?
            [nextHead(state)].concat(state.snake) :
            [nextHead(state)].concat(dropLast(state.snake))
        );

const rdmPos = state => ({
    x: rdm(0)(state.cols - 1),
    y: rdm(0)(state.rows - 1)
})

const next = spec({
    cols: prop('cols'),
    rows: prop('rows'),
    moves: nextMoves,
    snake: nextSnake,
    apple: nextApple,
})
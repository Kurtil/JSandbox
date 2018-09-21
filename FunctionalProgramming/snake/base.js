
const pointEq   = p1 => p2 => p1.x === p2.x && p1.y === p2.y;
const dropLast  = arr => arr.slice(0, arr.length -1);
const dropFirst = ([,...arr]) => arr;
const rdm       = min => max => Math.floor(Math.random() * max) + min;
const mod       = x => y => ((y % x) + x) % x;
const prop      = k => o => o[k];
const objOf     = k => v => {let o = {}; o[k] = v; return o};
const spec      = o => x => Object.keys(o).map(k => objOf(k)(o[k](x)))
    .reduce((acc, o) => Object.assign(acc, o));
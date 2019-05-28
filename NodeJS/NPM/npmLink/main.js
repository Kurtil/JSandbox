// Go to dep, run npm link, then go back here, run npm link dep1
import log from 'dep1';

console.log('main.js');

log('Yes ! :D');
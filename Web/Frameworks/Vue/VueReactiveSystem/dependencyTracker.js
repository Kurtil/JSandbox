class Dep {
    constructor() {
        this.subscribers = new Set;
    }

    depend() {
        if (currentUpdate) {
            this.subscribers.add(currentUpdate);
        }
    }

    notify() {
        this.subscribers.forEach(sub => sub());
    }
}

function observe(ob) {
    Object.keys(ob).forEach(key => {
        let keyValue = ob[key];
        const dep = new Dep;
        Object.defineProperty(ob, key, {
            get() {
                dep.depend();
                return keyValue;
            },
            set(newValue) {
                keyValue = newValue;
                dep.notify();
            }
        });
    });
}

function autorun(update) {
    function wrappedRun() {
        currentUpdate = wrappedRun;
        update();
        currentUpdate = null;
    }
    wrappedRun();
}

let currentUpdate = null;

/*********************************************************************/

const state = {
    count: 0,
}

observe(state);

autorun(() => console.log(state.count));

state.count++;
module.exports = {
    events: new Map(),
    on(event, cb) {
        if (this.events.has(event)) {
            this.events.get(event).push(cb);
        } else {
            this.events.set(event, [cb]);
        }
    },
    emit(event, payload = null) {
        return this.events.get(event) ?
            this.events.get(event).forEach(cb => cb(payload)) :
            null;
    },
    removeListener(event) {
        const eventHandlers = this.events.get(event);
        let removedListener = null;
        if (eventHandlers) {
            removedListener = this.events.get(event).pop();
            if (eventHandlers.length === 0) {
                this.events.delete(event);
            }
        }
        return removedListener;
    },
    removeAllListener(event) {
        return this.events.delete(event);
    },
    clear() {
        this.events.clear();
    }
}

const eventSystem = require('./customEventSystem');

afterEach(() => {
    eventSystem.clear();
});

test("can add event listener", () => {
    let log = null;
    eventSystem.on("event1", () => {
        log = "event1";
    });
    eventSystem.emit("event1");
    expect(log).toBe("event1");
});

test("can emit un-saved event", () => {
    let log = null;
    eventSystem.on("event1", () => {
        log = "event1";
    });
    eventSystem.emit("event2");
    expect(log).toBe(null);
});

test("can add multiple event listener", () => {
    let counter = 0;
    eventSystem.on("event1", () => {
        counter += 1;
    });
    eventSystem.on("event1", () => {
        counter += 2;
    });
    eventSystem.emit("event1");
    expect(counter).toBe(3);
});

test("can remove event listener one by one", () => {
    let counter = 0;
    eventSystem.on("event1", () => {
        counter += 1;
    });
    eventSystem.on("event1", () => {
        counter += 2;
    });
    eventSystem.on("event1", () => {
        counter += 4;
    });
    eventSystem.removeListener("event1");
    eventSystem.emit("event1");
    expect(counter).toBe(3);
});

test("can remove all event listener", () => {
    let counter = 0;
    eventSystem.on("event1", () => {
        counter += 1;
    });
    eventSystem.on("event1", () => {
        counter += 2;
    });
    eventSystem.on("event1", () => {
        counter += 4;
    });
    eventSystem.removeAllListener("event1");
    eventSystem.emit("event1");
    expect(counter).toBe(0);
});

test("events are independent", () => {
    let counter = 0;
    eventSystem.on("event1", () => {
        counter += 1;
    });
    eventSystem.on("event2", () => {
        counter += 1;
    });
    eventSystem.emit("event1");
    expect(counter).toBe(1);
});

test("multi events", () => {
    let counter = 0;
    eventSystem.on("event1", () => {
        counter += 1;
    });
    eventSystem.on("event2", () => {
        counter += 2;
    });
    eventSystem.emit("event1");
    eventSystem.emit("event2");
    expect(counter).toBe(3);
});

test("can clear all events", () => {
    let counter = 0;
    eventSystem.on("event1", () => {
        counter += 1;
    });
    eventSystem.on("event2", () => {
        counter += 2;
    });
    eventSystem.clear();
    eventSystem.emit("event1");
    eventSystem.emit("event2");
    expect(counter).toBe(0);
});
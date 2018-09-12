Observable = require('./observable')
Observer = require('./observer')

const observable = new Observable()
const observer1 = new Observer('Observer ONE')
const observer2 = new Observer('Observer TWO')
const observer3 = new Observer('Observer THREE')

observable.data = "first data"

observable.subscribe(observer1)
observable.subscribe(observer2)
observable.subscribe(observer3)

observable.data = "second data"
observable.data = "third data"
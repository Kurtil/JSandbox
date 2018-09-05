var x = function* () {
    var i = 0
    while (true) console.log(yield i++)
}
var it = x()
console.log(it.next().value)
console.log(it.next().value)
console.log(it.next("coucou").value)
console.log(it.next().value)

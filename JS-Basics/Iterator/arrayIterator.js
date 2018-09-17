const monoLog = (arg) => console.log(arg);

const arr = ["coucou", 1, "test", true];
monoLog(arr.length)
arr["7"] = "X"; // numerical prop increase length
monoLog(arr.length)
arr["te"] = "bug" // non numerical prop does not increase length nad will not be irerable
monoLog(arr.length)
monoLog("--- for each call ---")
arr.forEach(monoLog);
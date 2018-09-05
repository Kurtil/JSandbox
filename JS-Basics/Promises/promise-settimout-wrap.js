wait = ms => new Promise(resolve => setTimeout(resolve, ms));

wait(2000).then(() => console.log("nice trick !")).catch(console.log);
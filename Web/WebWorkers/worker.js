console.log("I am the worker starting");
onmessage = e => {
  console.log(`Worker received message ${e.data}`);
  self.setTimeout(() => {
    postMessage("Finished");
  }, 2000);
};

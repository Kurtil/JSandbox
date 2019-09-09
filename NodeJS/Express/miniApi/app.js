const express = require("express");
const morgan = require("morgan");
const router = express.Router();
const app = express();

// MIDDLEWARES
const logger = (req, res, next) => {
  console.log("There is someone ! :P");
  next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));
app.use(logger);

// ROUTES
app.get("/", (req, res) => {
  res.send("Hello fox :) \n");
});

// ROUTED ROUTES
router.use((req, res, next) => {
  console.log("Time : " + Date.now());
  next();
});

router.get("/:id", (req, res) => {
  console.log("Query : " + JSON.stringify(req.query));
  res.send(req.params);
});

router.post("/", (req, res) => {
  console.log(req.body); // This use the json body parser or urlencoded
  res.send("Thanks!");
});

app.use("/data", router);

// No mathing route ? 404
app.use((req, res) => {
  res.status(404).send("not found\n");
});

app.listen(3000);

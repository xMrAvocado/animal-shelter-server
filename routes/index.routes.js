const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(418).json({ message: "all good here!" });
});

const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

const animalRouter = require("./animal.routes");
router.use("/animals", animalRouter);

const eventRouter = require("./event.routes");
router.use("/events", eventRouter);

// ...

const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);

// ...

module.exports = router;
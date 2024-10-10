const express = require("express");
const carsRouter = require("./cars");

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        message: "Ping Successfuly!",
    });
});

router.use("/cars", carsRouter);

module.exports = router;
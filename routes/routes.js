const express = require('express');
const router = express.Router();

router.get("/", (req, res) =>
res.status(200)
.json({ message: "Hello from the server !",
router:"Express-Routes"
}));

router.post("/", (req, res) =>
res
.status(200)
.json({ message: "You can post to this endpoint !",
router:"Express-Routes"}));
module.exports = router;
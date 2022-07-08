const router = require("express").Router();

router.get("/get", (req, res) => {
   res.send("Get user success!");
});

router.post("/post", (req, res) => {
   const username = req.body.username;
   res.send("Username: " + username);
});

module.exports = router;
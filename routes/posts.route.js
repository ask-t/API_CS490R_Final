const express = require("express")
const router = express.Router()


router.use( (req, res, next) =>{
  console.log("A request came in...")
  next();
});

router.get("/test", function(req, res) {
  res.send("Hello World!")
});
router.get("/testAPI", function(req, res) {
  const resObject = {
    message: "Test API is working",
    user: req.user
  }
  return res.send(resObject)
});

module.exports = router;
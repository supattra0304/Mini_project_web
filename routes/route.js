const express = require("express");
const router = express.Router();

const {
  getMonth,
  postMonth,
  deleteMonth,
  getDataSend,
} = require("../controllers/month");
const { getYear, postYear } = require("../controllers/year");

router.get("/", (req, res) => {
  res.render("includes/header",{title: "Home"});
});

router.get("/about", (req, res) => {
  res.render("about",{title: "About"});
});


router.get("/month", getMonth);
router.post("/month", postMonth);
router.delete("/month_drop", deleteMonth);
router.get("/month_data", getDataSend);

router.get("/year", getYear);
router.post("/year", postYear);

module.exports = router;

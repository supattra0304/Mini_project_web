const express = require("express");
const router = express.Router();

const {
  getMonth,
  postMonth,
  deleteMonth,
  getDataSend,
} = require("../controllers/month");

const { getYear, postYear } = require("../controllers/year");

const {addDaily} = require("../controllers/add")


router.get("/", (req, res) => {
  res.render("home",{title: "Home"});
});

router.get("/add", (req, res) => {
  res.render("add", {title: "Add your mood"});
});

router.get("/about", (req, res) => {
  res.render("about", {title: "About"});
});

router.get("/team", (req, res) => {
  res.render("team", {title: "Team"});
});

router.get("/month", getMonth);
router.post("/month", postMonth);
router.delete("/month_drop", deleteMonth);
router.get("/month_data", getDataSend);

router.get("/year", getYear);
router.post("/year", postYear);

router.post("/add",addDaily)



module.exports = router;

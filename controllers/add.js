const moment = require("moment");
const {getMonth,postMonth} = require("./month")
const { Daily } = require("../models/daily");

const addDaily = async (req, res) => {
  let { date, note, mood } = req.body;
  if (date === undefined || date.trim().length === 0 || mood === undefined) {
    return res
      .status(400)
      .json({ status: "Bad request", message: "Empty input" });
  }
  // แปลงรูปแบบวันที่ใหม่
  const datesave = moment(date, "YYYY-MM-DD").toDate();
  if (note === undefined || note.trim().length === 0) {
    note = "....................";
  }

  const dateString = "2023-10-31";
  const dateParts = dateString.split("-");
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]);
  
  const result = { month, year };

  const newData = new Daily({
    date: datesave,
    note: note,
    mood: mood,
  });
  const saveData = await newData.save();
  if (saveData) {
    console.log("Data saved successfully");

    const fakeReq = {
      body: result,
    };
    
    await postMonth(fakeReq, res);

  } else {
    return res
      .status(400)
      .json({ status: "Bad request", message: "Failed to save data" });
  }
};

module.exports = { addDaily };

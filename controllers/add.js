const moment = require("moment");
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

  if (note === undefined || note.trim.length === 0) {
    note = "....................";
  }

  const newData = new Daily({
    date: datesave,
    note: note,
    mood: mood,
  });

  const saveData = await newData.save()
  if (saveData) {
    console.log("Data saved successfully");
    return res.status(201).json({ status: "Created", message: "Data saved successfully" });
  } else {
    console.log("Failed to save data");
    return res.status(400).json({ status: "Bad request", message: "Failed to save data" });
  }
};

module.exports = { addDaily };

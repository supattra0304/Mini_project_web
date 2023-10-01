const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DailyShema = new Schema({
  date: { type: Date, required: true },
  note: { type: String, required: true },
  mood: { type: Number, require: true },
});
const Daily = mongoose.model("daily", DailyShema);

module.exports = {
  Daily,
};

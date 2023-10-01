const { Daily } = require("../models/daily");
const dataSend = [];
let daysInCurrentMonth = 0;
let year = null;
let moodColors = null;
const moodCounts = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
};

const allMonth = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const colorsMood = [
  { num: 1, color: "purple" },
  { num: 2, color: "red" },
  { num: 3, color: "blue" },
  { num: 4, color: "yellow" },
  { num: 5, color: "green" },
];

const getYear = async (req, res) => {
    console.log(year)
  if (year === null) {
    year = 2023;
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    const allData = await Daily.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });

    allData.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });

    allData.forEach((item) => {
      const { mood } = item;
      if (moodCounts[mood] !== undefined) {
        moodCounts[mood]++;
      }
    });

    // สร้าง moodColorsByYearMonth
    const moodColorsByYearMonth = allMonth.map((monthName, monthIndex) => {
      const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
      const moodColors = Array.from({ length: daysInMonth }, (_, dayIndex) => {
        const date = new Date(year, monthIndex, dayIndex + 1);
        const matchingData = allData.find((data) => {
          const dataDate = new Date(data.date);
          return (
            dataDate.getFullYear() === year &&
            dataDate.getMonth() === monthIndex &&
            dataDate.getDate() === dayIndex + 1
          );
        });

        if (matchingData) {
          const colorObj = colorsMood.find(
            (obj) => obj.num === matchingData.mood
          );
          return colorObj.color;
        } else {
          return "";
        }
      });
      return moodColors;
    });

    moodColors = moodColorsByYearMonth;
  }
  console.log(moodCounts);
  res.render("year", { moodColors, year });
};

const postYear = async (req, res) => {
  const data = req.body; //
  console.log(data);
  if (year === data.year) return;
  else year = data.year;
  moodColors = [];

  year = parseInt(data.year);

  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  const allData = await Daily.find({
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  });

  allData.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA - dateB;
  });

  allData.forEach((item) => {
    const { mood } = item;
    if (moodCounts[mood] !== undefined) {
      moodCounts[mood]++;
    }
  });

  // สร้าง moodColorsByYearMonth
  const moodColorsByYearMonth = allMonth.map((monthName, monthIndex) => {
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const moodColors = Array.from({ length: daysInMonth }, (_, dayIndex) => {
      const date = new Date(year, monthIndex, dayIndex + 1);
      const matchingData = allData.find((data) => {
        const dataDate = new Date(data.date);
        return (
          dataDate.getFullYear() === year &&
          dataDate.getMonth() === monthIndex &&
          dataDate.getDate() === dayIndex + 1
        );
      });

      if (matchingData) {
        const colorObj = colorsMood.find(
          (obj) => obj.num === matchingData.mood
        );
        return colorObj.color;
      } else {
        return "";
      }
    });
    return moodColors;
  });

  moodColors = moodColorsByYearMonth;
  res.redirect("/year")
};

module.exports = { getYear, postYear };

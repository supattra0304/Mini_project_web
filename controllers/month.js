const { Daily } = require("../models/daily");
let dataSend = [];
let daysInCurrentMonth = 0;
let month = null;
let year = null;
let redirect = true;
let fetchNew = true;
let MonthName = "";

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
  { num: 1, color: "#9370DB" },
  { num: 2, color: "#F08080" },
  { num: 3, color: "#87CEFA" },
  { num: 4, color: "#F9F871" },
  { num: 5, color: "#33CC66" },
];

const imgSrc = [
  { num: 5, src: "../assets/Very_happy.png" },
  { num: 4, src: "../assets/happy.png" },
  { num: 3, src: "../assets/nomood.png" },
  { num: 2, src: "../assets/angry.png" },
  { num: 1, src: "../assets/sad.png" },
];

const getMonth = async (req, res) => {
  if (month === null) {
    const currentDate = new Date();
    const day = currentDate.getDate();
    month = currentDate.getMonth() + 1;
    year = currentDate.getFullYear();
    daysInCurrentMonth = new Date(year, month, 0).getDate();
  }
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  if (redirect === true || fetchNew === true) {
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

    if (dataSend.length === 0) {
      for (let i = 1; i <= daysInCurrentMonth; i++) {
        let dataFound = false;
        allData.forEach((item) => {
          const dateObject = new Date(item.date);
          const getdate = dateObject.getDate();

          if (i === getdate) {
            const imgObj = imgSrc.find((obj) => obj.num === item.mood);
            const colorObj = colorsMood.find((obj) => obj.num === item.mood);

            dataSend.push({
              date: getdate,
              img: imgObj.src,
              color: colorObj.color,
              note: item.note,
            });
            dataFound = true;
          }
        });
        if (!dataFound) {
          dataSend.push({
            date: i,
            img: null,
            color: null,
            note: `Do you forget write ? Let'go to Create one!!!`,
          });
        }
      }
    }
  }
  fetchNew = false;
  redirect = false;
  MonthName = allMonth[month - 1];
  res.render("month", {
    title: "Month",
    daysInCurrentMonth,
    dataSend,
    MonthName,
    year,
  });
};

const postMonth = async (req, res) => {
  const data = req.body; //
  if (month === data.month && year === data.year) return;
  else month = data.month;
  year = data.year;
  dataSend = [];
  year = parseInt(data.year);
  month = parseInt(data.month);
  daysInCurrentMonth = new Date(year, month, 0).getDate();

  redirect = true;

  res.redirect("/month");
};

const deleteMonth = async (req, res) => {
  const data = req.body;

  console.log(data);
  if (data.month === undefined || data.year === undefined || data.day === 0)
    return;
  const days = data.day +1;
  const months = data.month;
  const years = data.year;
  year = data.year;
  dataSend = [];
  year = parseInt(years);
  month = parseInt(months);
  daysInCurrentMonth = new Date(year, month, 0).getDate();

  console.log(years, months - 1, days);
  const dateToDelete = new Date(years, months - 1, days);
  console.log(dateToDelete);
  const deletes = await Daily.deleteOne({ date: dateToDelete });

  fetchNew = true;
  redirect = true;

  res.status(200).json({ message: "ok" });
};

const getDataSend = async (req, res) => {
  return res.json({ dataSend: dataSend });
};
module.exports = { getMonth, postMonth, deleteMonth, getDataSend };

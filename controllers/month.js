const { Daily } = require("../models/daily");
let dataSend = [];
let daysInCurrentMonth = 0;
let month = null;
let year = null;
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
  { num: 1, color: "purple" },
  { num: 2, color: "red" },
  { num: 3, color: "blue" },
  { num: 4, color: "yellow" },
  { num: 5, color: "green" },
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
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

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

  MonthName = allMonth[month - 1];
  res.render("month", { daysInCurrentMonth, dataSend, MonthName, year });
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

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const allData = await Daily.find({
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  });

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

  res.redirect("/month");
};

const deleteMonth = async (req, res) => {
  const data = req.body;
  console.log(data);
  if (data.month === undefined || data.year === undefined || data.day === 0)
    return;

    

  res.redirect("/month");
};

const getDataSend = async (req, res) => {
  return res.json({ dataSend: dataSend });
};
module.exports = { getMonth, postMonth, deleteMonth, getDataSend };

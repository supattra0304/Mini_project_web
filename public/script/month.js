let dataSend = null;
document.addEventListener("DOMContentLoaded", function () {
  fetch("/month_data")
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function (data) {
      dataSend = data.dataSend;
    })
    .catch(function (error) {
      console.error("There was a problem with the fetch operation:", error);
    });
});

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

const Monthname = document.querySelector("#Monthname");
const yearNo = document.querySelector("#yearNo");
const downMonth = document.querySelector("#downMonth");
const upMonth = document.querySelector("#upMonth");
const downYear = document.querySelector("#downYear");
const upYear = document.querySelector("#upYear");

const monthtxt = Monthname.textContent.trim()
console.log(monthtxt)
console.log(monthtxt.length)

let month = allMonth.indexOf(monthtxt)+1;
let year = parseInt(yearNo.textContent);
upMonth.addEventListener("click", function () {
  if (month < 12) {
    month = month + 1;
    let MonthName = allMonth[month - 1];
    Monthname.textContent = MonthName;
  }
});

console.log(month)
downMonth.addEventListener("click", function () {
  if (month > 1) {
    month = month - 1;
    let MonthName = allMonth[month - 1];
    Monthname.textContent = MonthName;
  }
});

upYear.addEventListener("click", function () {
  year = year + 1;
  yearNo.textContent = year;
});

downYear.addEventListener("click", function () {
  if (year > 1) {
    year = year - 1;
    yearNo.textContent = year;
  }
});

const allCards = document.querySelectorAll(".card");
const containerBlur = document.querySelector(".container-blur");
const note = document.querySelector("#note");

let index = 0;

let clickedIndex = null;

allCards.forEach((card, index) => {
  card.addEventListener("click", function () {
    containerBlur.classList.remove("hide");
    clickedIndex = index;
    note.textContent = dataSend[clickedIndex].note;
  });
});

const deleteBtn = document.querySelector("#bin");
deleteBtn.addEventListener("click", function () {
  if (clickedIndex === null) {
    // ไม่มีการ์ดที่ถูกคลิก ไม่ต้องทำอะไร
    return;
  }

  if (dataSend[clickedIndex].note === `Do you forget to write? Let's go to create one!!!`) {
    clickedIndex = null;
    return;
  }

  const url = "/month";
  const data = {
    day: clickedIndex,
    month: month,
    year: year,
  };

  fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        location.href = location.href;
      } else {
        console.error("เกิดข้อผิดพลาดในการร้องขอ:", response.status);
      }
    })
    .catch((error) => {
      console.error("เกิดข้อผิดพลาดในการร้องขอ:", error);
    });

  clickedIndex = null; // เคลียร์ค่า clickedIndex เมื่อทำงานเสร็จสิ้น
});


containerBlur.addEventListener("click", function () {
  containerBlur.classList.add("hide");
});

const okButton = document.getElementById("okButton");
okButton.addEventListener("click", function () {
  const url = "/month";
  const data = {
    month: month,
    year: year,
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        location.href = location.href;
      } else {
        console.error("เกิดข้อผิดพลาดในการร้องขอ:", response.status);
      }
    })
    .catch((error) => {
      console.error("เกิดข้อผิดพลาดในการร้องขอ:", error);
    });
});

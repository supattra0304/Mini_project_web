const yearNo = document.querySelector("#yearNo");
const downYear = document.querySelector("#downYear");
const upYear = document.querySelector("#upYear");
let year = parseInt(yearNo.textContent);

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

const okButton = document.getElementById("okButton");
okButton.addEventListener("click", function () {
  const url = "/year";

  const data = {
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

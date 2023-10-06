const dateInput = document.getElementById("date");
const emojiSelect = document.getElementById("emoji");
const noteInput = document.querySelector("#note");

function sendData() {
  const date = dateInput.value;
  let mood = emojiSelect.value;
  const note = noteInput.value;
  mood = parseInt(mood);

  if (date !== undefined && date.length !== 0 && mood !== undefined) {
    dateInput.value = "";
    emojiSelect.selectedIndex = 0;
    noteInput.value = "";
    const url = "/add";
    const data = {
      date: date,
      note: note,
      mood: mood,
   
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
          // alert("Save success")
            window.history.pushState({}, '', '/month');
            location.href = location.href;
        } else {
          console.error("เกิดข้อผิดพลาดในการร้องขอ:", response.status);
        }
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการร้องขอ:", error);
      });
  }else{
    alert("Please Select Date and mood!!!")
  }

 
}



// // เคลียร์ค่า
// document.getElementById("date").value = "";
// emojiSelect.selectedIndex = 0;

// const resultDiv = document.getElementById("result");
// resultDiv.style.display = "block"; // แสดงผลลัพธ์

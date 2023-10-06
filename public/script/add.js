const dateInput = document.getElementById("date");
const emojiSelect = document.getElementById("emoji");
const noteInput = document.querySelector("#note");

const moods = document.querySelectorAll(".mood");
let value = null;

moods.forEach((mood, index) => {
  mood.addEventListener("click", () => {
    if (value === null || value !== 5 - index) {
      // ลบคลาส "mood_active" จาก mood ที่มีค่าเก่า
      moods.forEach((m) => m.classList.remove("mood_active"));
      // เพิ่มคลาส "mood_active" ให้กับ mood ที่ถูกคลิก
      mood.classList.add("mood_active");
      // อัพเดตค่า value เป็น 5 - index
      value = 5 - index;
    } else {
      // ถ้าคลิก mood ที่มีค่าเดิมอีกครั้งให้ลบคลาส "mood_active" ออก
      mood.classList.remove("mood_active");
      // อัพเดตค่า value เป็น null เพื่อให้สามารถเลือก mood ใหม่ได้
      value = null;
    }
  });
});

function sendData() {
  const date = dateInput.value;
  const note = noteInput.value;

  if (date !== undefined && date.length !== 0 && value !== null) {
    dateInput.value = "";
    noteInput.value = "";
    const url = "/add";
    const data = {
      date: date,
      note: note,
      mood: value+1,
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
          window.history.pushState({}, "", "/month");
          location.href = location.href;
        } else {
          console.error("เกิดข้อผิดพลาดในการร้องขอ:", response.status);
        }
      })
      .catch((error) => {
        console.error("เกิดข้อผิดพลาดในการร้องขอ:", error);
      });
  } else {
    alert("Please Select Date and mood!!!");
  }
}

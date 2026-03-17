const BASE_URL = "http://localhost:4000";

window.onload = async () => {
  const id = localStorage.getItem("lastEmployee");
  if (!id) { alert("ไม่พบข้อมูลพนักงาน"); return; }

  try {
    const res = await axios.get(`${BASE_URL}/EmployeeForm/${id}`);
    const data = res.data;

    const firstname  = localStorage.getItem('firstname') || "";
    const lastname   = localStorage.getItem('lastname')  || "";
    const dept       = data.dept        || "-";
    const checkin    = data.checkin     || "-";
    const checkout   = data.checkout    || "-";
    const otHours    = data.ot_hours    || "-";
    const totalPay   = data.total_pay   || "-";

    const workdate = data.workdate
      ? new Date(data.workdate).toLocaleDateString('th-TH')
      : "-";

    const fullname = `${firstname} ${lastname}`.trim() || "-";

    // MAIN
    document.getElementById("info-fullname").innerText = fullname;
    document.getElementById("info-date").value         = workdate;
    document.getElementById("d-checkin").value         = checkin;
    document.getElementById("d-checkout").value        = checkout;
    document.getElementById("d-ot").value              = otHours !== "-" ? otHours + " ชม." : "-";
    document.getElementById("d-salary").value          = totalPay !== "-" ? Number(totalPay).toLocaleString('th-TH') + " บาท" : "-";

    // SIDEBAR
    document.getElementById("side-name").innerText     = fullname;
    document.getElementById("side-dept").innerText     = dept;
    document.getElementById("side-date").innerText     = workdate;
    document.getElementById("side-checkin").innerText  = checkin;
    document.getElementById("side-checkout").innerText = checkout;

  } catch (err) {
    console.error("Dashboard Error:", err);
    alert("โหลดข้อมูลไม่สำเร็จ");
  }
};

function handleLogout() {
  localStorage.clear();
  window.location.href = "index.html";
}
const BASE_URL = 'http://localhost:4000';



// ===== REGISTER =====
async function doRegister() {
    const firstname = document.getElementById('reg-first').value.trim();
    const lastname  = document.getElementById('reg-last').value.trim();
    const username  = document.getElementById('reg-user').value.trim();
    const email     = document.getElementById('reg-email').value.trim();
    const password  = document.getElementById('reg-pass').value;

    if (!firstname || !lastname || !username || !email || !password) {
        Swal.fire({
        icon: "error",
        title: "กรุณากรอกข้อมูลให้ครบถ้วน",
        text: "ข้อมูลไม่ครบ",
        confirmButtonColor: "#ef2553"
    });
    return;
    }
       

        const userData = {
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        password: password
    };


    try {
        const res  = await axios.post(`${BASE_URL}/auth/register`,userData) 

        if (res.data.success) {
           Swal.fire({
        icon: "success",
        title: "ลงทะเบียนระบบสำเร็จ",
        text: "ยินดีต้อนรับเข้าสู่ระบบ",
        confirmButtonColor: "#2563eb"
        }).then(() => {
  window.location.href = "salary.html";
});
    
     } else {
            Swal.fire({
        icon: "error",
        title: "สมัครสมาชิไม่สำเร็จ",
        text: res.data.message,
        confirmButtonColor: "#eb2553"
            });
        }
    } catch (err) {
        Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "Email หรือ Username ถูกใช้ไปแล้ว",
            confirmButtonColor: "#2563eb"
});
    }

    }
// ===== SIGN IN =====
async function doSignIn() {
    const username = document.getElementById('si-user').value.trim();
    const password = document.getElementById('si-pass').value;

    if (!username || !password) {
        Swal.fire({
            icon: "error",
            title: "ยังไม่กรอก Username และ Password",
            text: "กรุณากรอก Username และ Password",
            confirmButtonColor: "#2563eb"
        });
        return;
    }

    try {
        const res = await axios.post(`${BASE_URL}/auth/login`, { username, password });

        if (res.data.success) {
            localStorage.setItem('user_id', res.data.user_id);
            localStorage.setItem('firstname', res.data.firstname);
            localStorage.setItem('lastname', res.data.lastname);
            Swal.fire({
                icon: "success",
                title: "เข้าสู่ระบบสำเร็จ",
                text: "กำลังไปหน้า Salary",
                confirmButtonColor: "#ef2553"
                }).then(() => {window.location.href = "salary.html";
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "เข้าสู่ระบบไม่สำเร็จ",
                text: res.data.message,
                confirmButtonColor: "#ef2553"
            });
        }

    } catch (err) {
        Swal.fire({
            icon: "error",
            title: "Server Error",
            text: "ไม่สามารถเชื่อมต่อ Server ได้",
            confirmButtonColor: "#ef2553"
        });
    }
}
// ===== SET SALARY BY DEPT =====
function setSalaryByDept() {
    const dept = document.getElementById('dept').value;
    const salaryMap = { HR: 19000, IT: 22000, Sale: 17000, Marketing: 15000 };
    document.getElementById('salary').value = salaryMap[dept] || '';
}

// ===== SALARY SUBMIT =====
async function doSalarySubmit() {

    const firstname = document.getElementById('firstname').value.trim();
    const lastname  = document.getElementById('lastname').value.trim();
    const dept      = document.getElementById('dept').value;
    const workdate  = document.getElementById('sal-date').value;
    const checkin   = document.getElementById('checkin').value;
    const checkout  = document.getElementById('checkout').value;

    if (!firstname || !lastname || !dept || !workdate || !checkin || !checkout) {
        Swal.fire({
            icon: "error",
            title: "กรุณากรอกข้อมูลให้ครบถ้วน"
        });
        return;
    }

    if (checkout <= checkin) {
        Swal.fire({
            icon: "error",
            title: "Check-Out ต้องมากกว่า Check-In"
        });
        return;
    }

    try {

        const data = {
            Dept: dept,
            WorkDate: workdate,
            CheckIn: checkin,
            CheckOut: checkout,
            user_id: localStorage.getItem('user_id')
        };

        console.log("SEND DATA:",data);

        const res = await axios.post(`${BASE_URL}/EmployeeForm`, data);

        console.log(res.data);

        if (res.data.id) {

            localStorage.setItem('lastEmployee', res.data.id);

            Swal.fire({
                icon: "success",
                title: "บันทึกสำเร็จ"
            }).then(()=>{
                window.location.href = "dashboard.html";
            });

        }

    } catch (err) {

        Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: err.message
        });

    }
}



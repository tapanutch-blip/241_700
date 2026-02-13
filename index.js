/*
//ทำการimportโมดูลhttp
const http=require('http');
const host='localhost';
const port=8000;
//กำหนดค่าserver
const requestListener=function(req,res){
    res.writeHead(200);
    res.end('Hello, World! This is my first server.')
}
//run server
const server = http.createServer(requestListener);
server.listen(port,host,()=>{
    console.log('Server is running on http://${host}:${port}');
});*/

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json())

const port = 8000;

let users=[];
let counter=1;
/**
  GET /users-> ดึงข้อมูลผู้ใช้ทั้งหมด
  POST /user-> เพิ่มผู้ใช้ใหม่
  GET /user/:id-> ดึงข้อมูลผู้ใช้ตามid
  PUT /user/:id-> แก้ไขข้อมูลผู้ใช้ตามid
  DELETE /user/:id-> ลบผู้ใช้ที่มีidตรงกับที่ส่งมา
*/


//path: =GET /user
app.get('/users', (req, res) => {
    res.json(users);
});

//path: =POST /user
app.post('/user', (req, res) => {
    let user=req.body;
    user.id=counter;
    counter+=1;
    users.push(user);
    res.json({
    message: "User added successfully", 
    user: user
    });
});

//path:=PUT /user/:id
app.patch('/user/:id', (req, res) => {
    let id=req.params.id;
    let updateUser=req.body;
    let selectedIndex=users.findIndex(u=>u.id==id);
    
    //หาuserที่มีidส่งมา
    let selectedUser=users.find(u=>u.id==id);

    //อัพเดทข้อมูลuser
if(updateUser.firstname){
    users[selectedIndex].firstname=updateUser.firstname;
}
if(updateUser.lastname){
    users[selectedIndex].lastname=updateUser.lastname;
}

res.json({
    message: "User updated successfully",
    data: {
        user: updateUser,
        indexUpdated: selectedIndex
    }
})
});
    //ส่งข้อความยืนยันการอัพเดท

    //ส่ง users ท่ี่อัพเดทแล้วกลับไป

    app.delete('/users/:id', (req, res) => {
    let id=req.params.id;
    //หาindexจากไอดีที่ส่งมา
    let selectedIndex=users.findIndex(u=>u.id==id);
    users.splice(selectedIndex,1);
    //ลบuserทออกจากusers
   
    res.json({
        message: "User deleted successfully",
        deletedUser: selectedIndex
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
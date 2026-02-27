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
const mysql = require('mysql2/promise'); //ติดตั้งmysql
const app = express();

app.use(bodyParser.json())

const port = 8000;

let conn=null;

const initMySQL=async()=>{
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8700
    });
    console.log('Connected to MySQL database');
}
//path get
app.get('/users',async (req,res)=>{
    const results = await conn.query('SELECT * FROM users');
    res.json(results[0]);
})

//path post
app.post('/users',async (req,res)=>{
    try{
        let user = req.body;
        const result = await conn.query('INSERT INTO users SET ?', user);
        res.json({
        message: "User added successfully",
        data: result[0]
        });
    } catch(error){
        console.error('Error inserting user :', error);
        res.status(500).json({ message:'Error adding user' });
    }
})

//path get
app.get('/users/:id',async (req,res)=>{
    try{
        let id = req.params.id;
        const results = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
        if(results[0].length === 0){
            throw{statusCode:404,message:'User not found'};
        }
        res.json(results[0][0]);   
    }catch(error){
        console.error('Error fetching user:', error);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({ 
            message: error.message || 'Error fetching user'
        });
    }  
})

//pathpush
app.put('/users/:id',async (req,res)=>{
    try{
        let id = req.params.id;
        let updatedUser = req.body;
        const results = await conn.query('UPDATE users SET ? WHERE id = ?', [updatedUser,id]);
        res.json({
            message: "User updated successfully",
            data: results[0]
        });
    }catch(error){
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user' });
    }
})
//pathde
app.delete('/users/:id',async (req,res)=>{
    try{
        let id = req.params.id; 
        const result = await conn.query('DELETE FROM users WHERE id = ?', [id]);
        res.json({
            message: "User deleted successfully",
            data: result[0]
        });
    }catch(error){
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user' });
    }
})

app.post('/users',async (req,res)=>{
    let user = req.body;
    user.id = counter;
    counter += 1;
    users.push(user);
    res.json({
        message: "User added successfully",
        user: user
    });
})

/*app.get('/testdb', (req, res) => { //ติดตั้งตัวtestdbเพื่อทดสอบการเชื่อมต่อกับฐานข้อมูล
    mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8700
    }).then((conn) => {
        conn
        .query('SELECT * FROM users')
        .then((results) => {
            res.json(results[0]);
        }).catch((err) => {
            res.json({ error: err.message });
        });
    })
}) */

app.get('/testdb-new',async (req,res)=>{
    try{
        const conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'webdb',
            port:8700
        });
        const results = await conn.query('SELECT * FROM users');
        res.json(results[0]);

    }catch(err){
        console.error('Error connecting to the database:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
    

});

    let users = [];
    let counter = 1;
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
        let user = req.body;
        user.id = counter;
        counter += 1;
        users.push(user);
        res.json({
            message: "User added successfully",
            user: user
        });
    });

    //path:=PUT /user/:id
    app.patch('/user/:id', (req, res) => {
        let id = req.params.id;
        let updateUser = req.body;
        let selectedIndex = users.findIndex(u => u.id == id);

        //หาuserที่มีidส่งมา
        let selectedUser = users.find(u => u.id == id);

        //อัพเดทข้อมูลuser
        if (updateUser.firstname) {
            users[selectedIndex].firstname = updateUser.firstname;
        }
        if (updateUser.lastname) {
            users[selectedIndex].lastname = updateUser.lastname;
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
        let id = req.params.id;
        //หาindexจากไอดีที่ส่งมา
        let selectedIndex = users.findIndex(u => u.id == id);
        users.splice(selectedIndex, 1);
        //ลบuserทออกจากusers

        res.json({
            message: "User deleted successfully",
            deletedUser: selectedIndex
        });
    });

    app.listen(port, async() => {
        await initMySQL();
        console.log(`Server is running on http://localhost:${port}`);
    });



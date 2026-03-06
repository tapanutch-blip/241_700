// //import module httpมา 
// const http = require('http');
// const host = 'localhost';
// const port = 8000;

// // //กำหนดค่าserver

// // const requestListener = function(req, res){
// //     res.writeHead(200);
// //     res.end('Hello World This is my first server');
// // } 

// // //run server
// // const server = http.createServer(requestListener);
// // server.listen(port, host, () =>{
// //     console.group(`server is running on http://${host}:${port}`);
// // });





const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();
const port = 8000;
const cors = require('cors');


app.use(cors());
app.use(bodyParser.json());


// app.get('/testdb', (req,res) => {
//     mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         password: 'root',
//         database: 'webdb',
//         port: 8700
//     }).then((conn) => {
//         conn.query('SELECT * FROM users')
//         .then((result) => {
//             res.json(result[0]);
//         }).catch((err) => {
//             res.json({error: err.message})
//         })
//     })
// })

let conn = null;

const initMysql = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8700
    });
    console.log('Connected to MySQL database');
}

app.get('/users', async (req, res) => {
    const results = await conn.query('SELECT * FROM users');
    res.json(results[0]);
})

app.post('/users', async (req, res) => {
    try {
        let user = req.body;
        const results = await conn.query('INSERT INTO users SET ?', user);
        console.log(results);
        res.json({
            message: 'User added successfully',
            data: results[0]
        });
    } catch (err) {
        console.error("Errorr inserting users: ", err);
        res.status(500).json({ error: 'Error addition server' });
    }
})

app.get('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const results = await conn.query("SELECT * FROM users WHERE id = ?", id)
        if (results[0].length === 0) {
            throw { statusCode: 404, message: 'User not found' };
        }
        res.json(results[0][0]);
    } catch (err) {
        console.error("Error fetching user: ", err);
        let statusCode = err.statusCode || 500;
        res.status(500).json({ error: 'Error fetching user' });
    }
})

app.put('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let updateUser = req.body;
        const results = await conn.query('UPDATE users SET ? WHERE id = ?', [updateUser, id]);
        res.json({
            message: 'User updated successfully',
            data: results[0]
        })
    } catch (err) {
        console.error("Error updating user: ", err);
        res.status(500).json({ error: 'Error updating user' });
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const results = await conn.query('DELETE FROM users WHERE id = ?', id);
        res.json({
            message: 'User deleted successfully',
            data: results[0]
        })
    }catch (err) {
        console.error("Error deleting user: ", err);
        res.status(500).json({ error: 'Error deleting user' });
    }
})

// app.get('/testdb-new', async (req, res) => {
//     try {
//         const conn = await mysql.createConnection({
//             host: 'localhost',
//             user: 'root',
//             password: 'root',
//             database: 'webdb',
//             port: 8700
//         });
//         const results = await conn.query('SELECT * FROM users');
//         res.json(results[0]);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({err: 'Internal Server Error'});
//     }
// })














// let users =[];
// let counter = 1;

// /**
//   GET /user - ดึงข้อมูลผู้ใช้ทั้งหมด
//   POST /users - เพิ่มผู้ใช้ใหม่
//   GET /users/:id - ดึงข้อมลผู้ใช้ตาม ID
//   PUT /users/:id - แก้ไขผู้ใช้งานตาม ID ที่บันทึก
//   DELETE /users/:id - ลบผู้ใช้ตาม ID ที่บันทึก
//  */

// app.get('/test', (req,res) => {
//     let user = {
//         name: "John Doe",
//         age: 30,
//         email: "John.doe@example.com"
//     };
//     res.json(user);
// });


// // path: = GET /user
// app.get('/users', (req,res) => {
//     res.json(users);
// });



// // path: = POST /user
// app.post('/user', (req,res) => {
//     let user = req.body;
//     user.id = counter;
//     counter += 1;

//     users.push(user);
//     res.json({
//         message: 'Useer added successfully',
//         user: user
//     })
//     res.send(req.body);
// });

// //path: = PUT /user/:id
// // app.put('/user/:id', (req,res) =>{
// //     let id = req.params.id;
// //     let updateUser = req.body;
// //     //หา user จาก id ที่ส่งมา

// //     //เมื่อหาเสร็จแล้ว ให้อัพเดต users

// //     //ส่ง users  ที่อัพเดตแล้วกลับไป
// //     let selectedIndex = users.findIndex(user => {
// //         if(user.id == id){
// //             return true;
// //         }else{
// //             return false;
// //         }
// //     });

// //     // res.send(selectedIndex + '');

// //     users[selectedIndex].firstName = updateUser.firstName || users[selectedIndex].firstName;
// //     users[selectedIndex].lastName = updateUser.lastName || users[selectedIndex].lastName;

// //     res.json({
// //         message: 'User upated successfully',
// //         data: {
// //             user: updateUser,
// //             indexUpdate : selectedIndex
// //         }
// //     })
// // })

// app.patch('/user/:id', (req,res) =>{
//     let id = req.params.id;
//     let updateUser = req.body;
//     //หา user จาก id ที่ส่งมา

//     //เมื่อหาเสร็จแล้ว ให้อัพเดต users


//     //ส่ง users  ที่อัพเดตแล้วกลับไป
//     let selectedIndex = users.findIndex(user => user.id ==id);

//     if(updateUser.firstName){
//         users[selectedIndex].firstName = updateUser.firstName;
//     }
//     if(updateUser.lastName){
//         users[selectedIndex].lastName = updateUser.lastName;
//     }

//     // res.send(selectedIndex + '');


//     res.json({
//         message: 'User upated successfully',
//         data: {
//             user: updateUser,
//             indexUpdate : selectedIndex
//         }
//     })
// })

// app.delete('/users/:id', (req,res) => {
//     let id = req.params.id;

//     //หา index จาก id ที่ส่งมา
//     let selectedIndex = users.findIndex(user => user.id ==id);

//     //ลบ user ออกจาก users
//     users.splice(selectedIndex,1)

//     res.json({
//         message: 'User deleted successfully',
//         indexDelete: selectedIndex
//     })

// })




// // const express = require('express');
// // const app =express();
// // const port = 8000;

// //app.get('/',(req,res) => {
//     //res.send('Hello World!')
//     //});
// //app.listen(port, () => {
//     //console.log(`Sever is running on http://)})


app.listen(port, async () => {
    await initMysql();
    console.log(`Server is running on http://localhost:${port}`);
});


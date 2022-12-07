const mysql = require('mysql');
const express = require('express');

const app = express();
app.use(express.json())
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'sms'
});

connection.connect((err) => {
    if (err) console.log(err)
    else
        console.log('Connected')
})

const login = require('./routes/login')

app.use('/', login)

app.get('/list', (req, res) => {
    connection.query("select * from `student`", (error, result) => {
        if (error) {
            throw error
        }
        else {
            res.json(result)
        }
    })
})
app.delete("/delete/:rollno", (req, res) => {
    const rollno = req.params.rollno;
    var deletedstudent;
    connection.query("select * from `student` where rollno=?", rollno, (error, result) => {
       deletedstudent=result;
    })
    connection.query("delete from `student` where rollno=?", rollno, (error, result) => {
        if (error) {
            throw error
        }
        else {
            res.json(deletedstudent)
        }
    })

})
app.post('/add', (req, res) => {
    const rollno = req.body.rollno;
    const sname = req.body.sname;
    const email = req.body.email;
    const dob = req.body.dob;
    const pno = req.body.pno;
    const cid = req.body.cid;

    connection.query("insert into `student` values (?, ?, ?, ?, ?, ?)", [rollno, sname, dob, email, cid, pno], (error, result) => {
        if (error) {
            throw error
        }
        else {
            res.json(result)
        }
    })
})

app.post('/edit/:rollno', (req, res) => {
    const rollno = req.params.rollno;
    const rno = req.body.rollno;
    const sname = req.body.sname;
    const email = req.body.email;
    const dob = req.body.dob;
    const pno = req.body.pno;
    const cid = req.body.cid;
    connection.query("update `student` set rollno=?, sname=?, dob=?, email=?, cid=?, pno=?  where rollno=?", [rno, sname, dob, email, cid, pno, rollno], (error, result) => {
        if (error) {
            throw error
        }
        else {
            res.send('Table updated!')
        }
    })
})

const attend = require('./routes/attendance')

app.use('/', attend)

app.listen(3000);
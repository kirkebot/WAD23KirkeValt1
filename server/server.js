
const express = require('express');
const pool = require('./database');
const cors = require('cors')

const port = process.env.PORT || 3000;
const app = express();


app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());

app.listen(port, () => {
    console.log("Server is listening to port " + port)
});


app.get('/api/grades', async(req, res) => {
    try {
        console.log("A GET all request has arrived");
        const grades = await pool.query(
            "SELECT * FROM wadcourse"
        );
        res.json(grades.rows);
    } catch (err) {
        console.error(err.message);
    }
});


app.put('/api/grades/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const grade = req.body;
        console.log("An PUT request has arrived");
        const updatecourse = await pool.query(
            "UPDATE wadcourse SET (id, studentcode, studentname, hw1, hw2, exam, final) = ($1, $2, $3, $4, $5, $6, $7) WHERE id = $1 RETURNING*", [id, grade.studentcode, grade.studentname, grade.hw1, grade.hw2, grade.exam, grade.final]
        );
        res.json(updatecourse);
    } catch (err) {
        console.error(err.message);
    }
});

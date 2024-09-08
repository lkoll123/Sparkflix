const express = require('express');
const cors = require('cors');
const db = require('./dbConnect.js');

const app = express();
const PORT = process.env.PORT || 8080;

const corsOptions = {
    origin: ["http://localhost:5173", "https://main--sparkflixapp.netlify.app"]
};
app.use(cors());
app.use(express.json());

app.post('/api/signup', (req, res) => {
    const sql = "INSERT INTO accounts (email, password, planId) VALUES (?)";

    const values = [
        req.body.email,
        req.body.password,
        req.body.plan
    ]

    db.query(sql, [values], (err, data) => {
        if(err) {
            console.log(err)
            return res.status(400).send("Error");
        }
        return res.json(data);
    })
})

app.post('/api/login', (req, res) => {
    const sql = "SELECT * FROM accounts WHERE email = ?";
    const {email} = req.body;
    db.query(sql, [email], (err, data) => {
        if(err) {
            console.log(err)
            return res.status(400).send("Error");
        }
        if(data.length > 0) {
            return res.json(data);
        }
        return res.json("Failed");
    })
})

app.get('/api/checkEmail', (req, res) => {
    const {email} = req.query;
    const sql = "SELECT * FROM accounts WHERE email = ?";
    db.query(sql, [email], (err, data) => {
        if(err) {
            console.log(err)
            return res.status(400).send("Error");
        }
        if (data.length === 0) {
            res.json({exists: false})
        } else {
            res.json({exists: true})
        }
    })
})

app.get('/api/getUsers', (req, res) => {
    const {userId} = req.query;
    const sql = "SELECT * FROM users WHERE accountId = ?";
    db.query(sql, [userId], (err, data) => {
        if(err) {
            console.log(err)
            return res.status(400).send("Error");
        }
        if (data.length === 0) {
            res.json("EMPTY");
        } else {
            res.json(data);
        }
    })
})

app.post('/api/setUser', (req, res) => {
    const{userId, name, language, allowMature} = req.body;
    const sql = "INSERT INTO users (accountId, name, language, allow_mature) VALUES (?, ?, ?, ?)"
    db.query(sql, [userId, name, language, allowMature],(err, data) => {
        if(err) {
            console.log(err);
            return res.status(400).send("Error");
        }
        return res.status(200).send("Success");
    })

})

app.post('/api/removeUser', (req, res) => {
    const{userId} = req.body;
    const sql = "DELETE FROM users WHERE id = ?";
    db.query(sql, [userId], (err, data) => {
        if(err) {
            console.log(err);
            return res.status(400).send("Error");
        }
        return res.status(200).send("Success");
    })

})


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

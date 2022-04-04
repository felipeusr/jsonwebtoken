const express = require("express");
const app = express()
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const SECRET = "secret";

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

function verify(req, res, next) {
    const token = req.headers["x-access-token"];
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(401).end();
        req.userId = decoded.userId;
        next();
    })
}

app.post("/login", (req, res) => {
    if (req.body.user === "felipe" && req.body.password === "123") {
        const token = jwt.sign({userId: 1}, SECRET, {expiresIn:300});
        return res.json({auth:true, token});
    }
    res.status(401).end();
});

app.get("/clientes", verify, (req, res) => {
    var clientes = [
        {
            cliente : "Lucky"
        },
        {
            cliente : "Emilly"
        },
        {
            cliente : "Junior"
        },
        {
            cliente : "Gerald"
        }
    ]
    res.send(clientes);
});

app.listen(3001);
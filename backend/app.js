require('dotenv').config()
const express=require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT;
const read_write = require("./read_write");


app.use(cors())
app.use(express.json())

app.use('/', read_write);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
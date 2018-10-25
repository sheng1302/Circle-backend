const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get('/', (req,res) => {
    res.send("hello");
})

app.get('/items', (req,res) => {
    res.send("hello");
})

app.get('/items/:item_id', (req,res) => {
    res.send(req.params.item_id);
})


app.listen(port, () => {
    console.log(`server started on port ${port}`);
});



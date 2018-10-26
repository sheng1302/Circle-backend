const express = require("express");
const bodyParser = require("body-parser");
const controller = require('./controllers');
const models = require('./models');


const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static('./public'));

app.get('/', (req,res) => {
    res.send("hello");
});

app.use(controller);



models.sequelize.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is up and running on port: ${PORT}`)
        });
    });


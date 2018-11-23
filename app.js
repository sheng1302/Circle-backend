const express = require("express");
const bodyParser = require("body-parser");
const controller = require('./controllers');
const models = require('./models');

const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const passport = require('./middlewares/auth');


const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static('./public'));
app.use(cookieParser());
app.use(flash());
app.use(expressSession(({
    secret: 'keyboard cat - REPLACE ME WITH A BETTER SECRET',
    resave: false,
    saveUninitialized: true,
})));

app.use(passport.initialize());
app.use(passport.session());


app.use(controller);


app.get('/', (req,res) => {
    res.send("hello");
});


models.sequelize.sync({ force: false })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is up and running on port: ${PORT}`)
        });
    });


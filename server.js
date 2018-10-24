const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();

// db config
const db = require('./config/keys');
// connect to mongodb
mongoose.connect(db.mongoURI, { useNewUrlParser: true })
    .then(() => console.log('mongodb connect success'))
    .catch(err => console.log(err));
app.get('/', (req, res, next) => {
    res.send('node-vue-app')
})
// 设置body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./config/passport')(passport);
//设置跨域访问
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// 使用routes
app.use('/api/users', require('./routers/api/users'));
app.use('/api/profile', require('./routers/api/profile'));

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server is allready port:${port}`);
});

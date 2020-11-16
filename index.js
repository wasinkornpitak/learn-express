const express = require('express');
const app = express();
const path = require('path');
const logger = require('./middleware/logger');
const exhdb = require('express-handlebars');
const users = require('./Users');

//Init Middleware
// app.use(logger);

app.use('/api/users', require('./routes/api/users'));

//handlebars
app.engine('handlebars', exhdb({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Homepage Route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'User App 555',
        users
    });
})

//Body passer middl
app.use(express.json());
app.use(express.urlencoded({ extended : false}));


//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is runnuing on port ${PORT}`));
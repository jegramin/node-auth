const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const blogRoutes = require('./routes/blogRoutes')
const authRoutes = require('./routes/authRoutes')
const { requireAuth } = require('./middlewares/authMiddleware')

const app = express()

const dbURI = 'mongodb://node-auth-admin:test1234@nodetuts-shard-00-00.rmfo6.mongodb.net:27017,nodetuts-shard-00-01.rmfo6.mongodb.net:27017,nodetuts-shard-00-02.rmfo6.mongodb.net:27017/node-tuts?ssl=true&replicaSet=atlas-6gsybg-shard-0&authSource=admin&retryWrites=true&w=majority'
mongoose.connect(dbURI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(result => app.listen(3001))
    .catch(err => console.log(err))

const cors=require('cors');
//middlewere
app.use(cors({origin:true,credentials: true}));
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(cookieParser())

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

//routes
app.get('/', requireAuth, (req, res) => {
    res.redirect('/blog')
})

app.use(authRoutes)

app.use('/blog', blogRoutes)

app.use((req, res) => {
    res.status(404).send('404')
})
// require('dotenv').config();
const express = require('express');
const app = express()
const morgan = require('morgan')
const {connectDB, sequelize} = require('./config/database')



app.use(express.json())
app.use(morgan('combined'))

const routes = require('./routes/index')

const errorHandler = require('./middlewares/errorHandler')

connectDB();




app.use('/api', routes)
app.use(errorHandler)


const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`app is runing on 'http://localhost:${port}/api`)
})



// require('dotenv').config();
// const express = require('express');
// const morgan = require('morgan');
// const { connectDB } = require('./config/database');
// const routes = require('./routes/index');
// const errorHandler = require('./middlewares/errorHandler');

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(morgan('combined'));

// // Database Connection
// connectDB();

// // Routes
// app.use('/api', routes);
// app.use(errorHandler);

// module.exports = app;


const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const productRoutes = require('./routes/producctRoutes');
const app = express();
const PORT = 3000;
const MONGODB_URL = `mongodb://127.0.0.1:27017/test`;
// set the json parser 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));

mongoose
    .connect(MONGODB_URL)
    .then(()=> {
        console.log('Database connected!!!!');
    })
    .catch((error) => {
        console.error(error);
        process.exit(0);
    });

app.get('/', (_,res)=> res.send({message: `Server Started ${new Date()}`}));

/* Products */
app.use('/api/product', productRoutes);

app.listen(PORT, ()=>{
    console.log(`Server Started on http://localhost:${PORT}`)
})
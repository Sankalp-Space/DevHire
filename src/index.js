
const express= require('express');
const db= require('./config/db');
const app= express();
const dotenv = require('dotenv');
const companyRoutes = require('./routes/company.routes');
dotenv.config();
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('Welcome to DevHire API');
})

app.use('/api',companyRoutes);


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});
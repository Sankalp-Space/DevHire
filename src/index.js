const express= require('express');
const db= require('./config/db');
const app= express();
const dotenv = require('dotenv');


dotenv.config();
app.get('/',(req,res)=>{
    res.send('Welcome to DevHire API');
})

app.get('/api/companies',(req,res)=>{
    db.query('Select * from company',(err,result)=>{
        if(err){
            console.log('Error fetching companies', err);
        }else{
            res.json(result.rows)
        }
    })
})


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});
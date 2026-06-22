
const express= require('express');
const db= require('./config/db');
const app= express();
const dotenv = require('dotenv');
dotenv.config();
const companyRoutes = require('./routes/company.routes');
const userRoutes = require('./routes/user.routes');
const jobRoutes = require('./routes/job.routes');
const applicationRoutes = require('./routes/application.routes');
const rateLimiter = require('express-rate-limit');
const helmet= require('helmet');
const redis = require('./config/redis');
app.use(helmet());

const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

app.use(express.json());
app.use(limiter);



app.get('/',(req,res)=>{
    res.send('Welcome to DevHire API');
})

app.use('/api',companyRoutes);
app.use('/api',userRoutes);
app.use('/api',jobRoutes);
app.use('/api',applicationRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});
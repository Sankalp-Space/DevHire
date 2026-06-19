const bcrypt = require('bcrypt');
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();



const registerUser =async (req, res)=>{
    const {full_name, email, password}=req.body;
    
   
    try{
        const hashedPassword=await bcrypt.hash(password, 10);
         const result= await db.query('Insert into users (full_name, email, password) values ($1,$2,$3) RETURNING *',[full_name, email, hashedPassword]);;
         const user=result.rows[0];
         delete user.password;
         res.status(201).json(user);
    }catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }
}

const loginUser =async (req, res)=>{
    const  {email,password}=req.body;
    try{
        const result=await db.query('SELECT * FROM users WHERE email = $1',[email]);
        if (!result.rows[0]){
            return res.status(404).json({ error: 'User not found' });
        }
        if(!await bcrypt.compare(password, result.rows[0].password)){
            return res.status(401).json({error:'Invalid password'});
        }
        
        const token = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({token});
    
    }catch(error){
        res.status(500).json({ error: 'Internal server error' });
    }
};
module.exports={registerUser,loginUser};
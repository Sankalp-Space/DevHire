const db = require('../config/db');
const getCompanies = async(req, res)=> {
        try{
        const result= await db.query('Select * from company');
        res.status(200).json(result.rows);}
        catch(error){
        console.error('Error fetching companies:', error);
        res.status(500).json({ error: 'An error occurred while fetching companies' });
    }
    }

const createCompany= async(req,res)=>{
    const {name, size, type, industry, location, website}=req.body;
    try{
        const result= await db.query('INSERT INTO company (name, size, type, industry, location, website) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *', [name, size, type, industry, location, website])
        res.status(201).json(result.rows[0]);
    } catch(error){
        
        res.status(500).json({ error: 'An error occurred while creating the company' });
    }
}


module.exports = { getCompanies, createCompany };
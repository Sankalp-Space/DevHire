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

const getCompanyById= async(req,res)=>{
    const{id}=req.params;
    try{
        const result= await db.query('SELECT * FROM company WHERE id = $1',[id]);
        if(!result.rows[0]) {
    return res.status(404).json({ error: 'Company not found' });
}
        res.status(200).json(result.rows[0]);
    }catch(error){
        res.status(500).json({ error: 'An error occurred while fetching the company' });
    }
}

const deleteCompany= async(req,res)=>{
    const {id}=req.params;
    try{
        const result=await db.query('DELETE FROM company WHERE id = $1 RETURNING *',[id]);
        if(!result.rows[0]) {
    return res.status(404).json({ error: 'Company not found' });
}
        res.status(200).json({ message: 'Company deleted successfully' });
    } catch(error){
        res.status(500).json({error:"An error occurred while deleting the company"});
    }
}

module.exports = { getCompanies, createCompany, getCompanyById, deleteCompany};
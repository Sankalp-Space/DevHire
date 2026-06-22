const db= require('../config/db');
const redis = require('../config/redis');

const getJobs= async(req,res)=>{
    try{
        const cached =await redis.get('jobs');
        if(cached){
            console.log('Cache hit — serving from Redis');
            return res.status(200).json(JSON.parse(cached));
        }
        console.log('Cache miss — fetching from DB');
        const result= await db.query('Select * from jobs');
        await redis.set('jobs',JSON.stringify(result.rows), 'EX', 3600); // Cache for 60 seconds
        res.status(200).json(result.rows);


    }catch(error){
        res.status(500).json({error:"An error occurred while fetching jobs"});
    }
}

const createJob= async(req,res)=>{
    const {job_role, description, tech_stack, experience, company_id, closed_date}=req.body;
    try{
        
        const result=await db.query('INSERT INTO jobs (job_role, description, tech_stack, experience, company_id, closed_date) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',[job_role, description, tech_stack, experience, company_id, closed_date]);
        await redis.del('jobs');
        res.status(201).json(result.rows[0]);
        

    }catch(error){
        res.status(500).json({error:"An error occurred while creating the job"});
    }

}

const getJobById= async(req,res)=>{
    const {id}=req.params;
    try{
        const result=await db.query('SELECT * FROM jobs WHERE id=$1',[id]);
        if(!result.rows[0]){
            return res.status(404).json({error:"Job not found"});

        }
        return res.status(200).json(result.rows[0]);
    }catch(error){
        return res.status(500).json({error:"An error occurred while fetching the job"});
    }
}

const deleteJob= async(req,res)=>{
    const {id}=req.params;
    try{
        const result= await db.query('DELETE FROM jobs WHERE id=$1 RETURNING *',[id]);
        if(!result.rows[0]){
            return res.status(404).json({error:"Job not found"});
        }
        return res.status(200).json({message:"Job deleted successfully"});
    }catch(error){
    return res.status(500).json({error:"An error occurred while deleting the job"});}
}

module.exports={getJobs, createJob, getJobById, deleteJob};
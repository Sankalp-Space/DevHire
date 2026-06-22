const db= require('../config/db');

const applyToJob= async (req,res)=>{
    const userId= req.user.id;
    const {jobId}= req.body;
    try{
        const result = await db.query('INSERT INTO applications (user_id, job_id) VALUES ($1, $2) RETURNING *', [userId, jobId]);
        
        return res.status(201).json(result.rows[0]);
    }
    catch(err){
        if(err.code === '23503'){
        return res.status(404).json({error: 'Job not found'});
    }
        return res.status(500).json({error: 'Internal Server Error'});
    }
}

const getApplications= async (req,res)=>{
    const userId= req.user.id;
    try{
        const result=await db.query('SELECT * FROM applications WHERE user_id = $1', [userId]);
        return res.status(200).json(result.rows);
    }catch(err){
    return res.status(500).json({error: 'Internal Server Error'});}
}

module.exports={
    applyToJob,
    getApplications
};
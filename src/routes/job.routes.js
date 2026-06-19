const express= require('express');

const router= express.Router();

const {getJobs, createJob, getJobById, deleteJob}= require('../controllers/job.controller');
router.get('/jobs', getJobs);
router.post('/jobs', createJob);
router.get('/jobs/:id', getJobById);
router.delete('/jobs/:id', deleteJob);

module.exports= router;
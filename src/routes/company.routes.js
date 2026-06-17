const express = require('express');

const router=express.Router();
const {getCompanies, createCompany} = require('../controllers/company.controller');

router.get('/companies', getCompanies);
router.post('/companies', createCompany);

module.exports=router;
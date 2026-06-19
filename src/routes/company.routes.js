const express = require('express');
const { verifyToken } = require('../middleware/auth');

const router=express.Router();
const {getCompanies, createCompany,getCompanyById,deleteCompany} = require('../controllers/company.controller');
router.get('/companies', getCompanies);
router.post('/companies', verifyToken, createCompany);
router.get('/companies/:id', getCompanyById);
router.delete('/companies/:id', verifyToken, deleteCompany);
module.exports=router;
const {body,validationResult}=require('express-validator');


const registerValidation=[
    body('full_name').notEmpty().withMessage('Full name is required')
    .isLength({max:20}).withMessage('Full name must be at most 20 characters long'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({min:8}).withMessage('Password must be at least 8 characters long')
    .matches(/[\d]/).withMessage('Password must contain at least one number')
    .matches(/[!@#$%^&*]/).withMessage('Password must contain at least one special character')
]

const validate= (req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    next();
}

module.exports={registerValidation,validate};
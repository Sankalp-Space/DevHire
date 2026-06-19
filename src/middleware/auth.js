const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


const verifyToken = (req, res, next) => {
    const  authheader= req.headers.authorization;
    try{
        if(!authheader || !authheader.startsWith('Bearer ')){
            return res.status(401).json({error:'Access denied'});
        }
        const token= authheader.split(' ')[1];
        if(!token){
            return res.status(401).json({error:'Access denied'});
        }
        const decode =jwt.verify(token, process.env.JWT_SECRET);
            req.user=decode;
            next();
        

    }catch(error){
        res.status(500).json({error:'Internal server error'});
    }
}

module.exports = { verifyToken };
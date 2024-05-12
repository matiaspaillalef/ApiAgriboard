import jwt from "jsonwebtoken";

const validateToken = (req, res, next) => {
    try{
        const token = req.headers['x-api-key'];
       
        if (!token) return res.json({ message: 'Token no válido.' });

        const {uid} = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid; 
        next();

    }catch(error){
        return res.json({ message: 'Token no válido.' });
    }
}
export default validateToken
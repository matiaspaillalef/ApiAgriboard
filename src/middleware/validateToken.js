import jwt from "jsonwebtoken";

const validateToken = (req, res, next) => {

    try{
        const token = req.headers['x-api-key'];
       
        if (!token) {
            // Si no hay token, se devuelve un error 401
            return res.status(401).json({ message: 'Token no proporcionado.' });
        }

        const {uid} = jwt.verify(token, process.env.JWT_SECRET);

        req.uid = uid; 
        next();

    }catch(error){
        return res.status(401).json({ message: 'Token no válido.' });
    }
}
export default validateToken
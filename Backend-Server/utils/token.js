import jwt from 'jsonwebtoken';

const Token=async (userID)=>{
    try{
        const token=await jwt.sign({userID},process.env.JWT_SECRET,{expiresIn:'1d'});
        return token; 
    }catch(error){
        throw new Error('Token generation failed');
    }
}
export default Token;
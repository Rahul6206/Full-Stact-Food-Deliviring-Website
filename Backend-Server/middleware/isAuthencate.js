import jwt from 'jsonwebtoken'
export const isAuthenticate= async(req,res,next)=>{
    try {
        const token=req.cookies.token || req.header("Authorization").replace("Bearer ","");
        if(!token){
            return res.status(401).json({message:"Unauthorized , No token provided"});
        }
        const Veryfy=jwt.verify(token,process.env.JWT_SECRET)
        if(!Veryfy){
            return res.status(401).json({message:"Unauthorized , Invalid token"});
        }
        console.log(Veryfy);
        
        req.userId=Veryfy.id;
        next();
    } catch (error) {
        console.log("isAuthencticate middleware error",error);
        res.status(500).json({message:"isAuthencticate middleware error",error:error.message});
        
    }
 
}
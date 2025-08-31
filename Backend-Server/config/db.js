import mongoose from "mongoose"; 
const ConnectMongoDB = async ()=>{
   await mongoose.connect(process.env.DBCONNECT)
    .then(()=>{
        console.log("MongoDB Connected Successfully");
    })
    .catch((error)=>{
        console.log("MongoDB Connection Failed");
        console.log(error);
    });     
}
export default ConnectMongoDB;
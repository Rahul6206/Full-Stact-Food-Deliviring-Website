import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema({

name:{
    type:String,
    required:true,

},
image:{
    type:String,
    required:true,
    
},
ownerId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
},

city:{
    type:String,
    required:true,
    
},
state:{
    type:String,
    required:true,
    
},
address:{
    type:String,
    required:true,
    
},
Items:{
 type: mongoose.Schema.Types.ObjectId,
 ref:'Items'
}


},{timestamps:true})

const  Shopmodel= mongoose.model('Shop',ShopSchema);

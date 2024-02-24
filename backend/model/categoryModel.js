const mongoose=require("mongoose");

const categorySchema=mongoose.Schema({
    name:{
        type:String,
    },

   description:{
    type:String,
    required:false
   }
   

})

module.exports= mongoose.model("Category",categorySchema);
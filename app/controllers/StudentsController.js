import StudentsModel from "../model/StudentsModel.js";
import {TokenEncode} from "../utility/tokenUtility.js";





//Student Registration

export const Registration=async(req,res)=>{

    try {
       let reqBody=req.body;
       await StudentsModel.create(reqBody)
        return res.json({status:"success","Message":"Student registered successful"})
    }
    catch (e) {
        return res.json({status:"fail","Message":e.toString()})
    }




//Student Login

export const Login=async(req,res)=>{

    try {
        let reqBody=req.body;
        let data=await StudentsModel.findOne(reqBody)

        if(data){
            let token = TokenEncode(data['email'],data['_id'])
            console.log(data['email'],data['_id']);
            
            console.log(token)
      
            let options = {
              limit : 30*24*60*60*1000,
              httpOnly:true,
              sameSite:"none",
              secure:true,
            }
            res.cookie('token',token,options)
            res.json({status:200,message:'success',data:data,token:token}) 
        } else{
            res.json({status:'failed',message:'user not found'}) 
    }
    catch (e) {
        return res.json({status:"fail","Message":e.toString()})
    }

}






//Student Read Profile 

export const ReadProfile=async(req,res)=>{
   try {
        let user_id=req.headers['user_id']
        let data=await StudentsModel.findOne({"_id":user_id})
        return res.json({status:"success",message:"Student profile Read successful",data:data})
    }
    catch (e) {
        return res.json({status:"fail","Message":e.toString()})
    }
       
}






//Student Update Profile 

export const UpdateProfile=async(req,res)=>{
    try {
       let reqBody=req.body;
       let user_id=req.headers['user_id']
       await StudentsModel.updateOne({"_id":user_id},reqBody)
        return res.json({status:"success","Message":"Student Profile Update successfully"})
   }
    catch (e) {
        return res.json({status:"fail","Message":e.toString()})
    }
}


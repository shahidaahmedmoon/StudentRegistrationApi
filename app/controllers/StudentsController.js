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

        if(data==null){
            return res.json({status:"fail","Message":"User not found"})
        }
        else{
            // Login Success
            let token=TokenEncode(data['email'],data['_id'])
            return res.json({status:"success","Message":"Student login successful",data:{token:token}})
        }
    }
    catch (e) {
        return res.json({status:"fail","Message":e.toString()})
    }
        return res.json({status:"success","Message":"Student login successful"})
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
        return res.json({status:"success",message:"Student profile Read successful"})
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


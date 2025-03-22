import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
const userSchema = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  files:[{type:mongoose.Schema.Types.ObjectId,ref:'project'}],
})


userSchema.pre('save',async function(next){
  if (!this.isModified("password")) return next();
  try {
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt)
  } catch (error) {
    next(error)
  }
})
userSchema.methods.generateToken= function () {
  const {userName,email,_id}=this
  try {
    const token=jwt.sign({id:_id,userName,email},process.env.JWT_SECRET,{expiresIn:'30d'})
    return token
  } catch (error) {
    return error
  }
}

export const userModel = mongoose.model("user", userSchema)

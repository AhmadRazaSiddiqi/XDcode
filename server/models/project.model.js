import mongoose from "mongoose"

const projectSchema = new mongoose.Schema({
  projectName:{type:String,required:true},
  javascript: String,
  html: String,
  css: String,
  createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'user',required:true}
})
projectSchema.pre('save',function(next){
  try {
      this.javascript = "console.log('Hello World')";
      this.html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>`
    this.css=`*{
               width:100vw;
               height:100vh
               }`
    next()
  } catch (error) {
    next(error)
  }
})


export const projectModel = mongoose.model("project", projectSchema)

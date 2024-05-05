import express from "express"
import dotenv from "dotenv"
import  mongoose from "mongoose"
import path from "path";
dotenv.config()

const app =express()
app.use(express.json())
const __dirname = path.resolve();
const port =5000

const connectDB= async()=>{
    const conn = await mongoose.connect(process.env.URI)
    if(conn){
        console.log("Connect To Data base");
    }
}


  app.get("/",(req,res)=>{
    res.status(200).json({
        success:"true",
        message:"Welcome after long time"
    })
   
  })

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "..", "client", "build")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
    });
  }



app.listen(port,()=>{
    console.log("server is running");
    connectDB()
})
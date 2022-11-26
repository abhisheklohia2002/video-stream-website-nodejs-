
const mongoose= require("mongoose");

mongoose.connect("mongodb://localhost:27017/form_info",{
    
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("Database Connection 200 OK")
}).catch(()=>{
    console.log("404 error in Database")
})
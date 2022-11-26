const { exec }  = require('child_process');
const path = require('path')
const express = require("express");
var http = require ("http");
var fs = require ("fs");

require("../database/Database");
const hbs  = require("hbs")
const port = 3000 || process.env.PORT;
const app = express();
const form_info = require("../model/UserSchema")

const static_path = path.join(__dirname,"../templates/views")
const partial_path = path.join(__dirname,"../templates/partials")



hbs.registerPartials(partial_path);
app.set("views",static_path)

app.set("view engine","hbs");
app.use(express.json());

//27 line is important for register without line we cannot access the data 
app.use(express.urlencoded({extended:false}));



console.log(path.join(__dirname,"../video/Chris Brown - Under The Influence (Lyrics).mp4"))

// app.use(express.static(static_path));

const move =path.join(__dirname,"../video/Chris Brown - Under The Influence (Lyrics).mp4")

app.get('/video', function(req, res) {
    const path = move
    const stat = fs.statSync(path)
    const fileSize = stat.size
    const range = req.headers.range
    if (range) {
      const parts = range.replace(/bytes=/, "").split("-")
      const start = parseInt(parts[0], 10)
      const end = parts[1] 
        ? parseInt(parts[1], 10)
        : fileSize-1
      const chunksize = (end-start)+1
      const file = fs.createReadStream(path, {start, end})
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      }
      res.writeHead(200, head)
      fs.createReadStream(path).pipe(res)
    }
  });

const pic = path.join(__dirname,"../../video/wp10243487-talk-is-cheap-show-me-the-code-wallpapers.jpg")

  fs.access(pic, fs.F_OK, (err) => {
    
    if (err) {
        exec(`${move}-ss 00:00:04.00 -r 1 -an -vframes 1 -f mjpeg ${pic}`, (error, stdout, stderr) => {
            if (error) {
                return;
            }

            res.render('index', {
                image: `${pic}`
            });
        });
    }

    if(err === null) {
        res.render('index', {
            image: `${pic}`
        });
    }
});







app.get("/",(req,res)=>{
    // res.send("welcom to Home Page")
    res.render("index",{
        title:"view engine"
    })
    
})


app.get("/register",(req,res)=>{
    res.render("register");

})


app.get("/login",(req,res)=>{
    res.render("login")
})

//we can get The data from crud operation the Method name is Post rq

app.post("/register",async(req,res)=>{
try {
    // console.log(req.body);
const name = req.body.Name;
const User = req.body.Username;
const Email = req.body.Email;
const Phone = req.body.Phone;
const pass = req.body.password;
const cpass = req.body.Confirm_password;

if(name != "" || "" !=User || Email != "" || Phone != "" || pass != "" || cpass != ""){

    if(pass ===  cpass){
        console.log(pass , "=" , cpass)
        const user = new form_info(req.body);
    const save = await user.save();

    }
    else {
  return (app.get("/register",(req,res)=>res.render("register")));

    }

}

else {
  return (app.get("*",(req,res)=>res.send("plz fill valid data")))

}


 


} catch (error) {
    console.log(error)
}
})



//login get info
 async function loginmongo(x,y){
   try {
    
    let Post =  await form_info.findOne({x,y});
    // console.log(Post)
    return Post;


   } catch (error) {
    
    console.log(error)
   }

}




app.post("/login", async (req,res)=>{
console.log(req.body);

try {
    const name_login = req.body.Name;
    const pass_login = req.body.password;
    
let collect = await loginmongo(name_login,pass_login);
console.log(collect,"querry");


} catch (error) {
   console.log(error) 
}




})







app.listen(port,()=>{
    console.log(`${port} is Connected `)
})




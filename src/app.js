const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 4000;
const ejs = require("ejs");
const buildTable = require("./script");

const Register = require("./models/usersdb");
require("./db/conn");

const static_path = path.join(__dirname,"../public");
//const template_path = path.join(__dirname,"../templates/views");
const partial_path = path.join(__dirname,"../partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//console.log(__dirname); //C:\Users\sahil\Documents\Sahil\MERN_Stack\MERN_Backend\src
app.use(express.static(static_path)); // index.html of public will run

app.set("view engine","ejs"); // if no templates, and directly view

//register the partial files -> navbar.js
//hbs.registerPartials(partial_path);


app.get("/",async(req,res)=>
{
    //res.send("Sahil Donde");
    try
    {
    const userEmail = await Register.find();
    res.render("index",{user:userEmail});
    }
    catch(err){}
    
});

app.get("/delete",async(req,res)=>
{

    const id = req.query.id;
    try
    {
    const userDelete = await Register.deleteOne( { email: id } );
    console.log(userDelete);
    const userEmail = await Register.find();
    res.redirect('/');
    }
    catch(err){}
})

app.get("/update",async(req,res)=>
{
    const id = req.query.id;
    try
    {
    
    const userEmail = await Register.findOne({email:id});
    res.render("update",{user:userEmail});
    }
    catch(err){}
    
})

app.post("/actual_update",async(req,res)=>
{
    try
    {
        const password = req.body.psw;
        const cpassword = req.body.psw_repeat;

        if(password==cpassword)
        {
            // res.status(200).send("Password Match");
            const userRegister = new Register({
                _id:req.query.id,
                firstname:req.body.fn,
                lastname:req.body.ln,
                email:req.body.email,
                gender:req.body.gender,
                phone:req.body.contact,
                age:req.body.age,
                password:req.body.psw,
                confirmpassword:req.body.psw_repeat
            })

            const updated_user = await Register.findOneAndUpdate(
                {_id:req.query.id},
                {
                    $set:userRegister
                }
            )
        
            console.log(updated_user);
            res.redirect("/");
        }
        else
        {
            res.status(200).send("Password Not Match");
        }
    
    }
    catch(error)
    {
        console.log(error);
        res.status(400).send(error);
    };
})

app.get("/register",(req,res)=>
{
    //res.send("Sahil Donde");
    res.render("register"); // register.js
});

app.post("/register",async(req,res)=>
{
    try
    {
        const password = req.body.psw;
        const cpassword = req.body.psw_repeat;

        if(password==cpassword)
        {
            // res.status(200).send("Password Match");
            const userRegister = new Register({
                firstname:req.body.fn,
                lastname:req.body.ln,
                email:req.body.email,
                gender:req.body.gender,
                phone:req.body.contact,
                age:req.body.age,
                password:req.body.psw,
                confirmpassword:req.body.psw_repeat
            })
            const entered_email = req.body.email;
            const registered_user = await userRegister.save();
            // res.status(201).render("index");
            //res.status(201).render(registered_user);
            const userEmail = await Register.find();
            res.render("index",{user:userEmail});
            console.log(registered_user);
        }
        else
        {
            res.status(200).send("Password Not Match");
        }
    
    }
    catch(error)
    {
        console.log(error);
        res.status(400).send(error);
    };
});

app.get("/login",(req,res)=>
{
    //res.send("Sahil Donde");
    res.render("login"); // login.js
});

app.post("/login",async(req,res)=>
{
    const name = () => {console.log("Hello");}
    name();
    try
    {
        const entered_email = req.body.email;
        const pwd = req.body.psw;
        console.log(`${entered_email} and ${pwd}`);

        const userEmail = await Register.findOne({email:entered_email});

        //res.send(userEmail);
        
        console.log(userEmail);
        
        if(userEmail.password==pwd)
        {
            res.status(201).render("after_login",
            {
                logged_in_user:entered_email,
                user:userEmail
            });
            
        }
        else
        {
            res.send("password not match"); 
        }

    }
    catch(error)
    {
        res.status(400).send("Invalid Email");
    }
})

app.listen(port, ()=>
{
    console.log(`Server is running at port no ${port}`);
});
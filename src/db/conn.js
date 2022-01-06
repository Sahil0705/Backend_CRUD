const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/RegistrationForm").then(()=>
// {
//     console.log("Connection Successful");
// }).catch((err)=>
// {
//     console.log("no connection, error: - ",err);
// });

mongoose.connect("mongodb+srv://Sahil:May07%40SD@cluster0.o7xi4.mongodb.net/first_db?retryWrites=true&w=majority").then(()=>
{
    console.log("Connection Successful");
}).catch((err)=>
{
    console.log("no connection, error: - ",err);
});
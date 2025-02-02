const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(8000,(req,res)=>{
    console.log(`Server Running On Port 8000`);
})
const express=require("express");
const { dirname } = require("path");
const fs=require("fs");
const { json } = require("body-parser");
const app=express();
app.use(express.json());
app.get("/",function(req,res){
    res.sendFile(__dirname+"/fronted/index9.html")
})

app.post("/todo",function (req,res){
    //console.log(req.body);
    //get dat from request
    //save data in file
    //send response
    saveTodoInFile(req.body,function(err){
        if(err){
            res.status(500).send("error");
            return;
        }
        res.status(200).send("success");
    });
});
app.get("/todo",function(req,res){
  readAllTodos(function(err,data){
    if(err){
      res.status(500).send("error")
      return;
    }

    res.status(200).json(data);
  });
});

app.get("/addEventScripts.js",function(req,res){
    res.sendFile(__dirname+"/fronted/scripts/addEventScripts.js");
})
  
app.listen(8000,function(){
    console.log("server is running port 8000");
});




function readAllTodos(callback){
    fs.readFile("./task.txt", "utf-8", function (err, data) {
        if (err) {
          callback(err);
          return;
        }
    
        if (data.length === 0) {
          data = "[]";
        }
    
        try {
          data = JSON.parse(data);
          callback(null, data);
        } catch (err) {
          callback(err);
        }
      });
}
function saveTodoInFile(todo, callback) {
    readAllTodos(function (err, data) {
      if (err) {
        callback(err);
        return;
      }
  
      data.push(todo);
  
      fs.writeFile("./task.txt", JSON.stringify(data), function (err) {
        if (err) {
          callback(err);
          return;
        }
  
        callback(null);
      });
    });
  }
var app = require('express').Router();
var Todo = require('../models/todo');


app.get('/todos',(req, res,next)=>{
   Todo.find({}, (err, todos) =>{
       if(err){
           return res.json({"success":false, "msg":"Error while retreiving Todos", "error": err})
       }
       res.status(200).send({"success":true, "result": todos})
   });

app.post('/todos', (req, res, next) => {
    if (!req.body.text){
        console.log(req.body.text)
        return res.status(400).json({"success": false, "msg": "error you need to send the text of the todo!"})
    }
    console.log(req.body.text)
    var todo = new Todo({
        text: req.body.text
    });
    todo.save((err) => {
        if(err){
            console.log("Some Error, ",err)
            return res.json({"success": false, "msg": "Error while creating new Todo", "error": err})
        }
        res.status(201).json({"sucess": true, "msg": "Successful created new Todo"}); 
    })
});


app.delete('/todos/:todoId', (req, res, next) => {
    var todoId = req.params.todoId;
    if(!todoId || todoId === ""){
        return res.json({ "success": false, "msg": "error you need to send the ID of the todo!" })
    }
    Todo.findByIdAndRemove(todoId, (err, removed) => {
        if(err){
            return res.json({ "success:": false, "msg": "Error while deleting Todo!", "Error": err})
        }
        res.status(200).json({"success": true, "msg": "Todo deleted!"});
    })
});

app.put('/todos/:todoId', (req, res, next) => {
    var todoId = req.params.todoId;
    if (!todoId || todoId === "") {
        return res.json({ "success": false, "msg": "error you need to send the ID of the todo!" })
    }
    if (!req.body.text) {
        
        return res.status(400).json({ "success": false, "msg": "error you need to send the text of the todo!" })
    }

    Todo.findByIdAndUpdate(todoId, { $set:{text:  req.body.text}}, (err, result) => {
        if(err){
            return res.json({ "success:": false, "msg": "Error while Updating Todo!", "Error": err })
        }
        res.status(200).json({ "success": true, "msg": "Todo updated!" });
    });
})
    
})
module.exports = app;
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var TodoSchema = new Schema({
    text:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
});

TodoSchema.pre('save', () => {
    var todo = this;

    var currentDate = Date.now();

    if(!todo.createdAt){
        todo.createdAt = currentDate;
    }
    next();
});
module.exports = mongoose.model('Todo', TodoSchema)
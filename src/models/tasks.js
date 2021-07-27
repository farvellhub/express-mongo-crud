const mongoose = require( "mongoose" );
const Schema = mongoose.Schema;


const TasksSchema = new Schema({
    title: String,
    description: String,
    status: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model( "tasks", TasksSchema );
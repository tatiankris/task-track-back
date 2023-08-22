import {model, Schema} from "mongoose";

const Task = new Schema({
    id: {
        type: String,
        unique: true,
    },
    title: {
        type: String,
    },
    text: {
        type: String,
    },
    complete: {
        type: Boolean,
    }
})

export default model('Task', Task)
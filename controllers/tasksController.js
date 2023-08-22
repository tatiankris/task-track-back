import Task from "../models/Task.js";

class tasksController {
    async serverConnected(req, res) {
        try {
            return res.json({connected: true});
        } catch (err) {
            res.status(400).json({message: "Connected with error"})
        }
    }

    async getTasks(req, res) {
        try {
            const tasks = await Task.find()
            return res.json({tasks});
        } catch (err) {
            res.status(400).json({message: "Get tasks error"})
        }
    }

    async createTask(req, res) {
        try {
            const {id, title, text, complete} = req.body
            const taskCheck = await Task.findOne({id})
            if (taskCheck) {
                return res.status(400).json({message: "This task already exist"})
            }
            const task = new Task({id: id, title: title, text: text, complete: complete})
            await task.save()

            const newTask = await Task.findOne({id})
            if (!newTask) {
                return res.status(400).json({message: "Add error"})
            }

            return res.json({message: 'Add successfully', task: newTask});

        } catch (err) {
            res.status(400).json({message: "Add task error"})
        }
    }

    async updateTask(req, res) {
        try {
            const {id, title, text, complete} = req.body
            const taskCheck = await Task.findOne({id})

            if (!taskCheck) {
                return
            }
            await Task.findOneAndUpdate({id: id}, {title: title, text: text, complete: complete})
            const task = await Task.findOne({id: id})
            return res.json({message: 'Updated successfully', task: task});

        } catch (err) {
            res.status(400).json({message: "Update task error"})
        }
    }

    async deleteTask(req, res) {
        try {
            const {id} = req.params
            const taskCheck = await Task.findOne({id})

            if (!taskCheck) {
                return
            }
            await Task.findOneAndDelete({id: id})
            const task = await Task.findOne({id: id})
            if (task) {
                return res.status(400).json({message: "Task not deleted"})
            }
            return res.json({message: 'Deleted successfully', id: id});

        } catch (err) {
            res.status(400).json({message: "Delete task error"})
        }
    }
}

export default new tasksController

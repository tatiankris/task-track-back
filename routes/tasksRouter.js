import Router from 'express'
import tasks from "../controllers/tasksController.js";

const router = new Router

router.get('', tasks.serverConnected)
router.get('/tasks', tasks.getTasks)
router.post('/tasks/task', tasks.createTask)
router.put('/tasks/task', tasks.updateTask)
router.delete('/tasks/task/:id', tasks.deleteTask)

export default router
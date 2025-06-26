const Router = require('koa-router');
const todoInputMiddleware = require('../middleware/todoInputMiddleware')
const todoHandler = require('../handlers/todoHandlers');

// Prefix all routes with /books
const router = new Router({
    prefix: '/api'
});

//Routes products
router.get('/todos', todoHandler.getTodos);
router.post('/todos', todoInputMiddleware, todoHandler.createTodo);
router.put('/todo/:id', todoHandler.updateTodo);
router.put('/todos', todoHandler.updateBulkTodos);
router.delete('/todo/:id', todoHandler.deleteTodo);
router.delete('/todos', todoHandler.deleteBulkTodos);

module.exports = router;

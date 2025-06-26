const repo = require('../database/todoRepository');

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
async function getTodos(ctx) {
    try {
        const { limit, sort } = ctx.query;
        const todos = await repo.getTodos(limit, sort);

        ctx.status = 200;
        ctx.body = {
            data: todos
        };
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            data: [],
            error: e.message
        };
    }
}

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */
async function createTodo(ctx) {
    try {
        const data = ctx.req.body;
        await repo.addTodo(data);

        ctx.status = 201;
        return ctx.body = {
            success: true,
            message: "Todo added successfully",
        };
    } catch (e) {
        ctx.status = 404;
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}


/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */
async function updateTodo(ctx) {
    try {
        const { id } = ctx.params;
        const newData = ctx.req.body;
        await repo.updateTodo(id, newData);
        ctx.status = 200;
        return ctx.body = {
            success: true,
            message: "Todo updated successfully",
        };
    } catch (e) {
        ctx.status = 404;
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */
async function updateBulkTodos(ctx) {
    try {
        const updatesData = ctx.req.body;
        if (updatesData.length > 500) {
            ctx.status = 400;
            return ctx.body = {
                error: "Cannot update more than 500 items"
            };
        }

        await repo.updateBulkTodos(updatesData);
        ctx.status = 201;
        return ctx.body = {
            success: true,
            message: `${updatesData.length} todos updated successfully`,
        };
    } catch (e) {
        ctx.status = 404;
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */
async function deleteTodo(ctx) {
    try {
        const { id } = ctx.params;
        await repo.deleteTodo(id);

        ctx.status = 200;
        return ctx.body = {
            success: true,
            message: "Todo deleted"
        };
    } catch (e) {
        ctx.status = 404;
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean, error: *}|{success: boolean}>}
 */
async function deleteBulkTodos(ctx) {
    try {
        const todoDocIds = ctx.req.body;
        console.log(todoDocIds);
        await repo.deleteBulkTodos(todoDocIds);
        ctx.status = 201;
        return ctx.body = {
            success: true,
            message: `${todoDocIds.length} todos deleted`,
        };
    } catch (e) {
        ctx.status = 404;
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    updateBulkTodos,
    deleteTodo,
    deleteBulkTodos
};
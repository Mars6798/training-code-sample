async function hello(request, response) {
    response.json({
        success: true,
        error: []
    })
}

module.exports = hello;
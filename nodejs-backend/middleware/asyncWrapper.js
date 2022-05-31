
//middleware for error handling
function RunAsyncWrapper (callback) {
    return function (req, res, next) {
        callback(req, res, next)
            .catch(next)
    }
}

export default RunAsyncWrapper

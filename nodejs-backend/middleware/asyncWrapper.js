// middleware for error handling
function RunAsyncWrapper(callback) {
	return function Wrapper(req, res, next) {
		callback(req, res, next)
			.catch(next)
	}
}

export default RunAsyncWrapper
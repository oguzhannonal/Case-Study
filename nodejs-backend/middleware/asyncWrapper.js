// middleware for error handling
function asyncErrorWrapper(callback) {
	return function Wrapper(req, res, next) {
		callback(req, res, next)
			.catch(next)
	}
}

export default asyncErrorWrapper
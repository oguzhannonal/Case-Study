//error handling
function ErrorHandler(err, req, res, next) {
	if (res.headersSent) {
		return next(err)
	}
	res.status(500)
	res.render('error', {
		error: err
	})
}
export default ErrorHandler
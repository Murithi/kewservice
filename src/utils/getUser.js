const jwt = require('jsonwebtoken')

function getUserId({ request, SECRET }) {
	const Authorization = request.get('Authorization')

	if (Authorization) {
		const token = Authorization.replace('Bearer ', '')
		console.log(jwt.verify(token, SECRET))
		const { user } = jwt.verify(token, SECRET)
		return user.id
	}

	throw new AuthError()
}

class AuthError extends Error {
	constructor() {
		super('Not authorized')
	}
}

module.exports = {
	getUserId,
	AuthError,
}

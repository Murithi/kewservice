const hi = {
	hi: (_, { name }, context, info) => `Hi ${name || 'World'}`,
}

module.exports = { hi }

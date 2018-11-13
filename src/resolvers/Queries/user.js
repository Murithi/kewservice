const { getUserId } = require('../../utils/getUser')

const UserQuery = {
	user: async (_, { id }, { models }, info) =>
		await models.User.findOne({ where: { id } }),
	userFeed: async (_, args, { models }) => await models.User.findAll(),
	me: async (_, args, ctx) => {
		const id = getUserId(ctx)
		const request = await ctx.models.User.findOne({ where: { id } })
		return request
	},
}

module.exports = { UserQuery }

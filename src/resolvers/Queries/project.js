const { getUserId } = require('../../utils/getUser')
const ProjectQuery = {
	projectFeed: async (_, args, ctx) => {
		// const id = getUserId(ctx)
		// console.log(id)
		return await ctx.models.Project.findAll()
	},
	project: async (_, { id }, { models }) =>
		await models.Project.findOne({ where: { id } }),
}

module.exports = { ProjectQuery }

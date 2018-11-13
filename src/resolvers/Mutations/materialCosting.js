const { getUserId } = require('../../utils/getUser')

const MaterialCosting = {
	addMaterials: async (_, args, ctx) => {
		const user_id = getUserId(ctx)
		try {
			await ctx.models.MaterialsCosting.create({ ...args, user_id })
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	editMaterials: async (_, { id, ...otherargs }, ctx) => {
		const user_id = getUserId(ctx)
		try {
			const mat = await ctx.models.MaterialsCosting.findOne({ where: { id } })
			await mat.update({ ...otherargs, user_id })
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	removeMaterials: async (_, { id }, { models }) => {
		try {
			const mat = await models.MaterialsCosting.findOne({ where: { id } })
			mat.destroy()
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
}

module.exports = { MaterialCosting }

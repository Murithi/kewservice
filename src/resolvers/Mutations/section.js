const Section = {
	addSection: async (_, args, { models }, info) => {
		try {
			await models.Section.create(args)
			return true
		} catch (err) {
			console.log(err)
			return false
		}
	},

	editSection: async (_, { id, ...otherArgs }, { models }) => {
		try {
			const section = await models.Section.findOne({ where: { id } })
			await section.update({ ...otherArgs })
			return true
		} catch (err) {
			console.log(err)
			return false
		}
	},

	removeSection: async (_, { id }, { models }) => {
		try {
			const section = await models.Section.findOne({ where: { id } })
			await section.destroy()
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
}
module.exports = { Section }

const Project = {
	addProject: async (_, args, { models }) => {
		try {
			await models.Project.create(args)
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	editProject: async (_, { id, ...otherArgs }, { models }) => {
		try {
			const project = await models.Project.findOne({ where: { id } })
			await project.update({ ...otherArgs })
			return true
		} catch (err) {
			console.log(err)
			return false
		}
	},
	removeProject: async (_, { id }, { models }) => {
		try {
			const project = await models.Project.findOne({ where: { id } })
			await project.destroy()
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
}

module.exports = { Project }

const Role = {
	addRole: async (_, args, { models }, info) => {
		try {
			await models.Role.create(args)
			return true
		} catch (err) {
			console.log(err)
			return false
		}
	},
	editRole: async (_, { id, ...otherArgs }, { models }, info) => {
		try {
			const role = await models.Role.findOne({ where: { id } })
			await role.update({ ...otherArgs })
			return true
		} catch (err) {
			console.log(err)
			return false
		}
	},

	describeRole: async (_, { id, description }, { models }, info) => {
		try {
			const role = await models.Role.findOne({ where: { id } })
			await role.update({ description })
			return true
		} catch (err) {
			console.log(err)
			return false
		}
	},
	removeRole: async (_, { id }, { models }, info) => {
		try {
			const role = await models.Role.findOne({ where: { id } })
			await role.destroy()
			return true
		} catch (error) {
			console.log(err)
			return false
		}
	},
}

module.exports = { Role }

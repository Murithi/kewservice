const Personnel = {
	addPersonnel: async (_, args, { models }, info) => {
		try {
			await models.Personnel.create(args)
			return true
		} catch (err) {
			console.log(err)
			return false
		}
	},
	editPersonnel: async (_, { id, ...otherArgs }, { models }) => {
		try {
			const person = await models.Personnel.findOne({ where: { id } })
			await person.update({ ...otherArgs })
			return true
		} catch (err) {
			console.log(err)
			return false
		}
	},
	assignToProject: async (_, { id, ...otherArgs }, { models }) => {
		try {
			const person = await models.Personnel.find({ where: { id } })
			await person.update({ ...otherArgs, assignedToProject: true })
			return true
		} catch (err) {
			console.log(err)
			return false
		}
	},
	assignToSection: async (_, args, { models }) => {
		try {
			console.log(args)
			await models.PersonnelSectionAssignment.create(args)
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
	terminatePersonnel: async (_, { id, ...otherArgs }, { models }) => {
		try {
			const person = await models.Personnel.findOne({ where: { id } })
			await person.update({ ...otherArgs })
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
	removePersonnel: async (_, { id }, { models }) => {
		try {
			const person = await models.Personnel.findOne({ where: { id } })
			await person.destroy()
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
}

module.exports = { Personnel }

const Vehicle = {
	addVehicle: async (_, args, { models }) => {
		try {
			console.log(models.Vehicle)
			await models.Vehicle.create(args)
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	editVehicle: async (_, { id, ...otherArgs }, { models }) => {
		try {
			const vehicle = await models.Vehicle.findOne({ where: { id } })
			await owner.update({ ...otherArgs })
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	removeVehicle: async (_, { id }, { models }) => {
		try {
			const vehicle = await models.Vehicle.findOne({ where: { id } })
			vehicle.destroy()
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
}

module.exports = { Vehicle }

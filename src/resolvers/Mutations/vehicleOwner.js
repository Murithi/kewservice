const VehicleOwner = {
	addVehicleOwner: async (_, args, { models }) => {
		try {
			return await models.VehicleOwner.create(args)
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	editVehicleOwner: async (_, { id, ...otherArgs }, { models }) => {
		try {
			const owner = await models.VehicleOwner.findOne({ where: { id } })
			await owner.update({ ...otherArgs })
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	deleteVehicleOwner: async (_, { id }, { models }) => {
		try {
			const owner = await models.VehicleOwner.findOne({ where: { id } })
			await owner.destroy()
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
}

module.exports = { VehicleOwner }

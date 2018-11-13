const VehicleQuery = {
	vehicleFeed: async (_, args, { models }) => await models.Vehicle.findAll(),
	getVehicle: async (_, { id }, { models }) =>
		await models.Vehicle.findOne({ where: { id } }),
	vehicleDisplayFeed: async (_, args, { models }) => {
		let assigned = false || null
		return await models.Vehicle.findAll({ where: { assigned } })
	},
	vehicleAssignedFeed: async (_, args, { models }) => {
		let assigned = true
		return await models.Vehicle.findAll({ where: { assigned } })
	},
	vehicleAssignmentFeed: async (_, args, { models }) =>
		await models.VehicleAssignment.findAll(),
	vehicleAssignment: async (_, { id }, { models }) =>
		await models.VehicleAssignment.findOne({ where: { id } }),
}

module.exports = { VehicleQuery }

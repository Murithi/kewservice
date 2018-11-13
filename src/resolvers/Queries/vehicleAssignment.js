const VehicleAssignmentQuery = {
	vehicleAssignmentFeed: async (_, args, { models }) =>
		await models.VehicleAssignment.findAll(),
	vehicleAssignment: async (_, { id }, { models }) =>
		await models.VehicleAssignment.findOne({ where: { id } }),
}

module.exports = { VehicleAssignmentQuery }

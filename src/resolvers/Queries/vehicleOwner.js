const VehicleOwnerQuery = {
	vehicleOwnerFeed: async (_, args, { models }) =>
		await models.VehicleOwner.findAll(),
	vehicleOwner: async (_, { id }, { models }) =>
		await models.VehicleOwner.findOne({ where: { id } }),
}

module.exports = { VehicleOwnerQuery }

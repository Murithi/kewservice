const MaterialsCostingQuery = {
	materialsCostingFeed: async (_, args, { models }) =>
		await models.MaterialsCosting.findAll(),
	materialsCosting: async (_, { id }, { models }) =>
		await models.MaterialsCosting.findOne({ where: { id } }),
}

module.exports = { MaterialsCostingQuery }

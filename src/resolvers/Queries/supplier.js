const SupplierQuery = {
	suppliersFeed: async (_, args, { models }) => await models.Supplier.findAll(),
	getSupplier: async (_, { id }, { models }) =>
		await models.Supplier.findOne({ where: { id } }),
}

module.exports = { SupplierQuery }

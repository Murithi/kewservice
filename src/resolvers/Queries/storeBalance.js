const StoreBalanceQuery = {
	storeBalanceFeed: async (_, args, { models }) =>
		models.StoreBalance.findAll(),
	storeBalance: async (_, { id }, { models }) =>
		models.StoreBalance.findOne({ where: { id } }),
}

module.exports = { StoreBalanceQuery }

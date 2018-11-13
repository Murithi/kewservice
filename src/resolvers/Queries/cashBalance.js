const CashBalanceQuery = {
	balanceFeed: async (_, args, { models }) =>
		await models.CashBalance.findAll(),
	balance: async (_, { id }, { models }) =>
		await models.CashBalance.findOne({ where: { id } }),
}

module.exports = { CashBalanceQuery }

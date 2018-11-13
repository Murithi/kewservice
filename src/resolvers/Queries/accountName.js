const AccountNameQuery = {
	accountFeed: async (_, args, { models }) => models.AccountName.findAll(),
	account: async (_, { id }, { models }) =>
		models.AccountName.findOne({ where: { id } }),
}

module.exports = { AccountNameQuery }

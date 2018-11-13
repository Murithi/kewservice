const AccountName = {
	addAccount: async (_, args, { models }) => {
		try {
			const Request = await models.AccountName.create(args)
			let account_name_id = Request.id
			let balance = 0
			const cbal = await models.CashBalance.create({ balance, account_name_id })
			console.log(cbal)
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	editAccount: async (_, { id, ...otherargs }, { models }) => {
		try {
			const account = await models.AccountName.findOne({ where: { id } })
			await account.update({ ...otherargs })
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	removeAccount: async (_, { id }, { models }) => {
		try {
			const account = await models.AccountName.findOne({ where: { id } })
			account.destroy()
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
}
module.exports = { AccountName }

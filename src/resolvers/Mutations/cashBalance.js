const CashBalance = {
	editBalance: async (_, { account_name_id, ...otherargs }, { models }) => {
		try {
			const bal = await models.CashBalance.findOne({
				where: { id: account_name_id },
			})
			await bal.update({ ...otherargs })
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	removeBalance: async (_, { account_name_id }, { models }) => {
		try {
			const bal = await models.CashBalance.findOne({
				where: { id: account_name_id },
			})
			await bal.destroy()
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
}

module.exports = { CashBalance }

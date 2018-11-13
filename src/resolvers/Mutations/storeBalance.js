const StoreBalance = {
	addStoreBalance: async (_, args, { models }) => {
		try {
			await models.StoreBalance.create(args)
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	editStoreBalance: async (_, { id, ...otherArgs }, { models }) => {
		try {
			const bal = await models.StoreBalance.findOne({ where: { id } })
			bal.update({ ...otherArgs })
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
	removeBalanceEntry: async (_, { id }, { models }) => {
		try {
			const bal = await models.StoreBalance.findOne({ where: { id } })
			bal.destroy()
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
}

module.exports = { StoreBalance }

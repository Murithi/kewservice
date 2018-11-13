const { getUserId } = require('../../utils/getUser')

const StoreTransaction = {
	addReciepts: async (_, args, ctx) => {
		try {
			const {
				unitsTransacted,
				transactionDate,
				deliveryNote,
				supplierId,
				StoreBalId,
				materialsCostingId,
				balanceBefore,
			} = args
			const userId = getUserId(ctx)
			const transactionType = 'RECIEPTS'
			const balanceAfter = balanceBefore + unitsTransacted
			let supplier_id = supplierId
			const saveTran = await ctx.models.StoreTransaction.create({
				userId,
				unitsTransacted,
				balanceAfter,
				balanceBefore,
				supplierId,
				transactionType,
				materialsCostingId,
				transactionDate,
				deliveryNote,
			})
			console.log(saveTran)
			let id = StoreBalId
			const bal = await ctx.models.StoreBalance.findOne({ where: { id } })
			console.log(bal)
			await bal.update({ balance: balanceAfter })

			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
	addIssue: async (_, args, ctx) => {
		try {
			const {
				unitsTransacted,
				balanceBefore,
				transactionDate,
				deliveryNote,
				StoreBalId,
				projectId,
				materialsCostingId,
			} = args
			const userId = getUserId(ctx)
			const transactionType = 'ISSUES'
			const balanceAfter = balanceBefore - unitsTransacted

			await ctx.models.StoreTransaction.create({
				userId,
				unitsTransacted,
				balanceAfter,
				balanceBefore,
				transactionType,
				materialsCostingId,
				transactionDate,
				deliveryNote,
				projectId,
			})
			let id = StoreBalId
			const bal = await models.StoreBalance.findOne({ where: { id } })
			await bal.update({ balance: balanceAfter })

			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
}

module.exports = { StoreTransaction }

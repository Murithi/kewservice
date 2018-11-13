const { getUserId } = require('../../utils/getUser')
const Supplier = {
	createSupplier: async (_, { materialscostingId, ...otherArgs }, ctx) => {
		try {
			const userId = getUserId(ctx)
			const supplier = await ctx.models.Supplier.create({ ...otherArgs })

			let supplierId = supplier.id
			await ctx.models.Supplier_member.create({
				supplierId,
				materialscostingId,
			})
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
	editSupplier: async (_, { id, materialscostingId, ...otherargs }, ctx) => {
		try {
			const userId = getUserId(ctx)
			const supplier = await ctx.models.Supplier.findOne({ where: { id } })
			supplier.update({ ...otherargs })
			// let supplierId = supplier.id
			// const recSupp = await ctx.models.Supplier_member.findOne({where:{supplierId}})
			// recSupp.update({supplierId, materialscostingId})
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
}

module.exports = { Supplier }

const { getUserId } = require('../../utils/getUser')

const RepairsRequest = {
	addRepairsRequisition: async (_, args, ctx) => {
		try {
			const userId = getUserId(ctx)

			const request = await ctx.models.RepairsRequisition.create({
				...args,
				issuedCash: false,
				approvalStatus: false,
				cashIssued: false,
				transactionCompleted: false,
			})

			let repairrequisitionId = request.repairrequisition_id

			const newRep = await ctx.models.InitiatedRepairsRequest.create({
				repairrequisitionId,
				userId,
			})

			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	approveRepairsRequistion: async (
		_,
		{ approvalStatus, repairrequisitionId, approvalDate },
		ctx,
	) => {
		try {
			const userId = getUserId(ctx)
			let transactionCompleted = true
			if (approvalStatus) transactionCompleted = false
			let repairrequisition_id = repairrequisitionId
			const request = await ctx.models.RepairsRequisition.findOne({
				where: { repairrequisition_id },
			})
			const approvedReq = await request.update({
				approvalDate,
				approvalStatus,
				transactionCompleted,
			})
			if (!transactionCompleted) {
				const approvedT = await ctx.models.ApprovedRepairsRequest.create({
					userId,
					repairrequisitionId,
				})
			}
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	approveAllRepairsRequisition: async (_, { approvalDate }, ctx) => {
		try {
			const userId = getUserId(ctx)
			let approvalStatus = true

			const requests = await ctx.models.RepairsRequisition.findAll({
				where: {
					approvalStatus: {
						$not: true,
					},
				},
			})

			requests.map(async request => {
				let repairrequisitionId = request.repairrequisition_id
				console.log(repairrequisitionId)
				await request.update({ approvalDate, approvalStatus })
				await ctx.models.ApprovedRepairsRequest.create({
					userId,
					repairrequisitionId,
				})
			})

			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
	removeRepairsRequest: async (_, { repairrequisitionId }, ctx) => {
		try {
			let repairrequisition_id = repairrequisitionId
			const request = await ctx.models.RepairsRequisition.findOne({
				where: { repairrequisition_id },
			})
			request.destroy()

			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
}

module.exports = { RepairsRequest }

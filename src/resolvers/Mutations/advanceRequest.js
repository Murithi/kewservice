const { getUserId } = require('../../utils/getUser')

const AdvanceRequest = {
	addAdvanceRequest: async (_, args, ctx) => {
		try {
			const userId = getUserId(ctx)
			const request = await ctx.models.AdvanceRequest.create(args)
			let advanceRequestId = request.advanceRequest_id
			await ctx.models.InitiatedAdvanceRequests.create({
				advanceRequestId,
				userId,
			})
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	approveAdvanceRequest: async (
		_,
		{ advanceRequestId, approvalDate, approvalStatus },
		ctx,
	) => {
		try {
			const userId = getUserId(ctx)
			let transactionCompleted = true
			if (approvalStatus) transactionCompleted = false
			let advanceRequest_id = advanceRequestId
			const request = await ctx.models.AdvanceRequest.findOne({
				where: { advanceRequest_id },
			})
			const approvedReq = await request.update({
				approvalStatus,
				approvalDate,
				transactionCompleted,
			})
			if (!transactionCompleted) {
				const approvedT = await ctx.models.ApprovedAdvanceRequests.create({
					userId,
					advanceRequestId,
				})
			}
			console.log(approvedT)
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	approveAllAdvanceRequest: async (_, { approvalDate }, ctx) => {
		try {
			const userId = getUserId(ctx)
			let approvalStatus = true
			const requests = await ctx.models.AdvanceRequest.findAll({
				where: {
					approvalStatus: {
						$not: true,
					},
				},
			})

			requests.map(async request => {
				let advanceRequest_id = request.advanceRequestId
				await request.update({ approvalStatus, approvalDate })
				await ctx.models.ApprovedAdvanceRequests.create({
					userId,
					advanceRequestId,
				})
			})
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
	deleteAdvanceRequest: async (_, { id }, ctx) => {
		try {
			const request = await ctx.models.AdvanceRequest.findOne({
				where: { id },
			})
			await request.destroy()
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
}

module.exports = { AdvanceRequest }

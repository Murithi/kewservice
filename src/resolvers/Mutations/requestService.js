const { getUserId } = require('../../utils/getUser')

const RequestService = {
	addRequestService: async (_, args, ctx) => {
		try {
			const userId = getUserId(ctx)
			const request = await ctx.models.RequestService.create({
				...args,
				issuedCash: false,
				approvalStatus: false,
				cashIssued: false,
				transactionCompleted: false,
			})

			let requestserviceId = request.requestservice_id
			await ctx.models.InitiatedRequestService.create({
				requestserviceId,
				userId,
			})
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	approveRequestService: async (
		_,
		{ approvalStatus, requestserviceId, approvalDate },
		ctx,
	) => {
		try {
			const userId = getUserId(ctx)
			let transactionCompleted = true
			if (approvalStatus) transactionCompleted = false
			let requestservice_id = requestserviceId
			const request = await ctx.models.RequestService.findOne({
				where: { requestservice_id },
			})
			await request.update({
				approvalDate,
				approvalStatus,
				transactionCompleted,
			})
			if (!transactionCompleted) {
				const approvedT = await ctx.models.ApprovedRequestService.create({
					userId,
					requestserviceId,
				})
			}
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	approveAllRequestService: async (_, { approvalDate }, ctx) => {
		try {
			const userId = getUserId(ctx)
			let approvalStatus = true

			const requests = await ctx.models.RequestService.findAll({
				where: {
					approvalStatus: {
						$not: true,
					},
				},
			})

			requests.map(async request => {
				let requestserviceId = request.requestservice_id
				await request.update({ approvalDate, approvalStatus })
				await ctx.models.ApprovedRequestService.create({
					userId,
					requestserviceId,
				})
			})

			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
	removeRequestService: async (_, { requestserviceId }, ctx) => {
		try {
			let requestservice_id = requestserviceId
			const request = await ctx.models.RequestService.findOne({
				where: { requestservice_id },
			})
			await request.destroy()

			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
}

module.exports = { RequestService }

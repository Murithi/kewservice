const { getUserId } = require('../../utils/getUser')
const OverTimeRequest = {
	addOverTimeRequest: async (_, args, ctx) => {
		try {
			const userId = getUserId(ctx)
			const request = await ctx.models.OverTimeRequest.create(args)
			let overtimerequestId = request.overtimerequest_id
			await ctx.models.InitiatedOverTimeRequests.create({
				overtimerequestId,
				userId,
			})
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	approveOverTimeRequest: async (
		_,
		{ overtimerequestId, approvalDate },
		ctx,
	) => {
		try {
			const userId = getUserId(ctx)
			let approvalStatus = true
			let overtimerequest_id = overtimerequestId
			const request = await ctx.models.OverTimeRequest.findOne({
				where: { overtimerequest_id },
			})
			const approvedReq = await request.update({ approvalStatus, approvalDate })
			const approvedT = await ctx.models.ApprovedOverTimeRequests.create({
				userId,
				overtimerequestId,
			})

			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	approveAllOverTimeRequest: async (_, { approvalDate }, ctx) => {
		try {
			const userId = getUserId(ctx)
			let approvalStatus = true

			const requests = await ctx.models.OverTimeRequest.findAll({
				where: {
					approvalStatus: {
						$not: true,
					},
				},
			})

			requests.map(async request => {
				let overtimerequestId = request.overtimerequest_id
				await request.update({ approvalDate, approvalStatus })
				await ctx.models.ApprovedOverTimeRequests.create({
					userId,
					overtimerequestId,
				})
			})

			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	deleteOverTimeRequest: async (_, { id }, ctx) => {
		try {
			const request = await ctx.models.OverTimeRequest.findOne({
				where: { overtimerequest_id: id },
			})
			await request.destroy()
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
}

module.exports = { OverTimeRequest }

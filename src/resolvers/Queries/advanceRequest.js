const AdvanceRequestQuery = {
	advanceRequestFeed: async (_, args, { models }) =>
		await models.AdvanceRequest.findAll(),

	initiatedAdvanceRequestFeed: async (_, args, ctx) => {
		//const feed = await models.AdvanceRequest.findAll()
		return await await ctx.models.AdvanceRequest.findAll({
			where: {
				approvalStatus: {
					$not: true,
				},
				transactionCompleted: {
					$not: true,
				},
			},
			order: [['requestDate', 'ASC']],
		})
	},

	approvedAdvanceRequestFeed: async (_, args, ctx) => {
		return await ctx.models.AdvanceRequest.findAll({
			where: {
				approvalStatus: {
					$not: false,
				},
				issuedCash: {
					$not: true,
				},
			},
		})
	},

	issuedAdvanceRequestFeed: async (_, args, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."approvedAdvanceRequests" i join public."AdvanceRequests"a on i."advanceRequest_id" =a."advanceRequest_id" and "issuedCash"=true ',
			{
				model: ctx.models.ApprovedAdvanceRequests,
				raw: true,
			},
		)
		return feed
	},
	issuedAdvanceRequest: async (_, { advanceRequestId }, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."approvedAdvanceRequests" i join public."AdvanceRequests" a on i."advanceRequest_id" =a."advanceRequest_id" and "issuedCash"=true and "transactionCompleted"=false where i."advanceRequest_id" = ?',
			{
				replacements: [advanceRequestId],
				model: ctx.models.approvedAdvanceRequests,
				raw: true,
			},
		)
		return feed[0][0]
	},
	initiatedAdvanceRequest: async (_, { advanceRequestId }, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."initiatedAdvanceRequests" i join public."AdvanceRequests" a on i."advanceRequest_id" =a."advanceRequest_id" where i."advanceRequest_id" = ? ',
			{
				replacements: [advanceRequestId],
				model: ctx.models.initiatedAdvanceRequests,
				raw: true,
			},
		)
		return feed[0][0]
	},

	approvedAdvanceRequest: async (_, { advanceRequestId }, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."approvedAdvanceRequests" i join public."AdvanceRequests" a on i."advanceRequest_id" =a."advanceRequest_id" where i."advanceRequest_id" = ?',
			{
				replacements: [advanceRequestId],
				model: ctx.models.approvedAdvanceRequests,
				raw: true,
			},
		)
		return feed[0][0]
	},
}

module.exports = { AdvanceRequestQuery }

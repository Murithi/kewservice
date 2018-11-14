const OverTimeRequestQuery = {
	overTimeRequestFeed: async (_, args, { models }) =>
		await models.OverTimeRequest.findAll(),
	initiatedOverTimeRequestFeed: async (_, args, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."initiatedOverTimeRequests" i join public."overTimeRequests" a on i."overtimerequest_id" =a."overtimerequest_id" and a."approvalStatus" is not true and "transactionCompleted" is not true order by a."requestDate" asc',
			{
				model: ctx.models.initiatedOverTimeRequests,
				raw: true,
			},
		)
		return feed[0]
	},

	approvedOverTimeRequestFeed: async (_, args, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."approvedOverTimeRequests" i join public."overTimeRequests"a on i."overtimerequest_id" =a."overtimerequest_id" and a."issuedCash" is not true',
			{
				model: ctx.models.ApprovedOverTimeRequests,
				raw: true,
			},
		)
		return feed
	},

	issuedOverTimeRequestFeed: async (_, args, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."approvedOverTimeRequests" i join public."overTimeRequests"a on i."overtimerequest_id" =a."overtimerequest_id" and a."issuedCash" = true order by a."requestDate" DESC',
			{
				model: ctx.models.ApprovedOverTimeRequests,
				raw: true,
			},
		)
		return feed
	},

	initiatedOverTimeRequest: async (_, { overtimerequestId }, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."initiatedOverTimeRequests" i join public."overTimeRequests" a on i."overtimerequest_id" =a."overtimerequest_id" where i."overtimerequest_id" = ?',
			{
				replacements: [overtimerequestId],
				model: ctx.models.initiatedOverTimeRequests,
				raw: true,
			},
		)
		return feed[0][0]
	},

	approvedOverTimeRequest: async (_, { overtimerequestId }, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."approvedOverTimeRequests" i join public."overTimeRequests"a on i."overtimerequest_id" =a."overtimerequest_id" where i."overtimerequest_id" = ?',
			{
				replacements: [overtimerequestId],
				model: ctx.models.approvedOverTimeRequests,
				raw: true,
			},
		)

		return feed[0][0]
	},
}

module.exports = { OverTimeRequestQuery }

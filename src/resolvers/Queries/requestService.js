const RequestServiceQuery = {
	requestServiceFeed: async (_, args, { models }) =>
		await models.RequestService.findAll(),
	InitiatedRequisitionsFeed: async (_, args, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."initiatedRequestServices"  i join public."requestServices" a on i."requestservice_id" =a."requestservice_id" and a."approvalStatus" is not true  and "transactionCompleted" is not true order by a."requestDate" asc',
			{
				model: ctx.models.InitiatedRequestServices,
				raw: true,
			},
		)
		return feed[0]
	},

	approvedRequisitionsFeed: async (_, args, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."approvedRequestServices"  i join public."requestServices" a on i."requestservice_id" =a."requestservice_id" and "issuedCash"=false',
			{
				model: ctx.models.ApprovedRequestServices,
				raw: true,
			},
		)

		return feed[0]
	},
	issuedRequisitionsFeed: async (_, args, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."approvedRequestServices"  i join public."requestServices" a on i."requestservice_id" =a."requestservice_id" and "issuedCash"=true and "transactionCompleted" is not true',
			{
				model: ctx.models.ApprovedRequestServices,
				raw: true,
			},
		)

		return feed[0]
	},

	issuedRequisition: async (_, { requestServiceId }, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."approvedRequestServices"  i join public."requestServices" a on i."requestservice_id" =a."requestservice_id" and "issuedCash"=true and "transactionCompleted" is not true and a.requestservice_id= ? ',
			{
				replacements: [requestServiceId],
				model: ctx.models.ApprovedRequestServices,
				raw: true,
			},
		)

		return feed[0][0]
	},
	initiatedRequisition: async (_, { requestServiceId }, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."initiatedRequestServices" i join public."requestServices" a on i."requestservice_id" =a."requestservice_id" where i."requestservice_id" = ?',
			{
				replacements: [requestServiceId],
				model: ctx.models.InitiatedRequestServices,
				raw: true,
			},
		)
		return feed[0][0]
	},

	approvedRequisition: async (_, { requestServiceId }, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."approvedRequestServices"  i join public."requestServices" a on i."requestservice_id" =a."requestservice_id" where i."requestservice_id" = ?',
			{
				replacements: [requestServiceId],
				model: ctx.models.ApprovedRequestServices,
				raw: true,
			},
		)
		console.log(feed)
		return feed[0][0]
	},
}

module.exports = { RequestServiceQuery }

const MiscellaneousRequisitionQuery = {
	miscellaneousRequestFeed: async (_, args, { models }) =>
		await models.MiscellaneousRequisition.findAll(),
	initiatedMiscellaneousRequisitionFeed: async (_, args, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."initiatedMiscellaneousRequests"  i join public."miscellaneousRequisitions" a on i."miscellaneousrequisition_id" =a."miscellaneousrequisition_id" and a."approvalStatus" is not true and "transactionCompleted" is not true order by a."requestDate" asc',
			{
				model: ctx.models.InitiatedMiscellaneousRequest,
				raw: true,
			},
		)
		return feed
	},

	approvedMiscellaneousRequisitionFeed: async (_, args, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."approvedMiscellaneousRequests"  i join public."miscellaneousRequisitions" a on i."miscellaneousrequisition_id" =a."miscellaneousrequisition_id" and a."approvalStatus" is not false and a."issuedCash" is not true',
			{
				model: ctx.models.ApprovedMiscellaneousRequest,
				raw: true,
			},
		)

		return feed
	},

	initiatedMiscellaneousRequisition: async (
		_,
		{ miscellaneousrequisitionId },
		ctx,
	) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."initiatedMiscellaneousRequests" i join public."miscellaneousRequisitions" a on i."miscellaneousrequisition_id" =a."miscellaneousrequisition_id" where i."miscellaneousrequisition_id" = ?',
			{
				replacements: [miscellaneousrequisitionId],
				model: ctx.models.InitiatedMiscellaneousRequest,
				raw: true,
			},
		)
		return feed[0]
	},

	approvedMiscellaneousRequisition: async (
		_,
		{ miscellaneousrequisitionId },
		ctx,
	) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."approvedMiscellaneousRequests"  i join public."miscellaneousRequisitions" a on i."miscellaneousrequisition_id" =a."miscellaneousrequisition_id" where i."miscellaneousrequisition_id" = ?',
			{
				replacements: [miscellaneousrequisitionId],
				model: ctx.models.ApprovedMiscellaneousRequest,
				raw: true,
			},
		)

		return feed[0]
	},

	issuedMiscellaneousRequisitionsFeed: async (_, args, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."approvedMiscellaneousRequests"  i join public."miscellaneousRequisitions" a on i."miscellaneousrequisition_id" =a."miscellaneousrequisition_id" and "issuedCash"=true and "transactionCompleted" is not true',
			{
				model: ctx.models.ApprovedMiscellaneousRequest,
				raw: true,
			},
		)
		console.log(feed)
		return feed
	},
}

module.exports = { MiscellaneousRequisitionQuery }

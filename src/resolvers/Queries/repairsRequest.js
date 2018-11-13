const RepairsRequestQuery = {
	repairsRequestFeed: async (_, args, { models }) =>
		await models.RepairsRequisition.findAll(),
	initiatedRepairsRequisitionsFeed: async (_, args, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."initiatedRepairsRequests"  i join public."repairsRequisitions" a on i."repairrequisition_id" =a."repairrequisition_id" and a."approvalStatus" is not true and "transactionCompleted" is not true order by a."requestDate" asc',
			{
				model: ctx.models.InitiatedRepairsRequest,
				raw: true,
			},
		)

		return feed
	},
	approvedRepairsRequisitionsFeed: async (_, args, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."approvedRepairsRequests"  i join public."repairsRequisitions" a on i."repairrequisition_id" =a."repairrequisition_id" and a."issuedCash"=false and  a."approvalStatus"=true',
			{
				model: ctx.models.ApprovedRepairsRequests,
				raw: true,
			},
		)

		return feed[0]
	},
	issuedRepairsRequisitionsFeed: async (_, args, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."approvedRepairsRequests"  i join public."repairsRequisitions" a on i."repairrequisition_id" =a."repairrequisition_id" and "issuedCash"=true and "transactionCompleted"=false',
			{
				model: ctx.models.ApprovedRepairsRequests,
				raw: true,
			},
		)

		return feed[0]
	},

	issuedRepairsRequisition: async (_, { repairrequisitionId }, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."approvedRepairsRequests"  i join public."repairsRequisitions" a on i."repairrequisition_id" =a."repairrequisition_id" and "issuedCash"=true and "transactionCompleted"=false and a.repairrequisition_id= ? ',
			{
				replacements: [repairrequisitionId],
				model: ctx.models.ApprovedRepairsRequests,
				raw: true,
			},
		)

		return feed[0][0]
	},

	initiatedRepairsRequisition: async (_, { repairrequisitionId }, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."initiatedRepairsRequests" i join public."repairsRequisitions" a on i."repairrequisition_id" =a."repairrequisition_id" where i."repairrequisition_id" = ?',
			{
				replacements: [repairrequisitionId],
				model: ctx.models.InitiatedRepairsRequests,
				raw: true,
			},
		)
		return feed[0][0]
	},

	approvedRepairsRequisition: async (_, { repairrequisitionId }, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."approvedRepairsRequests"  i join public."repairsRequisitions" a on i."repairrequisition_id" =a."repairrequisition_id" where i."repairrequisition_id" = ?',
			{
				replacements: [repairrequisitionId],
				model: ctx.models.ApprovedRepairsRequests,
				raw: true,
			},
		)

		return feed[0][0]
	},
}

module.exports = { RepairsRequestQuery }

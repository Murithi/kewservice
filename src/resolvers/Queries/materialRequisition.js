const MaterialRequisitionQuery = {
	materialRequisitionFeed: async (_, args, { models }) =>
		await models.MaterialRequisition.findAll(),
	initiatedMaterialRequisitionsFeed: async (_, args, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."initiatedMaterialRequests"  i join public."materialRequisitions" a on i."materialrequisition_id" =a."materialrequisition_id" and a."approvalStatus" is not true and "transactionCompleted" is not true order by a."requestDate" asc',
			{
				model: ctx.models.InitiatedMaterialRequests,
				raw: true,
			},
		)
		return feed
	},
	approvedMaterialRequisitionsFeed: async (_, args, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."approvedMaterialRequests"  i join public."materialRequisitions" a on i."materialrequisition_id" =a."materialrequisition_id" and a."approvalStatus" is true and "issuedCash" is not true ',
			{
				model: ctx.models.ApprovedMaterialRequests,
				raw: true,
			},
		)
		return feed
	},
	issuedMaterialRequisitionsFeed: async (_, args, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."approvedMaterialRequests"  i join public."materialRequisitions" a on i."materialrequisition_id" =a."materialrequisition_id" and "issuedCash"=true and "transactionCompleted" is not true order by "requestDate" asc',
			{
				model: ctx.models.ApprovedMaterialRequests,
				raw: true,
			},
		)
		return feed
	},
	issuedMaterialRequisition: async (_, { materialrequisitionId }, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."approvedMaterialRequests"  i join public."materialRequisitions" a on i."materialrequisition_id" =a."materialrequisition_id" and "issuedCash"=true and "transactionCompleted" is not true and a.materialrequisition_id= ?',
			{
				replacements: [materialrequisitionId],
				model: ctx.models.ApprovedMaterialRequests,
				raw: true,
			},
		)
		return feed[0]
	},
	initiatedMaterialRequisition: async (_, { materialrequisitionId }, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."initiatedMaterialRequests"  i join public."materialRequisitions" a on i."materialrequisition_id" =a."materialrequisition_id" where i."materialrequisition_id"=?',
			{
				replacements: [materialrequisitionId],
				model: ctx.models.InitiatedMaterialRequests,
				raw: true,
			},
		)
		return feed[0]
	},
	approvedMaterialRequisition: async (_, { materialrequisitionId }, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."approvedMaterialRequests"  i join public."materialRequisitions" a on i."materialrequisition_id" =a."materialrequisition_id" where i."materialrequisition_id"=?',
			{
				replacements: [materialrequisitionId],
				model: ctx.models.ApprovedMaterialRequests,
				raw: true,
			},
		)
		return feed[0]
	},
}

module.exports = { MaterialRequisitionQuery }

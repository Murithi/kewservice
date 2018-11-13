const FuelRequestQuery = {
	fuelRequestFeed: async (_, { args }, { models }) =>
		await models.FuelRequisition.findAll(),
	initiatedFuelRequisitionsFeed: async (_, args, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."initiatedFuelRequests"  i join public."fuelRequisitions" a on i."fuelRequisition_id" =a."fuelRequisition_id" and a."approvalStatus" is not true and "transactionCompleted" is not true order by a."requestDate" asc',
			{
				model: ctx.models.InitiatedFuelRequests,
				raw: true,
			},
		)
		return feed
	},
	approvedFuelRequisitionsFeed: async (_, args, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."approvedFuelRequests"  i join public."fuelRequisitions" a on i."fuelRequisition_id" =a."fuelRequisition_id" and "issuedCash"=false',
			{
				model: ctx.models.ApprovedFuelRequests,
				raw: true,
			},
		)
		return feed
	},
	issuedFuelRequisitionsFeed: async (_, args, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."approvedFuelRequests"  i join public."fuelRequisitions" a on i."fuelRequisition_id" =a."fuelRequisition_id" and "issuedCash"=true and "transactionCompleted" is not true',
			{
				model: ctx.models.ApprovedFuelRequests,
				raw: true,
			},
		)
		return feed
	},
	issuedFuelRequisition: async (_, { fuelRequisitionId }, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."approvedFuelRequests"  i join public."fuelRequisitions" a on i."fuelRequisition_id" =a."fuelRequisition_id" and "issuedCash"=true and "transactionCompleted"=false where i."fuelRequisition_id"= ?',
			{
				replacements: [fuelRequisitionId],
				model: ctx.models.ApprovedFuelRequests,
				raw: true,
			},
		)
		return feed[0]
	},
	initiatedFuelRequisition: async (_, { fuelRequisitionId }, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."initiatedFuelRequests"  i join public."fuelRequisitions" a on i."fuelRequisition_id" =a."fuelRequisition_id" where i."fuelRequisition_id"= ?',
			{
				replacements: [fuelRequisitionId],
				model: ctx.models.InitiatedFuelRequests,
				raw: true,
			},
		)
		return feed[0]
	},

	approvedFuelRequisition: async (_, { fuelRequisitionId }, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."approvedFuelRequests"  i join public."fuelRequisitions" a on i."fuelRequisition_id" =a."fuelRequisition_id" where i."fuelRequisition_id"= ? and "issuedCash"=false',
			{
				replacements: [fuelRequisitionId],
				model: ctx.models.ApprovedFuelRequests,
				raw: true,
			},
		)
		return feed[0]
	},
}

module.exports = { FuelRequestQuery }

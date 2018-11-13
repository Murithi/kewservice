const InspectionRequestQuery = {
	vehicleInspectionFeed: async (_, args, { models }) =>
		models.VehicleInspection.findAll(),
	initiatedVehicleInspectionsFeed: async (_, args, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."initiatedVehicleInspections"  i join public."vehicleInspections" a on i."vehicleinspection_id" =a."vehicleinspection_id" and a."approvalStatus" is not true  and "transactionCompleted" is not true order by a."requestDate" asc',
			{
				model: ctx.models.InitiatedVehicleInspection,
				raw: true,
			},
		)

		return feed
	},
	approvedVehicleInspectionsFeed: async (_, args, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."initiatedVehicleInspections"  i join public."vehicleInspections" a on i."vehicleinspection_id" =a."vehicleinspection_id" and a."approvalStatus" is true and a."issuedCash" is not true',
			{
				model: ctx.models.ApprovedVehicleInspection,
				raw: true,
			},
		)

		return feed
	},

	issuedVehicleInspectionsFeed: async (_, args, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."approvedVehicleInspections"  i join public."vehicleInspections" a on i."vehicleinspection_id" =a."vehicleinspection_id" and "issuedCash"=true  and "transactionCompleted" is not true',
			{
				model: ctx.models.ApprovedVehicleInspection,
				raw: true,
			},
		)

		return feed
	},
	issuedVehicleInspection: async (_, { vehicleinspectionId }, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."approvedVehicleInspections"  i join public."vehicleInspections" a on i."vehicleinspection_id" =a."vehicleinspection_id" where i."vehicleinspection_id" = ?',
			{
				replacements: [vehicleinspectionId],
				model: ctx.models.ApprovedVehicleInspection,
				raw: true,
			},
		)
		console.log(feed)
		return feed[0]
	},

	initiatedVehicleInspection: async (_, { vehicleinspectionId }, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."initiatedVehicleInspections" i join public."vehicleInspections" a on i."vehicleinspection_id" =a."vehicleinspection_id" and "issuedCash"=false and "transactionCompleted"=false where i."vehicleinspection_id" = ?',
			{
				replacements: [vehicleinspectionId],
				model: ctx.models.InitiatedVehicleInspection,
				raw: true,
			},
		)

		return feed[0]
	},

	approvedVehicleInspection: async (_, { vehicleinspectionId }, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."approvedVehicleInspections"  i join public."vehicleInspections" a on i."vehicleinspection_id" =a."vehicleinspection_id" where i."vehicleinspection_id" = ?',
			{
				replacements: [vehicleinspectionId],
				model: ctx.models.ApprovedVehicleInspection,
				raw: true,
			},
		)
		console.log(feed)
		return feed[0]
	},
}

module.exports = { InspectionRequestQuery }

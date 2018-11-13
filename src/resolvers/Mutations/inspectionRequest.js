const { getUserId } = require('../../utils/getUser')
const InspectionRequest = {
	addVehicleInspection: async (_, args, ctx) => {
		try {
			const userId = getUserId(ctx)
			const request = await ctx.models.VehicleInspection.create({
				...args,
				issuedCash: false,
				approvalStatus: false,
				cashIssued: false,
				transactionCompleted: false,
			})
			let vehicleinspectionId = request.vehicleinspection_id
			await ctx.models.InitiatedVehicleInspection.create({
				vehicleinspectionId,
				userId,
			})

			return true
		} catch (errors) {
			console.log(errors)
			return false
		}
	},
	approveVehicleInspection: async (
		_,
		{ vehicleinspectionId, approvalDate, approvalStatus },
		ctx,
	) => {
		try {
			const userId = getUserId(ctx)
			let transactionCompleted = true
			if (approvalStatus) transactionCompleted = false
			let vehicleinspection_id = vehicleinspectionId
			const request = await ctx.models.VehicleInspection.findOne({
				where: { vehicleinspection_id },
			})
			const approvedReq = await request.update({
				approvalDate,
				approvalStatus,
				transactionCompleted,
			})
			if (!transactionCompleted) {
				const approvedT = await ctx.models.ApprovedVehicleInspection.create({
					userId,
					vehicleinspectionId,
				})
			}
			return true
		} catch (errors) {
			console.log(errors)
			return false
		}
	},
	approveAllVehicleInspection: async (
		_,
		{ vehicleinspectionId, approvalDate },
		ctx,
	) => {
		try {
			const userId = getUserId(ctx)
			let approvalStatus = true

			const requests = await ctx.models.VehicleInspection.findAll({
				where: {
					approvalStatus: {
						$not: true,
					},
				},
			})

			requests.map(async request => {
				let vehicleinspection_id = vehicleinspectionId
				await request.update({ approvalDate, approvalStatus })
				await ctx.models.ApprovedVehicleInspection.create({
					userId,
					vehicleinspectionId,
				})
			})

			return true
		} catch (errors) {
			console.log(errors)
			return false
		}
	},
}

module.exports = { InspectionRequest }

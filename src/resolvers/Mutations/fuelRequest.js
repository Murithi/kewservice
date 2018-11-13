const { getUserId } = require('../../utils/getUser')

const FuelRequest = {
	addFuelRequisition: async (_, args, ctx) => {
		try {
			const userId = getUserId(ctx)
			const request = await ctx.models.FuelRequisition.create({
				...args,
				issuedCash: false,
				approvalStatus: false,
				cashIssued: false,
				transactionCompleted: false,
			})

			let fuelRequisitionId = request.fuelRequisition_id
			await ctx.models.InitiatedFuelRequests.create({
				fuelRequisitionId,
				userId,
			})
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
	approveFuelRequistion: async (_, args, ctx) => {
		try {
			console.log(args)
			const { approvalStatus, fuelRequisitionId, approvalDate } = args
			const userId = getUserId(ctx)
			let transactionCompleted = true
			if (approvalStatus) transactionCompleted = false
			let fuelRequisition_id = fuelRequisitionId
			const request = await ctx.models.FuelRequisition.findOne({
				where: { fuelRequisition_id },
			})
			const approvedReq = await request.update({
				approvalDate,
				approvalStatus,
				transactionCompleted,
			})
			if (!transactionCompleted) {
				const approvedT = await ctx.models.ApprovedFuelRequests.create({
					userId,
					fuelRequisitionId,
				})
			}

			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	approveAllFuelRequistion: async (_, { approvalDate }, ctx) => {
		try {
			const userId = getUserId(ctx)
			let approvalStatus = true

			const requests = await ctx.models.FuelRequisition.findAll({
				where: {
					approvalStatus: {
						$not: true,
					},
				},
			})

			requests.map(async request => {
				let fuelRequisitionId = request.fuelRequisition_id
				await request.update({ approvalDate, approvalStatus })
				await ctx.models.ApprovedFuelRequests.create({
					userId,
					fuelRequisitionId,
				})
			})

			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
	removeFuelRequest: async (_, { fuelRequisition_id }, ctx) => {
		try {
			await ctx.models.sequelize.query(
				'delete FROM public."fuelRequisitions" where public."fuelRequisitions"."fuelRequisition_id"=?',
				{
					replacements: [fuelRequisition_id],
					model: ctx.models.FuelRequisition,
					raw: true,
				},
			)

			await ctx.models.sequelize.query(
				'delete FROM public."initiatedFuelRequests" where public."initiatedFuelRequests"."fuelRequisition_id"=?',
				{
					replacements: [fuelRequisition_id],
					model: ctx.models.InitiatedFuelRequests,
					raw: true,
				},
			)
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
}

module.exports = { FuelRequest }

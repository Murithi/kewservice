const { getUserId } = require('../../utils/getUser')

const MaterialRequisition = {
	addMaterialRequisition: async (_, args, ctx) => {
		try {
			const userId = getUserId(ctx)
			console.log(args)
			const request = await ctx.models.MaterialRequisition.create(args)
			let materialrequisitionId = request.materialrequisition_id

			await ctx.models.InitiatedMaterialRequests.create({
				userId,
				materialrequisitionId,
			})
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
	approveMaterialRequisition: async (
		_,
		{ materialrequisitionId, approvalDate, approvalStatus },
		ctx,
	) => {
		try {
			const userId = getUserId(ctx)
			let transactionCompleted = true
			if (approvalStatus) transactionCompleted = false
			let materialrequisition_id = materialrequisitionId
			const request = await ctx.models.MaterialRequisition.findOne({
				where: { materialrequisition_id },
			})

			await request.update({
				approvalDate,
				approvalStatus,
				transactionCompleted,
			})
			if (!transactionCompleted) {
				const approvedT = await ctx.models.ApprovedMaterialRequests.create({
					userId,
					materialrequisitionId,
				})
			}
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	approveAllMaterialRequisition: async (_, { approvalDate }, ctx) => {
		try {
			const userId = getUserId(ctx)
			let approvalStatus = true

			const requests = await ctx.models.MaterialRequisition.findAll({
				where: {
					approvalStatus: {
						$not: true,
					},
				},
			})

			requests.map(async request => {
				let materialrequisitionId = request.materialrequisition_id
				console.log(materialrequisitionId)
				await request.update({ approvalDate, approvalStatus })
				await ctx.models.ApprovedMaterialRequests.create({
					userId,
					materialrequisitionId,
				})
			})

			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	removeMaterialRequest: async (_, { materialrequisition_id }, ctx) => {
		try {
			await ctx.models.sequelize.query(
				'delete FROM public."materialRequisitions" where public."materialRequisitions".materialrequisition_id=?',
				{
					replacements: [materialrequisition_id],
					model: ctx.models.MaterialRequisition,
					raw: true,
				},
			)

			await ctx.models.sequelize.query(
				'delete FROM public."initiatedMaterialRequests" where public."initiatedMaterialRequests".materialrequisition_id=?',
				{
					replacements: [materialrequisition_id],
					model: ctx.models.InitiatedMaterialRequests,
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

module.exports = { MaterialRequisition }

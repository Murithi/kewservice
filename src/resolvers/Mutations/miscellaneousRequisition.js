const { getUserId } = require('../../utils/getUser')
import moment from 'moment'
const uuidv4 = require('uuid/v4')
const MiscellaneousRequisition = {
	addMiscellaneousRequest: async (_, args, ctx) => {
		try {
			const user_id = getUserId(ctx)
			const request = await ctx.models.MiscellaneousRequisition.create({
				...args,
				issuedCash: false,
				approvalStatus: false,
				cashIssued: false,
				transactionCompleted: false,
			})

			let miscellaneousrequisition_id = request.miscellaneousrequisition_id

			let created_at = moment().format()
			let updated_at = moment().format()
			let id = uuidv4()
			// await ctx.models.InitiatedMiscellaneousRequest.create({user_id, miscellaneousrequisition_id })
			await ctx.models.sequelize.query(
				'INSERT INTO "initiatedMiscellaneousRequests" ("id","user_id","miscellaneousrequisition_id", created_at, updated_at) VALUES (?,?,?,?,?)',
				{
					replacements: [
						id,
						user_id,
						miscellaneousrequisition_id,
						created_at,
						updated_at,
					],
					model: ctx.models.InitiatedMiscellaneousRequest,
					raw: true,
				},
			)
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
	approveMiscellaneousRequest: async (
		_,
		{ miscellaneousrequisitionId, approvalDate, approvalStatus },
		ctx,
	) => {
		try {
			const user_id = getUserId(ctx)
			let transactionCompleted = true
			if (approvalStatus) transactionCompleted = false
			let miscellaneousrequisition_id = miscellaneousrequisitionId
			const request = await ctx.models.MiscellaneousRequisition.findOne({
				where: { miscellaneousrequisition_id },
			})
			await request.update({
				approvalDate,
				approvalStatus,
				transactionCompleted,
			})
			if (!transactionCompleted) {
				const approvedT = await ctx.models.ApprovedMiscellaneousRequest.create({
					user_id,
					miscellaneousrequisitionId,
				})
			}
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	approveAllMiscellaneousRequest: async (_, { approvalDate }, ctx) => {
		try {
			const user_id = getUserId(ctx)
			let approvalStatus = true

			const requests = await ctx.models.MiscellaneousRequisition.findAll({
				where: {
					approvalStatus: {
						$not: true,
					},
				},
			})

			requests.map(async request => {
				let miscellaneousrequisitionId = request.miscellaneousrequisition_id
				await request.update({ approvalDate, approvalStatus })
				await ctx.models.ApprovedMiscellaneousRequest.create({
					user_id,
					miscellaneousrequisitionId,
				})
			})

			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	removeMiscellaneousRequest: async (
		_,
		{ miscellaneousrequisition_id },
		ctx,
	) => {
		try {
			await ctx.models.sequelize.query(
				'delete FROM public."miscellaneousRequisitions" where public."miscellaneousRequisitions".miscellaneousrequisition_id=?',
				{
					replacements: [miscellaneousrequisition_id],
					model: ctx.models.MiscellaneousRequisition,
					raw: true,
				},
			)

			await ctx.models.sequelize.query(
				'delete FROM public."initiatedMiscellaneousRequests" where public."initiatedMiscellaneousRequests".miscellaneousrequisition_id=?',
				{
					replacements: [miscellaneousrequisition_id],
					model: ctx.models.InitiatedMiscellaneousRequest,
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
module.exports = { MiscellaneousRequisition }

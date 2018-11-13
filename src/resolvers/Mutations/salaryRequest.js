const { getUserId } = require('../../utils/getUser')

const SalaryRequest = {
	addSalaryRequest: async (_, args, ctx) => {
		try {
			const userId = getUserId(ctx)
			const request = await ctx.models.Salary.create(args)
			let salaryrequestId = request.salaryrequest_id
			await ctx.models.InitiatedSalaryRequests.create({
				salaryrequestId,
				userId,
			})
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	approveSalaryRequest: async (
		_,
		{ approvalStatus, salaryrequestId, approvalDate },
		ctx,
	) => {
		try {
			const userId = getUserId(ctx)
			let transactionCompleted = true
			if (approvalStatus) transactionCompleted = false
			let salaryrequest_id = salaryrequestId
			const request = await ctx.models.Salary.findOne({
				where: { salaryrequest_id },
			})
			const approvedReq = await request.update({
				approvalStatus,
				approvalDate,
				transactionCompleted,
			})
			if (!transactionCompleted) {
				const approvedT = await ctx.models.ApprovedSalaryRequests.create({
					userId,
					salaryrequestId,
				})
			}

			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
	approveAllSalaryRequest: async (_, { approvalDate }, ctx) => {
		try {
			const userId = getUserId(ctx)
			let approvalStatus = true

			const requests = await ctx.models.Salary.findAll({
				where: {
					approvalStatus: {
						$not: true,
					},
				},
			})

			requests.map(async request => {
				let salaryrequestId = request.salaryrequest_id
				await request.update({ approvalDate, approvalStatus })
				await ctx.models.ApprovedSalaryRequests.create({
					userId,
					salaryrequestId,
				})
			})

			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	deleteSalaryRequest: async (_, { id }, ctx) => {
		try {
			let salaryrequest_id = id

			await ctx.models.sequelize.query(
				'delete FROM public."salaryRequests" where public."salaryRequests".salaryrequest_id=?',
				{
					replacements: [salaryrequest_id],
					model: ctx.models.Salary,
					raw: true,
				},
			)

			await ctx.models.sequelize.query(
				'delete FROM public."initiatedSalaryRequests" where public."initiatedSalaryRequests".salaryrequest_id=?',
				{
					replacements: [salaryrequest_id],
					model: ctx.models.InitiatedSalaryRequests,
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

module.exports = { SalaryRequest }

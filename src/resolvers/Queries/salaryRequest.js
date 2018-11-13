const SalaryRequestQuery = {
	salaryRequestFeed: async (_, args, { models }) =>
		await models.Salary.findAll(),
	initiatedSalaryRequestFeed: async (_, args, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."initiatedSalaryRequests" i join public."salaryRequests" a on i."salaryrequest_id" =a."salaryrequest_id" and a."approvalStatus" is not true and "transactionCompleted" is not true order by a."requestDate" asc',
			{
				model: ctx.models.initiatedSalaryRequests,
				raw: true,
			},
		)
		return feed[0]
	},
	approvedSalaryRequestFeed: async (_, args, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."approvedSalaryRequests" i join public."salaryRequests"a on i."salaryrequest_id" =a."salaryrequest_id" and a."issuedCash" is not true',
			{
				model: ctx.models.ApprovedSalaryRequests,
				raw: true,
			},
		)
		return feed
	},
	issuedSalaryRequestFeed: async (_, args, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."approvedSalaryRequests" i join public."salaryRequests"a on i."salaryrequest_id" =a."salaryrequest_id" and a."issuedCash" = true order by a."requestDate" DESC',
			{
				model: ctx.models.ApprovedSalaryRequests,
				raw: true,
			},
		)
		return feed
	},

	initiatedSalaryRequest: async (_, { salaryrequestId }, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."initiatedSalaryRequests" i join public."salaryRequests" a on i."salaryrequest_id" =a."salaryrequest_id" where i."salaryrequest_id" = ?',
			{
				replacements: [salaryrequestId],
				model: ctx.models.initiatedSalaryRequests,
				raw: true,
			},
		)
		return feed[0][0]
	},

	approvedSalaryRequest: async (_, { salaryrequestId }, ctx) => {
		const feed = await ctx.models.sequelize.query(
			'SELECT *  FROM public."approvedSalaryRequests" i join public."salaryRequests"a on i."salaryrequest_id" =a."salaryrequest_id" where i."salaryrequest_id" = ?',
			{
				replacements: [salaryrequestId],
				model: ctx.models.approvedSalaryRequests,
				raw: true,
			},
		)
		console.log(feed)
		return feed[0][0]
	},
}

module.exports = { SalaryRequestQuery }

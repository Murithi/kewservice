import moment from 'moment'
const PaymentIssueQuery = {
	paymentIssueFeed: async (_, args, { models }) => {
		if (!args) {
			const { paymentType } = args
			return await models.PaymentIssue.findAll({ where: { paymentType } })
		}
		return await models.PaymentIssue.findAll()
	},
	paymentsIssuedFeed: async (_, args, { Op, models }) => {
		if (!args) {
			const { paymentType } = args
			return await models.PaymentIssue.findAll({
				where: ['paymentType = ? AND amountIssued IS NOT NULL', paymentType],
			})
		}
		return await models.PaymentIssue.findAll({
			where: {
				amountIssued: {
					[Op.ne]: null,
				},
			},
		})
	},

	paymentIssuedSumByType: async (_, args, { Op, models }) => {
		const { paymentType, startDate, endDate } = args
		if (
			paymentType === 'ADVANCEREQUESTS' ||
			paymentType === 'SALARYREQUESTS' ||
			paymentType === 'OVERTIMEREQUESTS'
		) {
			const sumtotal = await models.PaymentIssue.sum('amountIssued', {
				where: {
					dateIssued: {
						[Op.between]: [startDate, endDate],
					},
					paymentType,
				},
			})
			return sumtotal
		}
		const total = await models.PaymentIssue.sum('amountCharged', {
			where: {
				dateIssued: {
					[Op.between]: [startDate, endDate],
				},
				paymentType,
			},
		})

		return total
	},

	paymentIssueSumByTypeGrouped: async (_, args, ctx) => {
		const { Op, models } = ctx
		const { paymentType, startDate, endDate } = args

		const expiration = new Date(startDate)
		const now = new Date(endDate)
		const diffDuration = parseInt(now - expiration) / (1000 * 60 * 60 * 24)

		// const totalsFeed = await models.PaymentIssue.findAll({

		//         where:{
		//             dateIssued:{
		//                 [Op.between]: [startDate, endDate]
		//             },
		//             paymentType
		//         },
		//         attributes: [
		//             [ models.sequelize.fn('date_trunc', 'month', models.sequelize.col('dateIssued')), 'month'],
		//             [ models.sequelize.fn('sum', models.sequelize.col('amountCharged')), 'amount']
		//           ],
		//         group: 'month'

		//     })
		if (
			paymentType === 'ADVANCEREQUESTS' ||
			paymentType === 'SALARYREQUESTS' ||
			paymentType === 'OVERTIMEREQUESTS'
		) {
			const totalsFeed = await ctx.models.sequelize.query(
				' SELECT date_trunc(?, "dateIssued") AS "month", sum("amountIssued") AS "amount" FROM "paymentIssues" AS "paymentIssue" WHERE "paymentIssue"."dateIssued" BETWEEN ? AND ? AND "paymentIssue"."paymentType" = ? GROUP BY "month"',
				{
					replacements: ['month', startDate, endDate, paymentType],
					model: ctx.models.PaymentIssue,
					raw: true,
				},
			)
			return totalsFeed
		} else {
			const totalsFeed = await ctx.models.sequelize.query(
				' SELECT date_trunc(?, "dateIssued") AS "month", sum("amountCharged") AS "amount" FROM "paymentIssues" AS "paymentIssue" WHERE "paymentIssue"."dateIssued" BETWEEN ? AND ? AND "paymentIssue"."paymentType" = ? GROUP BY "month"',
				{
					replacements: ['month', startDate, endDate, paymentType],
					model: ctx.models.PaymentIssue,
					raw: true,
				},
			)
			return totalsFeed
		}
	},

	paymentIssue: async (_, { paymentIssue_id }, { models }) =>
		models.PaymentIssue.findOne({ where: { paymentIssue_id } }),
}
module.exports = { PaymentIssueQuery }

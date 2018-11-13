import moment from 'moment'
import _ from 'lodash'
import { isLeafType } from 'graphql'
const { getUserId } = require('../../utils/getUser')

const StoreTransactionQuery = {
	storageFeed: async (_, args, ctx) => {
		// if(args==={})  return await ctx.models.StoreTransaction.findAll({})

		const { Op } = ctx
		let { startDate, endDate, projectId, transactionType } = args
		if (!startDate)
			startDate = moment()
				.subtract(6, 'months')
				.format('MMM DD YYYY')
		if (!endDate)
			endDate = moment()
				.add(1, 'days')
				.format('MMM DD YYYY')
		if (!transactionType) transactionType = 'ISSUES'
		if (!projectId) {
			return await ctx.models.StoreTransaction.findAll({
				where: {
					transactionDate: {
						[Op.between]: [startDate, endDate],
					},
					transactionType,
				},
				order: ctx.models.sequelize.col('transactionDate'),
			})
		} else {
			return await ctx.models.StoreTransaction.findAll({
				where: {
					transactionDate: {
						[Op.between]: [startDate, endDate],
					},
					projectId,
					transactionType,
				},
				order: ctx.models.sequelize.col('transactionDate'),
			})
		}
	},
	storageTransaction: async (_, { id }, { models }) =>
		await models.StoreTransaction.findOne({ where: { id } }),
}

module.exports = { StoreTransactionQuery }

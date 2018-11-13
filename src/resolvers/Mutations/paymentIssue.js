const { getUserId } = require('../../utils/getUser')
const PaymentIssue = {
	addCashReceipt: async (_, args, ctx, info) => {
		try {
			const userId = getUserId(ctx)
			const { cashbalId, balbefore, amountRecieved, accountchargedId } = args
			let accountNameId = accountchargedId
			let balance = balbefore + amountRecieved
			const Request = await ctx.models.PaymentIssue.create({
				...args,
				userId,
				cashReported: false,
				paymentType: 'CASH INCOMING',
				cashBalanceBefore: balbefore,
				cashBalanceAfter: balance,
				accountNameId,
			})

			let id = cashbalId
			const cbal = await ctx.models.CashBalance.findOne({ where: { id } })
			cbal.update({ balance })
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	addPaymentIssue: async (_, args, ctx, info) => {
		try {
			const userId = getUserId(ctx)
			const {
				cashbalId,
				balbefore,
				amountIssued,
				accountchargedId,
				paymentType,
				requestId,
			} = args
			let accountNameId = accountchargedId
			let balance = balbefore - amountIssued
			let cashIssued = true
			const Request = await ctx.models.PaymentIssue.create({
				...args,
				userId,
				cashReported: false,
				paymentType,
				cashBalanceBefore: balbefore,
				cashBalanceAfter: balance,
				accountNameId,
				amountIssued,
				cashIssued,
			})
			var paymentIssueId = Request.paymentIssue_id
			let id = cashbalId
			const cbal = await ctx.models.CashBalance.findOne({ where: { id } })
			cbal.update({ balance })
			let issuedCash = true

			switch (paymentType) {
				case 'SERVICEREQUESTS':
					let requestservice_id = requestId
					const req = await ctx.models.RequestService.findOne({
						where: { requestservice_id },
					})
					await req.update({ paymentIssueId, issuedCash })
					break

				case 'REPAIRSREQUESTS':
					let repairrequisition_id = requestId
					const rep = await await ctx.models.RepairsRequisition.findOne({
						where: { repairrequisition_id },
					})
					await rep.update({ paymentIssueId, issuedCash })
					break
				case 'INSPECTIONREQUESTS':
					let vehicleinspection_id = requestId
					let paymentIssue_id = paymentIssueId
					const insp = await ctx.models.VehicleInspection.findOne({
						where: { vehicleinspection_id },
					})
					await insp.update({ paymentIssueId, issuedCash })
					console.log(insp)
					break

				case 'FUELREQUESTS':
					let fuelRequisition_id = requestId
					const fuel = await ctx.models.FuelRequisition.findOne({
						where: { fuelRequisition_id },
					})
					await fuel.update({ paymentIssueId, issuedCash })
					break

				case 'MISCELLANEOUSREQUESTS':
					let miscellaneousrequisition_id = requestId
					const misc = await ctx.models.MiscellaneousRequisition.findOne({
						where: { miscellaneousrequisition_id },
					})
					await misc.update({ paymentIssueId, issuedCash })

				case 'MATERIALREQUESTS':
					let materialrequisition_id = requestId
					const mat = await ctx.models.MaterialRequisition.findOne({
						where: { materialrequisition_id },
					})
					await mat.update({ paymentIssueId, issuedCash })
					break

				case 'ADVANCEREQUESTS':
					let advanceRequest_id = requestId
					const adv = await ctx.models.AdvanceRequest.findOne({
						where: { advanceRequest_id },
					})
					await adv.update({ paymentIssueId, issuedCash })
					break

				case 'SALARYREQUESTS':
					let salaryrequest_id = requestId
					const sal = await ctx.models.Salary.findOne({
						where: { salaryrequest_id },
					})
					await sal.update({ paymentIssueId, issuedCash })
					break

				case 'OVERTIMEREQUESTS':
					let overtimerequest_id = requestId
					const overTime = await ctx.models.OverTimeRequest.findOne({
						where: { overtimerequest_id },
					})
					await overTime.update({ paymentIssueId, issuedCash })
					break

				default:
					return true
			}
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	removePaymentIssue: async (_, args, ctx, info) => {
		try {
			const { paymentIssue_id, cashbalId } = args

			const Request = await ctx.models.PaymentIssue.findOne({
				where: { paymentIssue_id },
			})
			const amountIssued = Request.amountIssued
			console.log

			Request.destroy()
			let id = cashbalId
			const cbal = await ctx.models.CashBalance.findOne({ where: { id } })
			const prevBal = cbal.balance
			const balance = prevBal + amountIssued
			cbal.update({ balance })

			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
	reportPayment: async (
		_,
		{ paymentIssue_id, requestId, ...otherargs },
		ctx,
		info,
	) => {
		try {
			const userId = getUserId(ctx)
			let cashReported = true
			const Request = await ctx.models.PaymentIssue.findOne({
				where: { paymentIssue_id },
			})
			const RqstComplete = await Request.update({ ...otherargs, cashReported })

			let paymentType = RqstComplete.paymentType
			let transactionCompleted = true
			switch (paymentType) {
				case 'SERVICEREQUESTS':
					let requestservice_id = requestId
					const req = await ctx.models.RequestService.findOne({
						where: { requestservice_id },
					})
					await req.update({ transactionCompleted })
					break

				case 'REPAIRSREQUESTS':
					let repairrequisition_id = requestId
					const rep = await await ctx.models.RepairsRequisition.findOne({
						where: { repairrequisition_id },
					})
					await rep.update({ transactionCompleted })
					break
				case 'INSPECTIONREQUESTS':
					let vehicleinspection_id = requestId
					const insp = await ctx.models.VehicleInspection.findOne({
						where: { vehicleinspection_id },
					})
					await insp.update({ transactionCompleted })
					break

				case 'FUELREQUESTS':
					let fuelRequisition_id = requestId
					const fuel = await ctx.models.FuelRequisition.findOne({
						where: { fuelRequisition_id },
					})
					await fuel.update({ transactionCompleted })
					break

				case 'MISCELLANEOUSREQUESTS':
					let miscellaneousrequisition_id = requestId
					const misc = await ctx.models.MiscellaneousRequisition.findOne({
						where: { miscellaneousrequisition_id },
					})

					await misc.update({ transactionCompleted })

				case 'MATERIALREQUESTS':
					let materialrequisition_id = requestId
					const mat = await ctx.models.MaterialRequisition.findOne({
						where: { materialrequisition_id },
					})
					await mat.update({ transactionCompleted })
					break
				case 'ADVANCEREQUESTS':
					let advanceRequest_id = requestId
					const adv = await ctx.models.AdvanceRequest.findOne({
						where: { advanceRequest_id },
					})
					await adv.update({ transactionCompleted })
					break

				case 'SALARYREQUESTS':
					let salaryrequest_id = requestId
					const sal = await ctx.models.Salary.findOne({
						where: { salaryrequest_id },
					})
					await sal.update({ transactionCompleted })
					break

				case 'OVERTIMEREQUESTS':
					let overtimerequest_id = requestId
					const overTime = await ctx.models.OverTimeRequest.findOne({
						where: { overtimerequest_id },
					})
					await overTime.update({ transactionCompleted })
					break

				default:
					return true
			}

			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
}
module.exports = { PaymentIssue }

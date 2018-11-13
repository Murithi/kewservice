import moment from 'moment'
const { hi } = require('./hi')
const { UserQuery } = require('./Queries/user')
const { RoleQuery } = require('./Queries/role')
const { ProjectQuery } = require('./Queries/project')
const { SectionQuery } = require('./Queries/section')
const { PersonnelQuery } = require('./Queries/personnel')
const { AdvanceRequestQuery } = require('./Queries/advanceRequest')
const { SalaryRequestQuery } = require('./Queries/salaryRequest')
const { VehicleOwnerQuery } = require('./Queries/vehicleOwner')
const { VehicleQuery } = require('./Queries/vehicle')
const { VehicleAssigmentQuery } = require('./Queries/vehicleAssignment') //****REVISIT */
const { RequestServiceQuery } = require('./Queries/requestService')
const { RepairsRequestQuery } = require('./Queries/repairsRequest')
const { InspectionRequestQuery } = require('./Queries/inspectionRequest')
const { FuelRequestQuery } = require('./Queries/fuelRequest')
const { AccountNameQuery } = require('./Queries/accountName')
const { CashBalanceQuery } = require('./Queries/cashBalance')
const { MaterialsCostingQuery } = require('./Queries/materialsCosting')
const { StoreBalanceQuery } = require('./Queries/storeBalance')
const { SupplierQuery } = require('./Queries/supplier')
const { MaterialRequisitionQuery } = require('./Queries/materialRequisition')
const {
	MiscellaneousRequisitionQuery,
} = require('./Queries/miscellaneousRequisition')
const { PaymentIssueQuery } = require('./Queries/paymentIssue')
const { StoreTransactionQuery } = require('./Queries/storeTransaction')
const {
	PersonnelAttendanceRollQuery,
} = require('./Queries/personnelAttendanceRoll')
const { OverTimeRequestQuery } = require('./Queries/overTime')

const { User } = require('./Mutations/user')
const { Role } = require('./Mutations/role')
const { Personnel } = require('./Mutations/personnel')
const { Project } = require('./Mutations/project')
const { Section } = require('./Mutations/section')
const { AdvanceRequest } = require('./Mutations/advanceRequest')
const { SalaryRequest } = require('./Mutations/salaryRequest')
const { VehicleOwner } = require('./Mutations/vehicleOwner')
const { Vehicle } = require('./Mutations/vehicle')
const { VehicleAssigment } = require('./Mutations/vehicleAssignment')
const { RequestService } = require('./Mutations/requestService')
const { RepairsRequest } = require('./Mutations/RepairsRequest')
const { InspectionRequest } = require('./Mutations/inspectionRequest')
const { FuelRequest } = require('./Mutations/fuelRequest')
const { AccountName } = require('./Mutations/accountName')
const { CashBalance } = require('./Mutations/cashBalance')
const { MaterialCosting } = require('./Mutations/materialCosting')
const { StoreBalance } = require('./Mutations/storeBalance')
const { Supplier } = require('./Mutations/supplier')
const { MaterialRequisition } = require('./Mutations/materialRequisition')
const {
	MiscellaneousRequisition,
} = require('./Mutations/miscellaneousRequisition')
const { PaymentIssue } = require('./Mutations/paymentIssue')
const { StoreTransaction } = require('./Mutations/storeTransaction')
const {
	PersonnelAttendanceRoll,
} = require('./Mutations/personnelAttendanceRoll')
const { OverTimeRequest } = require('./Mutations/overTime')

module.exports = {
	Query: {
		...UserQuery,
		...RoleQuery,
		...ProjectQuery,
		...SectionQuery,
		...PersonnelQuery,
		...AdvanceRequestQuery,
		...SalaryRequestQuery,
		...VehicleOwnerQuery,
		...VehicleQuery,
		...VehicleAssigmentQuery,
		...RequestServiceQuery,
		...RepairsRequestQuery,
		...InspectionRequestQuery,
		...FuelRequestQuery,
		...AccountNameQuery,
		...CashBalanceQuery,
		...MaterialsCostingQuery,
		...StoreBalanceQuery,
		...SupplierQuery,
		...MaterialRequisitionQuery,
		...MiscellaneousRequisitionQuery,
		...PaymentIssueQuery,
		...StoreTransactionQuery,
		...PersonnelAttendanceRollQuery,
		...OverTimeRequestQuery,
	},
	Mutation: {
		...User,
		...Role,
		...Personnel,
		...Project,
		...Section,
		...AdvanceRequest,
		...SalaryRequest,
		...VehicleOwner,
		...Vehicle,
		...VehicleAssigment,
		...RequestService,
		...RepairsRequest,
		...InspectionRequest,
		...FuelRequest,
		...AccountName,
		...CashBalance,
		...MaterialCosting,
		...StoreBalance,
		...Supplier,
		...MaterialRequisition,
		...MiscellaneousRequisition,
		...PaymentIssue,
		...StoreTransaction,
		...PersonnelAttendanceRoll,
		...OverTimeRequest,
	},

	User: {
		id(user) {
			return user.id + ''
		},

		role(user) {
			return user.userRole
		},
		personnelDetails: async (user, _, ctx) => {
			let id = user.personnelId
			return await ctx.models.Personnel.findOne({ where: { id } })
		},
	},

	Role: {
		createdAt(role) {
			return role.created_at + ''
		},
		updatedAt(role) {
			return role.updated_at + ''
		},
		personnels: async (role, _, ctx) => {
			return await ctx.models.Personnel.findAll({
				where: { role_id: role.id },
			})
		},
	},

	VehicleOwner: {
		id(vehicle) {
			return vehicle.id + ''
		},
		createdAt(vehicle) {
			return vehicle.created_at + ''
		},
		updatedAt(vehicle) {
			return vehicle.updated_at + ''
		},
	},
	Project: {
		id(project) {
			return project.id + ''
		},
		createdAt(project) {
			return project.created_at + ''
		},
		updatedAt(project) {
			return project.updated_at + ''
		},
		sections: async (project, _, ctx) => {
			return await ctx.models.Section.findAll({
				where: { project_id: project.id },
			})
		},
	},

	Section: {
		createdAt(section) {
			return section.created_at + ''
		},
		updatedAt(section) {
			return section.updated_at + ''
		},
		id(section) {
			return section.section_id + ''
		},
		sectionProject: async (section, _, ctx) => {
			let id = section.projectId
			return await ctx.models.Project.findOne({ where: { id } })
		},
	},
	Personnel: {
		createdAt(personnel) {
			return personnel.created_at + ''
		},
		updatedAt(personnel) {
			return personnel.updated_at + ''
		},
		designation: async (personnel, _, ctx) => {
			let id = personnel.roleId
			return await ctx.models.Role.findOne({ where: { id } })
		},
		projectAssignedTo: async (personnel, _, ctx) => {
			let id = personnel.projectId

			return await ctx.models.Project.findOne({ where: { id } })
		},
		sectionsAssigned: async (personnel, _, ctx) => {
			const sections = ctx.models.sequelize.query(
				'select * from sections s join public."personnelSectionAssignments" p on (s.section_id =p.section_id ) where p.personnel_id= ?',
				{
					replacements: [personnel.id],
					model: ctx.models.Section,
					raw: true,
				},
			)

			return sections
		},

		advancesRecieved: async (personnel, { startDate, endDate }, ctx, info) => {
			let personnelId = personnel.id
			const { Op } = ctx

			if (startDate && endDate) {
				return await ctx.models.AdvanceRequest.findAll({
					where: {
						requestDate: {
							[Op.between]: [startDate, endDate],
						},
						personnelId,
					},
					order: ctx.models.sequelize.col('requestDate'),
				})
			} else {
				return await ctx.models.AdvanceRequest.findAll({
					where: {
						personnelId,
					},
					order: ctx.models.sequelize.col('requestDate'),
				})
			}
		},

		salariesRecieved: async (personnel, { startDate, endDate }, ctx, info) => {
			const { Op } = ctx
			let personnelId = personnel.id

			// console.log(info.fieldNodes[0].arguments[0].value.name)
			if (startDate && endDate) {
				const sals = await ctx.models.Salary.findAll({
					where: {
						requestDate: {
							[Op.between]: [startDate, endDate],
						},
						personnelId,
					},
					order: ctx.models.sequelize.col('requestDate'),
				})

				return sals
			} else {
				return await ctx.models.Salary.findAll({
					where: {
						personnelId,
					},
					order: ctx.models.sequelize.col('requestDate'),
				})
			}
		},
	},
	PersonnelAttendance: {
		createdAt(person) {
			return person.created_at + ''
		},
		updatedAt(person) {
			return person.updated_at + ''
		},
		id(person) {
			return person.id + ''
		},
		employee: async (person, _, ctx) => {
			const user = await ctx.models.sequelize.query(
				'select * from public.personnels where id= ?',
				{
					replacements: [person.personnelId],
					model: ctx.models.User,
					raw: true,
				},
			)

			return user[0]
		},
	},
	AdvanceRequest: {
		createdAt(advance) {
			return advance.created_at + ''
		},
		updatedAt(advance) {
			return advance.updated_at + ''
		},
		id(advance) {
			return advance.advanceRequest_id + ''
		},
		approvalStatus(advance) {
			if (advance.approvalStatus === null) return false
			return advance.approvalStatus
		},
		payee: async (advance, _, ctx) => {
			let id = advance.personnelId
			if (!id) id = advance.personnel_id

			const paid = await ctx.models.Personnel.findOne({ where: { id } })

			return paid
		},

		cashIssueDetails: async (advance, _, ctx) => {
			let paymentIssue_id = advance.paymentIssueId
			if (!paymentIssue_id) paymentIssue_id = advance.paymentIssue_id
			return await ctx.models.PaymentIssue.findOne({
				where: { paymentIssue_id },
			})
		},

		requestedBy: async (advance, _, ctx) => {
			const user = await ctx.models.sequelize.query(
				'select * from public.users s join public."initiatedAdvanceRequests" p on s.id = p.user_id where p."advanceRequest_id"= ?',
				{
					replacements: [advance.advanceRequest_id],
					model: ctx.models.User,
					raw: true,
				},
			)

			return user[0]
		},
		requestedBy: async (request, _, ctx) => {
			let advanceRequest_id = request.advanceRequest_id

			let tran = await ctx.models.InitiatedAdvanceRequests.findOne({
				where: { advanceRequest_id },
			})

			if (tran === null) {
				return null
			} else {
				let id = tran.user_id

				return await ctx.models.User.findOne({ where: { id } })
			}
		},

		requestApprovedBy: async (request, _, ctx) => {
			let advanceRequest_id = request.advanceRequest_id
			let tran = await ctx.models.ApprovedAdvanceRequests.findOne({
				where: { advanceRequest_id },
			})

			if (tran === null) {
				return null
			} else {
				let id = tran.user_id
				return await ctx.models.User.findOne({ where: { id } })
			}
		},
		requestApprovedBy: async (advance, _, ctx) => {
			const user = await ctx.models.sequelize.query(
				'select * from public.users s join public."approvedAdvanceRequests" p on s.id = p.user_id where p."advanceRequest_id"= ?',
				{
					replacements: [advance.advanceRequest_id],
					model: ctx.models.User,
					raw: true,
				},
			)

			return user[0]
		},
	},
	OverTimeRequest: {
		createdAt(request) {
			return request.created_at + ''
		},
		updatedAt(request) {
			return request.updated_at + ''
		},
		id(request) {
			return request.overtimerequest_id + ''
		},
		issuedCash(request) {
			if (!request.issuedCash) return false
			return request.issuedCash
		},
		approvalStatus(request) {
			if (request.approvalStatus === null) return false
			return request.approvalStatus
		},
		payee: async (request, _, ctx) => {
			let id = request.personnelId
			if (!id) id = request.personnel_id
			return await ctx.models.Personnel.findOne({ where: { id } })
		},
		cashIssueDetails: async (request, _, ctx) => {
			let paymentIssue_id = request.paymentIssueId
			if (!paymentIssue_id) paymentIssue_id = request.paymentIssue_id

			return await ctx.models.PaymentIssue.findOne({
				where: { paymentIssue_id },
			})
		},
		requestedBy: async (request, _, ctx) => {
			let overtimerequest_id = request.overtimerequest_id

			let tran = await ctx.models.InitiatedOverTimeRequests.findOne({
				where: { overtimerequest_id },
			})
			if (tran === null) {
				return null
			} else {
				let id = tran.userId

				return await ctx.models.User.findOne({ where: { id } })
			}
		},
		requestApprovedBy: async (request, _, ctx) => {
			let overtimerequest_id = request.overtimerequest_id
			let tran = await ctx.models.ApprovedOverTimeRequests.findOne({
				where: { overtimerequest_id },
			})

			if (tran === null) {
				return null
			} else {
				let id = tran.userId

				return await ctx.models.User.findOne({ where: { id } })
			}
		},
	},
	SalaryRequest: {
		createdAt(salary) {
			return salary.created_at + ''
		},
		updatedAt(salary) {
			return salary.updated_at + ''
		},
		id(salary) {
			return salary.salaryrequest_id + ''
		},
		issuedCash(salary) {
			if (!salary.issuedCash) return false
			return salary.issuedCash
		},
		approvalStatus(salary) {
			if (salary.approvalStatus === null) return false
			return salary.approvalStatus
		},
		payee: async (salary, _, ctx) => {
			let id = salary.personnelId
			if (!id) id = salary.personnel_id
			return await ctx.models.Personnel.findOne({ where: { id } })
		},

		cashIssueDetails: async (salary, _, ctx) => {
			let paymentIssue_id = salary.paymentIssueId
			if (!paymentIssue_id) paymentIssue_id = salary.paymentIssue_id

			return await ctx.models.PaymentIssue.findOne({
				where: { paymentIssue_id },
			})
		},
		requestedBy: async (salary, _, ctx) => {
			let salaryrequest_id = salary.salaryrequest_id

			let tran = await ctx.models.InitiatedSalaryRequests.findOne({
				where: { salaryrequest_id },
			})
			if (tran === null) {
				return null
			} else {
				let id = tran.userId

				return await ctx.models.User.findOne({ where: { id } })
			}
		},
		requestApprovedBy: async (salary, _, ctx) => {
			let salaryrequest_id = salary.salaryrequest_id
			let tran = await ctx.models.ApprovedSalaryRequests.findOne({
				where: { salaryrequest_id },
			})

			if (tran === null) {
				return null
			} else {
				let id = tran.userId

				return await ctx.models.User.findOne({ where: { id } })
			}
		},
	},

	Vehicle: {
		createdAt(vehicle) {
			return vehicle.created_at + ''
		},
		updatedAt(vehicle) {
			return vehicle.updated_at + ''
		},
		id(vehicle) {
			return vehicle.id + ''
		},
		assigned(vehicle, _, ctx) {
			if (vehicle.assigned === null) return false
			return vehicle.assigned
		},
		owner(vehicle, _, ctx) {
			let id = vehicle.vehicleOwnerId
			return ctx.models.VehicleOwner.findOne({ where: { id } })
		},
		assignee: async (vehicle, _, ctx) => {
			let vehicleId = vehicle.id

			const assignment = await ctx.models.VehicleAssignment.findOne({
				where: { vehicleId },
			})
			let id = assignment.personnelId
			const person = await ctx.models.Personnel.findOne({ where: { id } })
			return person
		},

		dateAssigned: async (vehicle, _, ctx) => {
			let vehicleId = vehicle.id
			const assignment = await ctx.models.VehicleAssignment.findOne({
				where: { vehicleId },
			})
			return assignment.dateOfAssignment
		},

		service: async (vehicle, { startDate, endDate }, ctx) => {
			console.log(startDate)
			let vehicleId = vehicle.id
			const { Op } = ctx
			if (startDate && endDate) {
				return await ctx.models.RequestService.findAll({
					where: {
						requestDate: {
							[Op.between]: [startDate, endDate],
						},
						vehicleId,
					},
					order: ctx.models.sequelize.col('requestDate'),
				})
			} else {
				const services = await ctx.models.RequestService.findAll({
					where: { vehicleId },
				})
				return services
			}
		},

		repairs: async (vehicle, { startDate, endDate }, ctx) => {
			let vehicleId = vehicle.id
			const { Op } = ctx
			if (startDate && endDate) {
				return await ctx.models.RepairsRequisition.findAll({
					where: {
						requestDate: {
							[Op.between]: [startDate, endDate],
						},
						vehicleId,
					},
					order: ctx.models.sequelize.col('requestDate'),
				})
			} else {
				const repair = await ctx.models.RepairsRequisition.findAll({
					where: { vehicleId },
				})
				return repair
			}
		},
		inspection: async (vehicle, { startDate, endDate }, ctx) => {
			let vehicleId = vehicle.id
			const { Op } = ctx
			if (startDate && endDate) {
				return await ctx.models.VehicleInspection.findAll({
					where: {
						requestDate: {
							[Op.between]: [startDate, endDate],
						},
						vehicleId,
					},
					order: ctx.models.sequelize.col('requestDate'),
				})
			} else {
				const inspections = await ctx.models.VehicleInspection.findAll({
					where: { vehicleId },
				})
				return inspections
			}
		},

		fuelrequests: async (vehicle, { startDate, endDate }, ctx) => {
			let vehicleId = vehicle.id
			const { Op } = ctx
			if (startDate && endDate) {
				return await ctx.models.FuelRequisition.findAll({
					where: {
						requestDate: {
							[Op.between]: [startDate, endDate],
						},
						vehicleId,
					},
					order: ctx.models.sequelize.col('requestDate'),
				})
			} else {
				const fuels = await ctx.models.FuelRequisition.findAll({
					where: { vehicleId },
				})
				return fuels
			}
		},
	},

	VehicleAssignment: {
		createdAt(vehicle) {
			return vehicle.created_at + ''
		},
		updatedAt(vehicle) {
			return vehicle.updated_at + ''
		},
		id(vehicle) {
			return vehicle.id + ''
		},
		motorVehicle(vehicle, _, ctx) {
			let id = vehicle.vehicleId
			return ctx.models.Vehicle.findOne({ where: { id } })
		},

		assignee(vehicle, _, ctx) {
			let id = vehicle.personnelId
			return ctx.models.Personnel.findOne({ where: { id } })
		},
	},

	RequestService: {
		createdAt(request) {
			return request.created_at + ''
		},
		updatedAt(request) {
			return request.updated_at + ''
		},
		id(request) {
			return request.requestservice_id + ''
		},
		vehicleToBeServiced: async (request, _, ctx) => {
			let id = request.vehicle_id
			if (!id) id = request.vehicleId
			return ctx.models.Vehicle.findOne({ where: { id } })
		},
		requestedBy: async (request, _, ctx) => {
			let requestservice_id = request.requestservice_id

			let tran = await ctx.models.InitiatedRequestService.findOne({
				where: { requestservice_id },
			})
			if (tran === null) {
				return null
			} else {
				let id = tran.userId

				return await ctx.models.User.findOne({ where: { id } })
			}
		},

		requestApprovedBy: async (request, _, ctx) => {
			let requestservice_id = request.requestservice_id
			let tran = await ctx.models.ApprovedRequestService.findOne({
				where: { requestservice_id },
			})

			if (tran === null) {
				return null
			} else {
				let id = tran.userId
				return await ctx.models.User.findOne({ where: { id } })
			}
		},
		paymentsDetails: async (request, _, ctx) => {
			let paymentIssueId = request.paymentIssueId
			if (!paymentIssueId) paymentIssueId = request.paymentIssue_id
			return await ctx.models.PaymentIssue.findOne({
				where: { paymentIssue_id: paymentIssueId },
			})
		},
	},
	RepairsRequisition: {
		createdAt(repair) {
			return repair.created_at + ''
		},
		updatedAt(repair) {
			return repair.updated_at + ''
		},
		id(repair) {
			return repair.repairrequisition_id + ''
		},
		approvalStatus(repair) {
			if (!repair.approvalStatus) return false
			return repair.approvalStatus
		},
		vehicleToBeRepaired: async (repair, _, ctx) => {
			let id = repair.vehicle_id

			if (id === undefined) id = repair.vehicleId

			return await ctx.models.Vehicle.findOne({ where: { id } })
		},

		requestedBy: async (repair, _, ctx) => {
			let repairrequisition_id = repair.repairrequisition_id

			let tran = await ctx.models.InitiatedRepairsRequest.findOne({
				where: { repairrequisition_id },
			})
			if (tran === null) {
				return null
			} else {
				let id = tran.userId

				return await ctx.models.User.findOne({ where: { id } })
			}
		},

		requestApprovedBy: async (repair, _, ctx) => {
			let repairrequisition_id = repair.repairrequisition_id
			let tran = await ctx.models.ApprovedRepairsRequest.findOne({
				where: { repairrequisition_id },
			})

			if (tran === null) {
				return null
			} else {
				let id = tran.userId

				return await ctx.models.User.findOne({ where: { id } })
			}
		},

		paymentsDetails: async (request, _, ctx) => {
			let paymentIssueId = request.paymentIssueId
			if (!paymentIssueId) paymentIssueId = request.paymentIssue_id
			return await ctx.models.PaymentIssue.findOne({
				where: { paymentIssue_id: paymentIssueId },
			})
		},
	},

	VehicleInspection: {
		createdAt(inspection) {
			return inspection.created_at + ''
		},
		updatedAt(inspection) {
			return inspection.updated_at + ''
		},
		id(inspection) {
			return inspection.vehicleinspection_id + ''
		},
		approvalStatus(inspection) {
			if (!inspection.approvalStatus) return false
			return inspection.approvalStatus
		},

		vehicleToBeInspected: (inspection, _, ctx) => {
			let id = inspection.vehicle_id

			if (!id) id = inspection.vehicleId

			return ctx.models.Vehicle.findOne({ where: { id } })
		},

		requestedBy: async (request, _, ctx) => {
			let vehicleinspection_id = request.vehicleinspection_id

			let tran = await ctx.models.InitiatedVehicleInspection.findOne({
				where: { vehicleinspection_id },
			})
			if (tran === null) {
				return null
			} else {
				let id = tran.userId

				return await ctx.models.User.findOne({ where: { id } })
			}
		},

		requestApprovedBy: async (request, _, ctx) => {
			let vehicleinspection_id = request.vehicleinspection_id
			let tran = await ctx.models.ApprovedVehicleInspection.findOne({
				where: { vehicleinspection_id },
			})

			if (tran === null) {
				return null
			} else {
				let id = tran.userId
				return await ctx.models.User.findOne({ where: { id } })
			}
		},

		paymentsDetails: async (request, _, ctx) => {
			let paymentIssueId = request.paymentIssueId
			if (!paymentIssueId) paymentIssueId = request.paymentIssue_id

			return await ctx.models.PaymentIssue.findOne({
				where: { paymentIssue_id: paymentIssueId },
			})
		},
	},

	FuelRequisition: {
		createdAt(fuel) {
			return fuel.created_at + ''
		},
		updatedAt(fuel) {
			return fuel.updated_at + ''
		},
		id(fuel) {
			return fuel.fuelRequisition_id + ''
		},
		approvalStatus(fuel) {
			if (!fuel.approvalStatus) return false
			return fuel.approvalStatus
		},
		vehicleToBeFueled: (fuel, _, ctx) => {
			let id = fuel.vehicle_id

			if (!id) id = fuel.vehicleId

			return ctx.models.Vehicle.findOne({ where: { id } })
		},

		requestedBy: async (request, _, ctx) => {
			let fuelRequisition_id = request.fuelRequisition_id

			let tran = await ctx.models.InitiatedFuelRequests.findOne({
				where: { fuelRequisition_id },
			})
			if (tran === null) {
				return null
			} else {
				let id = tran.userId

				return await ctx.models.User.findOne({ where: { id } })
			}
		},

		requestApprovedBy: async (request, _, ctx) => {
			let fuelRequisition_id = request.fuelRequisition_id
			let tran = await ctx.models.ApprovedFuelRequests.findOne({
				where: { fuelRequisition_id },
			})

			if (tran === null) {
				return null
			} else {
				let id = tran.userId
				return await ctx.models.User.findOne({ where: { id } })
			}
		},

		paymentsDetails: async (request, _, ctx) => {
			let paymentIssueId = request.paymentIssueId
			if (!paymentIssueId) paymentIssueId = request.paymentIssue_id

			return await ctx.models.PaymentIssue.findOne({
				where: { paymentIssue_id: paymentIssueId },
			})
		},
	},

	AccountName: {
		createdAt(account) {
			return account.created_at + ''
		},
		updatedAt(account) {
			return account.updated_at + ''
		},
		id(account) {
			return account.id + ''
		},
		balance: async (account, _, ctx) => {
			let account_name_id = account.id
			const bal = await ctx.models.CashBalance.findOne({
				where: { account_name_id },
			})
			if (!bal) return 0
			return bal
		},
	},

	CashBalance: {
		createdAt(balance) {
			return balance.created_at + ''
		},
		updatedAt(balance) {
			return balance.updated_at + ''
		},
		id(balance) {
			return balance.id + ''
		},
		accountDetails: async (balance, _, ctx) => {
			let id = balance.account_name_id
			return await ctx.models.AccountName.findOne({ where: { id } })
		},
	},

	StoreBalance: {
		createdAt(balance) {
			return balance.created_at + ''
		},
		updatedAt(balance) {
			return balance.updated_at + ''
		},
		id(balance) {
			return balance.id + ''
		},
		item: async (balance, _, ctx) => {
			let id = balance.materialscostingId

			return await ctx.models.MaterialsCosting.findOne({ where: { id } })
		},
	},

	MaterialsCosting: {
		createdAt(material) {
			return material.created_at + ''
		},
		updatedAt(material) {
			return material.updated_at + ''
		},
		id(material) {
			return material.id + ''
		},
		balance: async (material, _, ctx) => {
			let materialscostingId = material.id
			// console.log(materialscostingId)
			const bal = await ctx.models.StoreBalance.findOne({
				where: { materialscostingId },
			})

			if (bal === null) {
				const newbal = await ctx.models.StoreBalance.create({
					balance: 0,
					materialscostingId,
				})
				return newbal
			}
			return bal
		},

		transactions: async (material, _, ctx) => {
			let materialsCostingId = material.id
			return await ctx.models.StoreTransaction.findAll({
				where: { materialsCostingId },
			})
		},
	},

	Supplier: {
		createdAt(supplier) {
			return supplier.created_at + ''
		},
		updatedAt(supplier) {
			return supplier.updated_at + ''
		},
		id(supplier) {
			return supplier.id + ''
		},
		material: async (supplier, _, ctx) => {
			let supplierId = supplier.id
			let supmem = await ctx.models.Supplier_member.findOne({
				where: { supplierId },
			})
			let id = supmem.materialscostingId
			return await ctx.models.MaterialsCosting.findOne({ where: { id } })
		},
	},

	MaterialRequisition: {
		createdAt(material) {
			return material.created_at + ''
		},
		updatedAt(material) {
			return material.updated_at + ''
		},
		id(material) {
			return material.materialrequisition_id + ''
		},
		approvalStatus(material) {
			if (!material.approvalStatus) return false
			return material.approvalStatus
		},
		issuedCash(material) {
			if (!material.issuedCash) return false
			return material.issuedCash
		},
		materialType: async (material, _, ctx) => {
			let id = material.materialscostingId
			if (!id) id = material.materialscosting_id
			return await ctx.models.MaterialsCosting.findOne({ where: { id } })
		},
		supplier: async (material, _, ctx) => {
			let id = material.supplierId
			if (!id) id = material.supplier_id
			return await ctx.models.Supplier.findOne({ where: { id } })
		},

		requestedBy: async (request, _, ctx) => {
			let materialrequisition_id = request.materialrequisition_id

			let tran = await ctx.models.InitiatedMaterialRequests.findOne({
				where: { materialrequisition_id },
			})
			if (tran === null) {
				return null
			} else {
				let id = tran.userId

				return await ctx.models.User.findOne({ where: { id } })
			}
		},

		requestApprovedBy: async (request, _, ctx) => {
			let materialrequisition_id = request.materialrequisition_id
			let tran = await ctx.models.ApprovedMaterialRequests.findOne({
				where: { materialrequisition_id },
			})

			if (tran === null) {
				return null
			} else {
				let id = tran.userId
				return await ctx.models.User.findOne({ where: { id } })
			}
		},

		cashPaymentsDetails: async (material, _, ctx) => {
			let paymentIssueId = material.paymentIssueId
			if (!paymentIssueId) paymentIssueId = material.paymentIssue_id

			return await ctx.models.PaymentIssue.findOne({
				where: { paymentIssue_id: paymentIssueId },
			})
		},
	},
	MiscellaneousRequisition: {
		createdAt(request) {
			return request.created_at + ''
		},
		updatedAt(request) {
			return request.updated_at + ''
		},
		id(request) {
			return request.miscellaneousrequisition_id + ''
		},
		approvalStatus(request) {
			if (!request.approvalStatus) return false
			return request.approvalStatus
		},
		issuedCash(request) {
			if (!request.issuedCash) return false
			return request.issuedCash
		},

		requestedBy: async (request, _, ctx) => {
			let miscellaneousrequisition_id = request.miscellaneousrequisition_id

			let tran = await ctx.models.InitiatedMiscellaneousRequest.findOne({
				where: { miscellaneousrequisition_id },
			})

			if (tran === null) {
				return null
			} else {
				let id = tran.user_id

				return await ctx.models.User.findOne({ where: { id } })
			}
		},

		requestApprovedBy: async (request, _, ctx) => {
			let miscellaneousrequisition_id = request.miscellaneousrequisition_id
			let tran = await ctx.models.ApprovedMiscellaneousRequest.findOne({
				where: { miscellaneousrequisition_id },
			})

			if (tran === null) {
				return null
			} else {
				let id = tran.user_id
				return await ctx.models.User.findOne({ where: { id } })
			}
		},

		cashPaymentsDetails: async (request, _, ctx) => {
			let paymentIssueId = request.paymentIssueId
			if (!paymentIssueId) paymentIssueId = request.paymentIssue_id
			return await ctx.models.PaymentIssue.findOne({
				where: { paymentIssue_id: paymentIssueId },
			})
		},
	},

	PaymentIssue: {
		createdAt(request) {
			return request.created_at + ''
		},
		updatedAt(request) {
			return request.updated_at + ''
		},
		id(request) {
			return request.paymentIssue_id + ''
		},
		issuedBy: async (request, _, ctx) => {
			const user = await ctx.models.sequelize.query(
				'select * from public.users s join public."paymentIssues" p on s.id = p.user_id where p."paymentIssue_id"= ?',
				{
					replacements: [request.paymentIssue_id],
					model: ctx.models.User,
					raw: true,
				},
			)

			return user[0]
		},

		month(request) {
			return moment(request.month).format('YYYY-MM-DD')
			//  let thisMonth=  moment(request.month, 'YYYY/MM/DD').month()

			//  return moment().month(thisMonth).format('MMMM');
		},
	},
	StoreTransaction: {
		createdAt(request) {
			return request.created_at + ''
		},
		updatedAt(request) {
			return request.updated_at + ''
		},
		id(request) {
			return request.id + ''
		},
		transactedBy: async (request, _, ctx) => {
			const user = await ctx.models.sequelize.query(
				'select * from public.users s join public."storeTransactions" p on s.id = p.user_id  where p."user_id"= ?',
				{
					replacements: [request.userId],
					model: ctx.models.User,
					raw: true,
				},
			)

			return user[0]
		},
		materialsRecievedFrom: async (request, _, ctx) => {
			const supplier = await ctx.models.sequelize.query(
				' select * from public."Suppliers" s  where s."id"= ?',
				{
					replacements: [request.supplierId],
					model: ctx.models.Supplier,
					raw: true,
				},
			)

			return supplier[0]
		},
		materialsIssuedTo: async (request, _, ctx) => {
			const project = await ctx.models.sequelize.query(
				'select * from public.projects s  where s."id"= ? limit 1',
				{
					replacements: [request.projectId],
					model: ctx.models.Project,
					raw: true,
				},
			)

			return project[0]
		},
		itemTransacted: async (request, _, ctx) => {
			const item = await ctx.models.sequelize.query(
				'select * from public."materialsCostings" s  where s."id"= ? limit 1',
				{
					replacements: [request.materialsCostingId],
					model: ctx.models.MaterialsCosting,
					raw: true,
				},
			)

			return item[0]
		},
	},
}

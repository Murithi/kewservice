const VehicleAssigment = {
	addVehicleAssignment: async (_, args, { models }) => {
		try {
			await models.VehicleAssignment.create(args)
			const { vehicleId, dateOfAssignment } = args
			let id = vehicleId
			let assigned = true
			let dateAssigned = dateOfAssignment
			const assignedVehicle = await models.Vehicle.findOne({ where: { id } })
			console.log(assignedVehicle)
			await assignedVehicle.update({ assigned, dateAssigned })
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},

	editVehicleAssignment: async (_, { id, ...otherArgs }, { models }) => {
		try {
			const assignment = await models.VehicleAssigment.findOne({
				where: { id },
			})
			await assignment.update({ ...otherArgs })
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
	removeVehicleAssignment: async (_, { id }, { models }) => {
		try {
			const assignment = await models.VehicleAssigment.findOne({
				where: { id },
			})
			await assignment.destroy()
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
}

module.exports = { VehicleAssigment }

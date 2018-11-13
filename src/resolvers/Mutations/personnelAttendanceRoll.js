const { getUserId } = require('../../utils/getUser')

const PersonnelAttendanceRoll = {
	addPersonnelAttendance: async (_, args, ctx, info) => {
		try {
			const attendanceRecord = await ctx.models.PersonnelAttendanceRoll.create(
				args,
			)
			return true
		} catch (error) {
			console.log(error)
			return false
		}
	},
}

module.exports = { PersonnelAttendanceRoll }

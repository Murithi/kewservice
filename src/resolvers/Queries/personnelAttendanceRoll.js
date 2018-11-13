const PersonnelAttendanceRollQuery = {
	PersonnelAttendanceRollFeed: async (_, args, { models }) =>
		await models.PersonnelAttendanceRoll.findAll(),
	PersonnelAttendanceRoll: async (_, { id }, { models }) =>
		await models.PersonnelAttendanceRoll.findOne({ where: { id } }),
}

module.exports = { PersonnelAttendanceRollQuery }

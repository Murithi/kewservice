const PersonnelQuery = {
	personnelFeed: async (_, args, { models }) =>
		await models.Personnel.findAll(),
	personnel: async (_, { id }, { models }) =>
		await models.Personnel.findOne({ where: { id } }),
}

module.exports = { PersonnelQuery }

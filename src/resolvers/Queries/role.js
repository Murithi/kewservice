const RoleQuery = {
	personnelRoleFeed: async (_, args, { models }) => await models.Role.findAll(),
	personnelRole: async (_, { id }, { models }) =>
		await models.Role.findOne({ where: { id } }),
	personnelRoleFeedByDesignation: async (_, { roleName }, { models }) =>
		await models.Role.findAll({ where: { roleName } }),
}

module.exports = { RoleQuery }

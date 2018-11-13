const SectionQuery = {
	sectionFeed: async (_, args, { models }) => await models.Section.findAll(),
	section: async (_, { id }, { models }) =>
		await models.Section.findOne({ where: { id } }),
}

module.exports = { SectionQuery }

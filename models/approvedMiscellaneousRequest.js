export default (sequelize, DataTypes) => {
	const ApprovedMiscellaneousRequest = sequelize.define(
		'approvedMiscellaneousRequest',
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
		},
	)
	return ApprovedMiscellaneousRequest
}

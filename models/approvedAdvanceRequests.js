export default (sequelize, DataTypes)=>{
    const ApprovedAdvanceRequests = sequelize.define("approvedAdvanceRequests",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },

        })
    return ApprovedAdvanceRequests
}
export default (sequelize, DataTypes)=>{
    const ApprovedRequestService = sequelize.define("approvedRequestService",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },

        })
    return ApprovedRequestService
}
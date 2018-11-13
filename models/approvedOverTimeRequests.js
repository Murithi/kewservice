export default (sequelize, DataTypes)=>{
    const ApprovedOverTimeRequests = sequelize.define("approvedOverTimeRequests",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },

        })

return ApprovedOverTimeRequests
}
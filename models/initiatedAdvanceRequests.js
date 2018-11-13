export default (sequelize, DataTypes)=>{
    const InitiatedAdvanceRequests = sequelize.define("initiatedAdvanceRequests",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },

        })
    return InitiatedAdvanceRequests
}
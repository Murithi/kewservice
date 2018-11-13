export default (sequelize, DataTypes)=>{
    const InitiatedOverTimeRequests = sequelize.define("initiatedOverTimeRequests",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },

        })
    return InitiatedOverTimeRequests
}
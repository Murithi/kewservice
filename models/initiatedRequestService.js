export default (sequelize, DataTypes)=>{
    const InitiatedRequestService = sequelize.define("initiatedRequestService",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },

        })
    return InitiatedRequestService
}
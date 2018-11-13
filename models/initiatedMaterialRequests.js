export default (sequelize, DataTypes)=>{
    const InitiatedMaterialRequests = sequelize.define("initiatedMaterialRequests",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },

        })
    return InitiatedMaterialRequests
}
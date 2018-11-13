export default (sequelize, DataTypes)=>{
    const InitiatedRepairsRequest = sequelize.define("initiatedRepairsRequest",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },

        })
    return InitiatedRepairsRequest
}
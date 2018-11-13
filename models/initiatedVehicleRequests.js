export default (sequelize, DataTypes)=>{
    const InitiatedVehicleRequests = sequelize.define("initiatedVehicleRequests",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },

        })
    return InitiatedVehicleRequests
}
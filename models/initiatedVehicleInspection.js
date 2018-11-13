export default (sequelize, DataTypes)=>{
    const InitiatedVehicleInspection = sequelize.define("initiatedVehicleInspection",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },

        })
    return InitiatedVehicleInspection
}
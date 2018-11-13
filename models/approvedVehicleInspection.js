export default (sequelize, DataTypes)=>{
    const ApprovedVehicleInspection = sequelize.define("approvedVehicleInspection",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },

        })
    return ApprovedVehicleInspection
}
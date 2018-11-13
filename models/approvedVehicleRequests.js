export default (sequelize, DataTypes)=>{
    const ApprovedVehicleRequests = sequelize.define("approvedVehicleRequests",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },

        })
    return ApprovedVehicleRequests
}
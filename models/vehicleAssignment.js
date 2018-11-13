export default (sequelize, DataTypes)=>{
    const VehicleAssignment = sequelize.define("vehicleAssignment",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },
        dateOfAssignment:{ 
            type: DataTypes.DATE,
        },
        dateRelieved:{ 
            type: DataTypes.DATE,
        },
        
        })

    VehicleAssignment.associate = (models)=>{
        //1:M
        VehicleAssignment.belongsTo(models.Personnel, {
            foreignKey: {
                name:'personnelId',
                field:'personnel_id'
            }
        }),
        VehicleAssignment.belongsTo(models.Vehicle, {
            foreignKey: {
                name:'vehicleId',
                field:'vehicle_id'
            }
        })
        


    }
    return VehicleAssignment
}
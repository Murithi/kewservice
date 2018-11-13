export default (sequelize, DataTypes)=>{
    const VehicleOwner = sequelize.define("vehicleOwner",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,

        },
       
        })

    // VehicleOwner.associate = (models)=>{
    //     // N:M
    //     // VehicleOwner.belongsToMany(models.Personnel,{
    //     //     through: 'VehicleOwnerpersonnel',
    //     //     foreignKey: {
    //     //         name:'personnelId',
    //     //         field:'personnel_id'
    //     //     }
    //     // })

    // }
    return VehicleOwner
}
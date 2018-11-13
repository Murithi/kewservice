export default (sequelize, DataTypes)=>{
    const Vehicle = sequelize.define("vehicle",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },
        registrationNumber: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        logBookNumber: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        fuelType: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        insuranceValuation: {
            type: DataTypes.INTEGER,
          },
        insuranceRenewalDate:{ 
            type: DataTypes.DATE,
        },
        manufactureDate:{ 
            type: DataTypes.DATE,
        },
        assigned: {
            type: DataTypes.BOOLEAN,

        },
        dateAssigned: {
            type: DataTypes.DATE,
        }
        
        })

    Vehicle.associate = (models)=>{
        //1:M
        Vehicle.belongsTo(models.VehicleOwner, {
            foreignKey: {
                name:'vehicleOwnerId',
                field:'vehicleOwner_id'
            }
        })
        // N:M
        // Vehicle.belongsToMany(models.Personnel,{
        //     through: 'Vehiclepersonnel',
        //     foreignKey: {
        //         name:'personnelId',
        //         field:'personnel_id'
        //     }
        // })

    }
    return Vehicle
}
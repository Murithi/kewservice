export default (sequelize, DataTypes)=>{
    const VehicleInspection = sequelize.define("vehicleInspection",{
        vehicleinspection_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },
        approxCostOfInspection: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        approvalDate:{ 
            type: DataTypes.DATE,
        },
        requestDate:{ 
            type: DataTypes.DATE,
        },
        approvalStatus: {
            type: DataTypes.BOOLEAN,
            default: false,
            allowNull: false,
        },
        otherDetails: {
            type: DataTypes.STRING,
        },
 
        issuedCash: {
            type: DataTypes.BOOLEAN,
            default: false,
            allowNull: false,
        },

        dateInspected: {
            type: DataTypes.DATE,
        },
        transactionCompleted: {
            type: DataTypes.BOOLEAN,
            default: false,
            allowNull: false,
        },
        
        })

    VehicleInspection.associate = (models)=>{
        //1:M
        VehicleInspection.belongsTo(models.Vehicle, {
            foreignKey: {
                name: 'vehicleId',
                field:'vehicle_id'
            }
        }),
        VehicleInspection.belongsTo(models.PaymentIssue, {
            foreignKey:{
                name:'paymentIssueId',
                field:'paymentIssue_id'
            }
        }),
        // N:M
        VehicleInspection.belongsToMany(models.User,{
            through: models.InitiatedVehicleInspection,
            foreignKey: {
                name:'vehicleinspectionId',
                field:'vehicleinspection_id'
            }
        }),
        VehicleInspection.belongsToMany(models.User,{
            through: models.ApprovedVehicleInspection,
            foreignKey: {
                name:'vehicleinspectionId',
                field:'vehicleinspection_id'
            }
        })

    }
    return VehicleInspection
}
export default (sequelize, DataTypes)=>{
    const FuelRequisition = sequelize.define("fuelRequisition",{
        fuelRequisition_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },
        approxCostOfFuel: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        approvalDate:{ 
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
        requestDate:{ 
            type: DataTypes.DATE,
        },
        dateFueled: {
            type: DataTypes.DATE,

        },
        issuedCash: {
            type: DataTypes.BOOLEAN,
            default: false,
            allowNull: false,
        },
        transactionCompleted: {
            type: DataTypes.BOOLEAN,
            default: false,
            allowNull: false,
        },

        
        })

    FuelRequisition.associate = (models)=>{
        //1:M
        FuelRequisition.belongsTo(models.Vehicle, {
            foreignKey: {
                name: 'vehicleId',
                field:'vehicle_id'
            }
        }),

        FuelRequisition.belongsTo(models.PaymentIssue, {
            foreignKey:{
                name:'paymentIssueId',
                field:'paymentIssue_id'
            }
        }),
        // N:M
        FuelRequisition.belongsToMany(models.User,{
            through: models.InitiatedFuelRequests,
            foreignKey: {
                name:'fuelRequisitionId',
                field:'fuelRequisition_id'
            }
        }),
        FuelRequisition.belongsToMany(models.User,{
            through: models.ApprovedFuelRequests,
            foreignKey: {
                name:'fuelRequisitionId',
                field:'fuelRequisition_id'
            }
        })

    }
    return FuelRequisition
}
export default (sequelize, DataTypes)=>{
    const RepairsRequisition = sequelize.define("repairsRequisition",{
        repairrequisition_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },
        approxCostOfRepair: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        otherDetails: {
            type: DataTypes.STRING,
        },
        approvalStatus: {
            type: DataTypes.BOOLEAN,
            default: false,
            allowNull: false,
        },
        issuedCash: {
            type: DataTypes.BOOLEAN,
            default: false,
            allowNull: false,
        },
        requestDate:{ 
            type: DataTypes.DATE,
        },
        approvalDate:{ 
            type: DataTypes.DATE,
        },
        cashIssued: {
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

    RepairsRequisition.associate = (models)=>{
        //1:M
        RepairsRequisition.belongsTo(models.Vehicle, {
            foreignKey: {
                name: 'vehicleId',
                field:'vehicle_id'
            }
        }),

        RepairsRequisition.belongsTo(models.PaymentIssue, {
            foreignKey:{
                name:'paymentIssueId',
                field:'paymentIssue_id'
            }
        }),

        // N:M
        RepairsRequisition.belongsToMany(models.User,{
            through: models.InitiatedRepairsRequest,
            foreignKey: {
                name:'repairrequisitionId',
                field:'repairrequisition_id'
            }
        }),
        RepairsRequisition.belongsToMany(models.User,{
            through: models.ApprovedRepairsRequest,
            foreignKey: {
                name:'repairrequisitionId',
                field:'repairrequisition_id'
            }
        })

    }
    return RepairsRequisition
}
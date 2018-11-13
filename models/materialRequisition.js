export default (sequelize, DataTypes)=>{
    const MaterialRequisition = sequelize.define("materialRequisition",{
        materialrequisition_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        otherDetails: {
            type: DataTypes.STRING,
           
        },
        approxCost: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        paymentMode: {
            type: DataTypes.STRING,
            allowNull: false,

        },

        approvalStatus:{ 
            type: DataTypes.BOOLEAN,
            default: false,
        },
        requestDate:{ 
            type: DataTypes.DATE,
        },
        approvalDate:{ 
            type: DataTypes.DATE,
        },
        issuedCash:{ 
            type: DataTypes.BOOLEAN,
            default: false,
        },
        transactionCompleted:{ 
            type: DataTypes.BOOLEAN,
            default: false,
        },

        
        })

    MaterialRequisition.associate = (models)=>{
        //1:M
        MaterialRequisition.belongsTo(models.MaterialsCosting, {
            foreignKey: {
                name:'materialscostingId',
                field:'materialscosting_id'
            }
        }),
        MaterialRequisition.belongsTo(models.Supplier, {
            foreignKey: {
                name:'supplierId',
                field:'supplier_id'
            }
        }),

        MaterialRequisition.belongsTo(models.PaymentIssue, {
            foreignKey:{
                name:'paymentIssueId',
                field:'paymentIssue_id'
            }
        }),
   
        // N:M
        MaterialRequisition.belongsToMany(models.User,{
            through: models.InitiatedMaterialRequests,
            foreignKey: {
                name:'materialrequisitionId',
                field:'materialrequisition_id'
            }
        }),
        MaterialRequisition.belongsToMany(models.User,{
            through: models.ApprovedMaterialRequests,
            foreignKey: {
                name:'materialrequisitionId',
                field:'materialrequisition_id'
            }
        })

    }
    return MaterialRequisition
}        
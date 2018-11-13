export default (sequelize, DataTypes)=>{
    const RequestService = sequelize.define("requestService",{
        requestservice_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },
        approxCostOFService: {
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
        approvalDate:{ 
            type: DataTypes.DATE,
        },
        requestDate:{ 
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

    RequestService.associate = (models)=>{
        //1:M
        RequestService.belongsTo(models.Vehicle, {
            foreignKey: {
                name: 'vehicleId',
                field:'vehicle_id'
            }
        }),
        RequestService.belongsTo(models.PaymentIssue,{
            foreignKey:{
                name: 'paymentIssueId',
                field:'paymentIssue_id'
            }
        }),
        // N:M
        RequestService.belongsToMany(models.User,{
            through: models.InitiatedRequestService,
            foreignKey: {
                name:'requestserviceId',
                field:'requestservice_id'
            }
        }),
        RequestService.belongsToMany(models.User,{
            through: models.ApprovedRequestService,
            foreignKey: {
                name:'requestserviceId',
                field:'requestservice_id'
            }
        })

    }
    return RequestService
}
export default (sequelize, DataTypes)=>{
    const PaymentIssue = sequelize.define("paymentIssue",{
        paymentIssue_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },
        amountRecieved: {
            type: DataTypes.INTEGER,   
        },
        cashBalanceBefore: {
            type: DataTypes.INTEGER,   
        },
        cashBalanceAfter: {
            type: DataTypes.INTEGER,   
        },
        amountIssued: {
            type: DataTypes.INTEGER,   
        },
        amountCharged: {
            type: DataTypes.INTEGER,   
        },
        amountReturned: {
            type: DataTypes.INTEGER,   
        },
        paymentType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        recieptNumber: {
            type: DataTypes.STRING,
          },
        otherDetails: {
            type: DataTypes.STRING,
          },
        dateIssued:{ 
            type: DataTypes.DATE,
        },
        dateReported:{ 
            type: DataTypes.DATE,
        },
        cashReported: {
            type: DataTypes.BOOLEAN,
            allowNull:false,
            default:false,
        },

        
        })

    PaymentIssue.associate = (models)=>{
        //1:M
        PaymentIssue.belongsTo(models.AccountName, {
            foreignKey:{
                name:'accountNameId',
                field:'accountName_id'
            }
        }),

        PaymentIssue.belongsTo(models.User, {
            foreignKey:{
                name:'userId',
                field:'user_id'
            }
        })
        PaymentIssue.belongsTo(models.Project, {
            foreignKey:{
                name:'projectId',
                field:'project_id'
            }
        })

    }
    return PaymentIssue
}
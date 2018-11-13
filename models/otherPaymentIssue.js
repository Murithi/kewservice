export default (sequelize, DataTypes)=>{
    const OtherPaymentIssue = sequelize.define("otherPaymentIssue",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },
        amountPaid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        invoiceNumber: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        OtherPaymentIssueDescription: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        amountPaid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        discountRecieved: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        datePaid:{ 
            type: DataTypes.DATE,
        },
        OtherPaymentIsotherDetailssueLocation: {
            type: DataTypes.STRING,
         
        },
      
        
        })

    OtherPaymentIssue.associate = (models)=>{
        //1:M
        OtherPaymentIssue.belongsTo(models.AccountName,{
            foreignKey:{
                name:'accountNameId',
                field:'accountName_id'
            }
        }),
        OtherPaymentIssue.belongsTo(models.MaterialRequisition,{
            foreignKey:{
                name:'materialRequisitionId',
                field:'materialRequisition_id'
            }
        }),

        OtherPaymentIssue.belongsTo(models.User,{
            foreignKey:{
                name:'userId',
                field:'user_id'
            }
        })



    }
    return OtherPaymentIssue
}
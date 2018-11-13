export default (sequelize, DataTypes)=>{
    const CashBalance = sequelize.define("cashBalance",{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
          },
        balance: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        
        })

    CashBalance.associate = (models)=>{
        //1:M
        CashBalance.belongsTo(models.AccountName, {
            foreign:{
                name:'accountNameId',
                field:'accountName_id'
            }
        })
        // N:M
        // CashBalance.belongsToMany(models.Personnel,{
        //     through: 'CashBalancepersonnel',
        //     foreignKey: {
        //         name:'personnelId',
        //         field:'personnel_id'
        //     }
        // })

    }
    return CashBalance
}